import React, { useState, useEffect, useContext } from "react";
import { baseURLAPI, baseURL } from "../../Global";
import {
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Button,
  div,
  Icon,ImageBackground,
  TextInput,
  useColorScheme,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-community/async-storage";
const axios = require("axios");
import Constants from "expo-constants";
import styles from "../styles/styles";
import Homepage from "./Homepage";

        
const image = { uri: "https://reactjs.org/logo-og.png" };
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
    };
  }
  setLogin = async () => {
    this.setState({
      signedIn: true,
    });
  };

  render() {
    return (
       

 <ImageBackground source={image} style={styles.coverImage}>
 

        {this.state.signedIn ? (
          <LoggedInPage />
        ) : (
          <LoginPage setLogin={this.setLogin} />
        )}
  </ImageBackground>

     
    );
  }
}

const LoginPage = (props) => {
  const [signupView, setsignupView] = useState(false);
  const [email, setemailCredencials] = useState("");
  const [password, setpasswordCredencials] = useState("");

  const [name, setnameCredencials] = useState("");
  const [phone, setphoneCredencials] = useState("");
  const [RegisterErrorList, setRegisterErrorList] = useState("");
  const [GoogleErrorList, setGoogleErrorList] = useState("");
  const [SignInErrorList, setSignInerrorList] = useState("");

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);
    console.log("image asset", result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const viewSignUp = () => {
    Keyboard.dismiss();
    setsignupView(!signupView);
  };

  const signUpUser = async (email, name, password, phone, image) => {
    Keyboard.dismiss();
    if (email && name && password && phone && image) {
      const body = {
        TX_USER_NAME: name,
        TX_USER_EMAIL: email,
        TX_USER_PASSWORD: password,
        TX_USER_PHONE: phone,
        TX_USER_PICTURE: image,
      };
      console.log(baseURLAPI);

      axios
        .post(baseURLAPI + "/auth/register", body)
        .then((response) => {
          if (response.data.jwtToken) {
            AsyncStorage.setItem("jwtToken", response.data.jwtToken);
            props.setLogin();
          }
        })
        .catch((error) => {
          console.log(error);
          setRegisterErrorList("An error occured");
        });
    } else {
      setRegisterErrorList("Incomplete details");
    }
  };
  const signInUser = async (email, password) => {
    Keyboard.dismiss();
    if (email && password) {
      const body = {
        TX_USER_NAME: email,
        TX_USER_EMAIL: email,
        TX_USER_PASSWORD: password,
      };
      console.log(baseURLAPI);
      axios
        .post(baseURLAPI + "/auth/login", body)
        .then((response) => {
          if (response.data.jwtToken) {
            AsyncStorage.setItem("jwtToken", response.data.jwtToken);
            props.setLogin();
          }
        })
        .catch((error) => {
          setSignInerrorList("An error occured");
        });
    } else {
      setSignInerrorList("Incomplete details");
    }
  };
  const signIn = async () => {
    Keyboard.dismiss();
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "770480272379-786um8vmqi9p35ingldm4celsrk2jshi.apps.googleusercontent.com",
        iosClientId:
          "770480272379-rlr3mcpthnr02t3rul9ls1u5p4k2bsm6.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log(result.user);
        var user = result.user;

        const body = {
          TX_USER_NAME: user.name,
          TX_USER_EMAIL: user.email,
          TX_GOOGLE_ID: user.id,
          TX_USER_PICTURE: user.photoUrl,
        };
        console.log(baseURLAPI);
        axios
          .post(baseURLAPI + "/auth/socialauth", body)
          .then((response) => {
            if (response.data.jwtToken) {
              AsyncStorage.setItem("jwtToken", response.data.jwtToken);

              props.setLogin();
            }
          })
          .catch((error) => {});
      }
    } catch (e) {
      console.log("error", e);
      setGoogleErrorList("Could not sign in using google");
    }
  };

  return (
    <View>
      {signupView ? (
        <View
          style={{
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.header}>Sign Up</Text>

          <TouchableOpacity>
            {image ? (
              <TouchableOpacity
                style={{
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <Text
                  onPress={pickImage}
                  style={{
                    color: "#002f6c",
                  }}
                >
                  Change Image
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  borderColor: "#27AE62",
                  backgroundColor: "#27AE62",
                  alignContent: "center",
                  alignItems: "center",
                  backgroundColor: "#27AE62",
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginTop: 25,
                  paddingVertical: 7,
                }}
              >
                <Text
                  style={{
                    paddingTop: 32,
                    paddingLeft:2,
                    color: "#fff",
                  }}
                >
                  Add photo
                </Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          <TextInput
            style={styles.TextInput}
            onChangeText={(name) => setnameCredencials(name)}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Name and Surname"
            placeholderTextColor="#002f6c"
            selectionColor="#fff"
            keyboardType="default"
          />

          <TextInput
            style={styles.TextInput}
            onChangeText={(email) => setemailCredencials(email)}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Email Address"
            placeholderTextColor="#002f6c"
            selectionColor="#fff"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.TextInput}
            onChangeText={(phone) => setphoneCredencials(phone)}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Phone"
            placeholderTextColor="#002f6c"
            selectionColor="#fff"
            keyboardType="numeric"
          />

          <TextInput
            style={styles.TextInput}
            onChangeText={(password) => setpasswordCredencials(password)}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Password"
            placeholderTextColor="#002f6c"
            selectionColor="#fff"
            secureTextEntry={true}
          />
          {!!RegisterErrorList && (
            <TouchableOpacity
              style={{
                borderColor: "#DC143C",
                width: 250,
                borderWidth: 2,
                marginTop: 25,
                alignContent: "center",
                borderRadius: 23,
                paddingVertical: 7,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#DC143C",
                }}
              >
                {RegisterErrorList}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => signUpUser(email, name, password, phone, image)}
            style={styles.UserButton}
          >
            <Text
              style={{
                color: "#fff",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => viewSignUp()} style={styles.text}>
            <Text style={{ color: "#002f6c" }}>Sign-In</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.header}>Welcome</Text>
          <TouchableOpacity>
            <TextInput
              style={styles.TextInput}
              onChangeText={(email) => setemailCredencials(email)}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Email Address"
              placeholderTextColor="#002f6c"
              selectionColor="#fff"
              keyboardType="email-address"
            />

            <TextInput
              style={styles.TextInput}
              onChangeText={(password) => setpasswordCredencials(password)}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Password"
              placeholderTextColor="#002f6c"
              selectionColor="#fff"
              secureTextEntry={true}
            />

            {!!SignInErrorList && (
              <TouchableOpacity
                style={{
                  borderColor: "#DC143C",

                  width: 250,
                  borderWidth: 2,
                  marginTop: 25,
                  alignContent: "center",
                  borderRadius: 23,
                  paddingVertical: 7,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#DC143C",
                  }}
                >
                  {SignInErrorList}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => signInUser(email, password)}
              style={styles.UserButton}
            >
              <Text style={{ color: "#fff" }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => viewSignUp()} style={styles.text}>
              <Text
                style={{
                  color: "#000000",
                }}
              >
                Don't have an account ? Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => signIn()}
              style={styles.googleButton}
            >
              <Text style={{ color: "#fff" }}>Sign in with Google</Text>
            </TouchableOpacity>

            {!!GoogleErrorList && (
              <TouchableOpacity
                style={{
                  borderColor: "#DC143C",

                  width: 250,
                  borderWidth: 2,
                  marginTop: 25,
                  alignContent: "center",
                  borderRadius: 23,
                  paddingVertical: 7,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#DC143C",
                  }}
                >
                  {GoogleErrorList}
                </Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const LoggedInPage = () => {
  return (
    <View style={styles.container}>
      <Homepage />

      {/* <Text style={styles.header}>Welcome:{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} /> */}
    </View>
  );
};

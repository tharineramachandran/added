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
  Icon,
  TextInput,
  useColorScheme,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-community/async-storage";
const axios = require("axios");
import Constants from "expo-constants";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: "",
    };
  }
  signUpUser = async (email, name, password, phone, url) => {
    Keyboard.dismiss();

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

          this.setState({
            signedIn: true,
            name: response.data.jwtToken,
            photoUrl: "result.user.photoUrl",
          });
        }
      })
      .catch((error) => {
        console.log("error");

        console.log(error);
      });
  };
  signInUser = async (email, password) => {
    Keyboard.dismiss();

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

          this.setState({
            signedIn: true,
            name: response.data.jwtToken,
            photoUrl: "result.user.photoUrl",
          });
        }
      })
      .catch((error) => {
        console.log("error");

        console.log(error);
      });
  };

  signIn = async () => {
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

              this.setState({
                signedIn: true,
                name: response.data.jwtToken,
                photoUrl: "result.user.photoUrl",
              });
            }
          })
          .catch((error) => {
            console.log("error");

            console.log(error);
          });
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
        ) : (
          <LoginPage
            signIn={this.signIn}
            signUpUser={this.signUpUser}
            signInUser={this.signInUser}
          />
        )}
      </View>
    );
  }
}

const LoginPage = (props) => {
  const [signupView, setsignupView] = useState(false);
  const [email, setemailCredencials] = useState("");
  const [password, setpasswordCredencials] = useState("");

  const [name, setnameCredencials] = useState("");
  const [phone, setphoneCredencials] = useState("");

  const [url, seturlCredencials] = useState("");
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
    setsignupView(!signupView);
  };

  return (
    <View>
      {signupView ? (
        <View>
          <Text style={styles.header}>Register</Text>

          <TouchableOpacity
            style={{
              alignContent: "center",
              alignItems: "center",
            }}
          >
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
                }}
              >
                <Text
                  style={{
                    paddingTop: 30,
                    paddingLeft: 10,
                    color: "#fff",
                  }}
                >
                  Add a profile picture
                </Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          <TextInput
            style={styles.TextInput}
            onChangeText={(name) => setnameCredencials(name)}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Name"
            placeholderTextColor="#002f6c"
            selectionColor="#fff"
            keyboardType="default"
          />

          <TextInput
            style={styles.TextInput}
            onChangeText={(email) => setemailCredencials(email)}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Email"
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

          <TouchableOpacity
            onPress={() => props.signUpUser(email, name, password, phone, url)}
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

          <TouchableOpacity onPress={viewSignUp} style={styles.text}>
            <Text
              style={{
                color: "#002f6c",
              }}
            >
              Sign-In
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.header}>Login</Text>

          <TextInput
            style={styles.TextInput}
            onChangeText={(email) => setemailCredencials(email)}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Email"
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
          <TouchableOpacity
            onPress={() => props.signInUser(email, password)}
            style={styles.UserButton}
          >
            <Text style={{ color: "#fff" }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={viewSignUp} style={styles.text}>
            <Text
              style={{
                color: "#000000",
              }}
            >
              Not a user? Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.signIn()}
            style={styles.googleButton}
          >
            <Text style={{ color: "#fff" }}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const LoggedInPage = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 25,
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150,
  },
  text: {
    width: 250,
    marginTop: 25,
    alignContent: "center",
    borderRadius: 4,
    paddingVertical: 7,
    alignItems: "center",
  },
  googleButton: {
    borderColor: "#3F80F6",
    backgroundColor: "#3F80F6",
    width: 250,
    borderWidth: 2,
    marginTop: 25,
    alignContent: "center",
    borderRadius: 4,
    paddingVertical: 7,
    alignItems: "center",
  },
  UserButton: {
    borderColor: "#27AE62",
    backgroundColor: "#27AE62",
    width: 250,
    borderWidth: 2,
    marginTop: 25,
    alignContent: "center",
    borderRadius: 23,
    paddingVertical: 7,
    alignItems: "center",
  },
  TextInput: {
    width: 250,
    borderWidth: 2,
    marginTop: 15,
    borderColor: "#00716F",
    borderRadius: 23,
    paddingVertical: 2,
    paddingHorizontal: 30,
  },
});

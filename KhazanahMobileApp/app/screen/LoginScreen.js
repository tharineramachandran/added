import React, { useState, useEffect, useContext } from "react";

import {
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  div,
  Icon,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import * as Google from "expo-google-app-auth";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: "",
    };
  }
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
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
        });
      } else {
        console.log("cancelled");
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
          <LoginPage signIn={this.signIn} />
        )}
      </View>
    );
  }
}

const LoginPage = (props) => {
  const [signupView, setsignupView] = useState(false);
  const [email, setemailCredencials] = useState("");
  const [password, setpasswordCredencials] = useState("");
  saveData = () => {
    //save data with asyncstorage
    let loginDetails = {
      email: email,
      password: password,
    };

    // if(this.props.type !== 'Login')
    // {
    AsyncStorage.setItem("loginDetails", JSON.stringify(loginDetails));
    console.log(loginDetails);
    Keyboard.dismiss();
    alert(
      "You successfully registered. Email: " + email + " password: " + password
    );

    // }
    // else if(this.props.type == 'Login')
    // {
    //     try{
    //         let loginDetails =   AsyncStorage.getItem('loginDetails');
    //         let ld = JSON.parse(loginDetails);

    //         if (ld.email != null && ld.password != null)
    //         {
    //             if (ld.email == email && ld.password == password)
    //             {
    //                 alert('Go in!');
    //             }
    //             else
    //             {
    //                 alert('Email and Password does not exist!');
    //             }
    //         }

    //     }catch(error)
    //     {
    //         alert(error);
    //     }
    // }
  };
  viewSignUp = () => {
    
     setsignupView(!signupView);
  }; 
  showData = () => {
    let loginDetails = AsyncStorage.getItem("loginDetails");
    let ld = JSON.parse(loginDetails);
    alert("email: " + ld.email + " " + "password: " + ld.password);
  };

  return (
 
<View>  

{signupView? ( <View>

 
<Text style={styles.header}>Register</Text>

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
<TouchableOpacity onPress={saveData} style={styles.UserButton}>
  <Text
    style={{
      color: "#fff",
    }}
  >
    Register
  </Text>
</TouchableOpacity> 

<TouchableOpacity
  onPress={() => viewSignUp()}
  style={styles.text}
>
  <Text
    style={{
      color: "#fff",
    }}
  >
  Sign-In
  </Text>
</TouchableOpacity> 


</View>) :( <View>

 
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
<TouchableOpacity onPress={saveData} style={styles.UserButton}>
  <Text
    style={{
      color: "#fff",
    }}
  >
    Login
  </Text>
</TouchableOpacity>
<TouchableOpacity
  onPress={() => viewSignUp()}
  style={styles.text}
>
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
  <Text
    style={{
      color: "#fff",
    }}
  >
    Sign in with Google
  </Text>
</TouchableOpacity>
</View>) }
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
  },text :{     
  width: 250, 
  marginTop: 25,
  alignContent: "center",
  borderRadius: 4,
  paddingVertical: 7,
  alignItems: "center",},
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

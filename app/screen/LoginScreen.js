import React from 'react';

import { TouchableOpacity, StyleSheet, Text, View, Image, Button,div ,Icon, TextInput } from "react-native"
 
import * as Google from 'expo-google-app-auth';
 
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: ""
    }
  }
  signIn = async () => {
    try {
      const result = await Google.logInAsync({
                 androidClientId:
                "770480272379-786um8vmqi9p35ingldm4celsrk2jshi.apps.googleusercontent.com",
           iosClientId: "770480272379-rlr3mcpthnr02t3rul9ls1u5p4k2bsm6.apps.googleusercontent.com",  
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
        ) : (
          <LoginPage signIn={this.signIn} />
        )}
      </View>

      
    )
  }
}

const LoginPage = props => {
  return (
    <View >
      <Text style={styles.header}>Login</Text>
     
      <TouchableOpacity onPress={() => props.signIn()} style={styles.googleButton }  >
    <Text style={{

      color:"#fff" 
    }} >
    Sign in with Google 
    </Text>
  </TouchableOpacity>
      <TextInput   placeholder="Email"     style={styles.TextInput}   /> 
      <TextInput   placeholder="Password" secureTextEntry style={styles.TextInput}/> 
      {/* <Text  onPress={()=>navigate('Register')} >New User</Text> */}
 
    </View>
  )
}

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: "#fff", 
  }, 
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  },
  googleButton :{   
    borderColor:"#EA4335" ,
    backgroundColor:"#EA4335" ,
    width: 250 ,  
    borderWidth:2,
    marginTop:25,  
    alignContent:"center",
    borderRadius:23,
    paddingVertical:7,
   alignItems :"center",
},
  TextInput :{
    width: 250 ,  
    borderWidth:2,
    marginTop:15, 
    borderColor:"#00716F",
    borderRadius:23,
    paddingVertical:2,
    paddingHorizontal:30,  
  }
})
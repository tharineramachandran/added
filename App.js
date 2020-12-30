import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./app/screen/LoginScreen";
export default function App() {
  return (
    <View>
      <LoginScreen />
    </View>
  );
}

// import React, { useEffect, useState } from 'react';
// import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';
// import * as AppAuth from 'expo-app-auth';

// export default function App() {
//   let [authState, setAuthState] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let cachedAuth = await getCachedAuthAsync();
//       if (cachedAuth && !authState) {
//         setAuthState(cachedAuth);
//       }
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>Expo AppAuth Example</Text>
//       <Button
//         title="Sign In with Google "
//         onPress={async () => {
//           const _authState = await signInAsync();
//           setAuthState(_authState);
//         }}
//       />
//       <Button
//         title="Sign Out "
//         onPress={async () => {
//           await signOutAsync(authState);
//           setAuthState(null);
//         }}
//       />
//       <Text>{JSON.stringify(authState, null, 2)}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// let config = {
//   issuer: 'https://accounts.google.com',
//   scopes: ['openid', 'profile'],
//   /* This is the CLIENT_ID generated from a Firebase project */
//   clientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
// };

// let StorageKey = '@MyApp:CustomGoogleOAuthKey';

// export async function signInAsync() {
//   let authState = await AppAuth.authAsync(config);
//   await cacheAuthAsync(authState);
//   console.log('signInAsync', authState);
//   return authState;
// }

// async function cacheAuthAsync(authState) {
//   return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
// }

// export async function getCachedAuthAsync() {
//   let value = await AsyncStorage.getItem(StorageKey);
//   let authState = JSON.parse(value);
//   console.log('getCachedAuthAsync', authState);
//   if (authState) {
//     if (checkIfTokenExpired(authState)) {
//       return refreshAuthAsync(authState);
//     } else {
//       return authState;
//     }
//   }
//   return null;
// }

// function checkIfTokenExpired({ accessTokenExpirationDate }) {
//   return new Date(accessTokenExpirationDate) < new Date();
// }

// async function refreshAuthAsync({ refreshToken }) {
//   let authState = await AppAuth.refreshAsync(config, refreshToken);
//   console.log('refreshAuth', authState);
//   await cacheAuthAsync(authState);
//   return authState;
// }

// export async function signOutAsync({ accessToken }) {
//   try {
//     await AppAuth.revokeAsync(config, {
//       token: accessToken,
//       isClientIdProvided: true,
//     });
//     await AsyncStorage.removeItem(StorageKey);
//     return null;
//   } catch (e) {
//     alert(`Failed to revoke token: ${e.message}`);
//   }
// }

// import React from "react"
// import { StyleSheet, Text, View, Image, Button } from "react-native"

// import * as Google from 'expo-google-app-auth';

// export default class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       signedIn: false,
//       name: "",
//       photoUrl: ""
//     }
//   }
//   signIn = async () => {
//     try {
//       const result = await Google.logInAsync({
//         androidClientId:
//           "770480272379-786um8vmqi9p35ingldm4celsrk2jshi.apps.googleusercontent.com",
//          iosClientId: "770480272379-rlr3mcpthnr02t3rul9ls1u5p4k2bsm6.apps.googleusercontent.com",
//         scopes: ["profile", "email"]
//       })

//       if (result.type === "success") {
//         this.setState({
//           signedIn: true,
//           name: result.user.name,
//           photoUrl: result.user.photoUrl
//         })
//       } else {
//         console.log("cancelled")
//       }
//     } catch (e) {
//       console.log("error", e)
//     }
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         {this.state.signedIn ? (
//           <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
//         ) : (
//           <LoginPage signIn={this.signIn} />
//         )}
//       </View>
//     )
//   }
// }

// const LoginPage = props => {
//   return (
//     <View>
//       <Text style={styles.header}>Sign In With Google</Text>
//       <Button title="Sign in with Google" onPress={() => props.signIn()} />
//     </View>
//   )
// }

// const LoggedInPage = props => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Welcome:{props.name}</Text>
//       <Image style={styles.image} source={{ uri: props.photoUrl }} />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   header: {
//     fontSize: 25
//   },
//   image: {
//     marginTop: 15,
//     width: 150,
//     height: 150,
//     borderColor: "rgba(0,0,0,0.2)",
//     borderWidth: 3,
//     borderRadius: 150
//   }
// })

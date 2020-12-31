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
import  styles from "../styles/styles" ;

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jwtToken: '',
        };
    }
    
    componentDidMount() {
        AsyncStorage.getItem('jwtToken').then((jwtToken) => {
            if(jwtToken){
                this.setState({jwtToken: jwtToken});
                 
            }
        });
    }
  render() {
    return (
      <View>
      
      <View
        style={{
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={
           {fontSize: 50,
           padding: 1,
           color:"#d7dee0"}}>
             User Logged in
             </Text>
         <Text style={
           {fontSize:20,
           paddingBottom: 10,
           color:"#d7dee0"}}>
             add a text here 
             </Text>
  
      </View>   
  </View>
    );
  }
}

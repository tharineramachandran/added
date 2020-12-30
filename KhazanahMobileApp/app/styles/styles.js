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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
      },
  header: {
    fontSize: 25,
    padding: 10
  },

  coverImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },



  image: {
   
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150,

   
    marginTop: 25,
   
    paddingVertical: 7,
     

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
    marginTop: 25,
    borderColor: "#00716F", textAlign: "center",
    borderRadius: 23,
    paddingVertical:4,
    paddingHorizontal: 30,
  },
});
export default styles;

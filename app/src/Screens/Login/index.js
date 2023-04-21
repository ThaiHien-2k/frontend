import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Image,
  View } from 'react-native';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  Unsubscribe } from "firebase/auth";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {  Card } from 'react-native-paper';
import db from '../../Database/';


export default function Login({ navigation, route }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erorSingUp, setErrorSingUp] = useState(false)

  async function login() {

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        if (user) {
          navigation.navigate('myTabs', { userID: user.uid })
        } else { console.log('error'); }
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        setErrorSingUp(true)
      });
    setEmail()
    setPassword()
  }

  async function singUp() {
    navigation.navigate('SingUp')
  }

  useEffect(() => {
    const auth = getAuth();
    const Unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Home')
      }
      else {
        console.log('User is not signed in');
      }
    })
    return Unsubscribe();
  }, [])

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <TouchableWithoutFeedback>
        <SafeAreaView>
          <StatusBar style="light" />
          <Card.Cover style={styles.image} source={{ uri: 'https://media.istockphoto.com/id/1202899120/vi/vec-to/gi%E1%BB%8Dt-m%C3%A1u-%C4%91%E1%BB%8F-trong-tay-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng-thi%E1%BA%BFt-k%E1%BA%BF-vector-t%C3%ACnh-nguy%E1%BB%87n-vi%C3%AAn-hi%E1%BA%BFn-m%C3%A1u.jpg?s=170667a&w=0&k=20&c=atjeQGrKHcqRE8i50PORJct_QcWoU0AsaqkLPr81pyQ=' }} />
          {/* <Image
        // style={styles.tinyLogo}
        source={{
          uri: 'https://www.google.com.vn/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fvi%2Fvec-to%2Flogo-hi%25E1%25BA%25BFn-m%25C3%25A1u-m%25E1%25BB%2599t-gi%25E1%25BB%258Dt-m%25C3%25A1u-gm1155180616-314399482&psig=AOvVaw2IgeZR1IpgJMUTUj7FD10V&ust=1681837067502000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOjiyKyzsf4CFQAAAAAdAAAAABAJ',
        }}
      /> */}
          <Text style={styles.textMain}>Đăng nhập</Text>
          <TextInput style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="#ffcccc"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType='email-address'
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#ffcccc"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            keyboardType='numeric'
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />

          {/* {erorSingUp === true
            ? <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <MaterialIcons
                name="info"
                size={25}
                color="#dbdbdb"
              />
              <Text style={styles.info}>
               Tài khoản không tồn tại
              </Text>
            </View>
            : <View></View>} */}

          <TouchableOpacity style={styles.buttonLogin} onPress={login}>
            <Text style={styles.textLogin}>Đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSingUp} onPress={singUp}>
            <Text style={styles.textSingUp}>Đăng ký</Text>
          </TouchableOpacity>

        </SafeAreaView>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0B0B',
  },
  textInput: {
    margin: 5,
    fontSize: 18,
    width: 300,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#232323',
    padding: 10,
    color: '#ffcccc',
  },
  image: {
    height: 100,
    width:100,
    marginHorizontal:110
    // textAlign: 'center',
    // fontSize: 18,
},
  buttonLogin: {
    width: 300,
    height: 50,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#ffcccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonSingUp: {
    width: 300,
    height: 50,
    borderRadius: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ffcccc',
  },
  textLogin: {
    color: '#232323',
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  },
  textSingUp: {
    color: '#ffcccc',
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  },
  info: {
    color: '#dbdbdb',
    fontSize: 18,
  },
  textMain: {
    color: '#ffcccc',
    fontSize: 60,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
  }
});
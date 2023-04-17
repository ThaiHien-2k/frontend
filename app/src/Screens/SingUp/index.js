import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Text, Button,SafeAreaView, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, View, DrawerLayoutAndroidBase } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import db from '../../Database/';
import {  Card } from 'react-native-paper';


export default function SingUp({ navigation }) {

    // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erorSingUp, setErrorSingUp] = useState(false)
    const [cfPass, setCfPass] = useState('');
    async function singUp() {
        if(password===cfPass){
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
     
            .then((value) => {
                // Signed in 
                const user = value.user;
                if (user) {
                    navigation.navigate('myTabs', { userID: user.uid })
                  } else { console.log('error'); }
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
                setErrorSingUp(true)
            });
    }
    else  setErrorSingUp(true);
}

    useEffect(() => {
    }, [])

    async function singIn() {
        navigation.navigate('Login')
      }
    
    return (
        <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <TouchableWithoutFeedback>
          <SafeAreaView>

            <StatusBar style="light" />
            <Card.Cover style={styles.image} source={{ uri: 'https://media.istockphoto.com/id/1202899120/vi/vec-to/gi%E1%BB%8Dt-m%C3%A1u-%C4%91%E1%BB%8F-trong-tay-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng-thi%E1%BA%BFt-k%E1%BA%BF-vector-t%C3%ACnh-nguy%E1%BB%87n-vi%C3%AAn-hi%E1%BA%BFn-m%C3%A1u.jpg?s=170667a&w=0&k=20&c=atjeQGrKHcqRE8i50PORJct_QcWoU0AsaqkLPr81pyQ=' }} />

                    <Text style={styles.textMain}>Đăng ký</Text>
                 

                    <TextInput style={styles.TextInput}
                        placeholder="Email"
                        placeholderTextColor="#ffcccc"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType='email-address'
                        value={email}
                        variant="outlined" label="Label"
                        onChangeText={(text) => setEmail(text)}
                    />

                    <TextInput style={styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor="#ffcccc"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={password}
                        variant="outlined" label="Label"
                        keyboardType='numeric'
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                    />

                    <TextInput style={styles.TextInput}
                        placeholder="Confirm Password"
                        placeholderTextColor="#ffcccc"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={cfPass}
                        variant="outlined" label="Label"
                        keyboardType='numeric'
                        secureTextEntry
                        onChangeText={(t) => setCfPass(t)}
                    />  

                    {erorSingUp === true
                        ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialIcons
                                name="info"
                                size={25}
                                color="#dbdbdb"
                            />
                            <Text style={styles.info}>
                                Email không tồn tại
                            </Text>
                        </View>
                        : <View></View>}

                    <TouchableOpacity style={styles.buttonSingUp} onPress={singUp}>
                        <Text style={styles.textSingUp}>Đăng ký</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>Đã có tài khoản? <TouchableOpacity onPress={singIn}><Text style={styles.text2}>Đăng nhập</Text></TouchableOpacity></Text>

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
    TextInput: {
        margin: 10,
        fontSize: 18,
        width: 300,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#232323',
        padding: 10,
        color: '#ffcccc',
    },

    buttonSingUp: {
        width: 300,
        height: 50,
        borderRadius: 5,
        margin: 5,
        backgroundColor: '#ffcccc',
    },
    textSingUp: {
        color: '#232323',
        fontSize: 20,
        padding: 10,
        textAlign: 'center',
    },
    info: {
        color: '#dbdbdb',
        fontSize: 18,
    },

    image: {
        height: 100,
        width:100,
        marginHorizontal:120
        // textAlign: 'center',
        // fontSize: 18,
    },
    text: {
        textAlign: 'right',
        color: '#fff',
        fontSize: 18,
        
    },
    text2: {
        fontWeight: 'bold',
        // marginHorizontal:8,
        // marginVertical:8,
        paddingTop:5,
        // padding:'auto',
        textAlign: 'right',
        color: 'blue',
        fontSize: 18,
    },
    textMain: {
        color: '#ffcccc',
        fontSize: 60,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 30,
    },
});

import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard
} from 'react-native';
import { db } from '../../Database';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  deleteField,
  updateDoc
} from "firebase/firestore";
import { getAuth, Unsubscribe } from "firebase/auth";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import moment from 'moment';


export default function Profile({ navigation }) {

  const Tab = createBottomTabNavigator();
  const [task, setTask] = useState([])
const auth = getAuth().currentUser;

const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([])


// const bloodStorage_remaining = `http://localhost:5000/api/infors`;


const getData = async () => {
  try {
    const response = await axios.get(`http://10.0.2.2:5000/api/infors`);
    setData(response.data.data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.lastDonate).toString());
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }


}
useEffect( () => {
getData();
const current = new Date();
const nextDonate = new Date(data).setDate(current.getDate() + 90);
// console.log(current)
if(data===''){
  setTask('Bạn chưa hiến lần nào!')
}
if(current===nextDonate){
  setTask('Bạn có thể hiến')
}
else if(current<nextDonate){

  setTask('Ngày hiến hiến máu tiếp theo là:  '+moment(nextDonate).format("D/M/YYYY"))
}
}, [])

async function logout() {
  const auth = getAuth();
  auth.signOut();
  navigation.navigate("Login");
}

async function infor() {
  navigation.navigate("Infor");
}

async function change() {
  navigation.navigate("Change");
}

  return (
    
         <View style={styles.container}>
       <Ionicons style={styles.icon} name="person-circle-outline"/>
       {/* <Text style={styles.text}>Chào, {auth.email}</Text> */}
       <Text style={styles.text}>{task}</Text>
       <TouchableOpacity style={styles.button1} onPress={infor}>
            <Text style={styles.text1}>Thông tin cá nhân</Text>
           
          </TouchableOpacity>

          <TouchableOpacity style={styles.button2} onPress={change}>
            <Text style={styles.text2}>Thay đổi thông tin </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button3} onPress={logout}>
            <Text style={styles.text3}>Đăng xuất <Ionicons name="log-out-outline"  size={20} /></Text>
          </TouchableOpacity>

       {/* <Button
       style={styles.Button}
        title="Thông tin cá nhân"
        color="green"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
      
       <Button
        title="Thay đổi thông tin"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
      <Button
        title="Đăng xuất"
        color="red"
        onPress={() => Alert.alert('Simple Button pressed')}
        Ionicons="log-out-outline"
      /> */}
        </View>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginHorizontal: 16,
    padding:20,
   

  },
  button1: {
    width: 300,
    height: 50,
    borderRadius: 5,
    margin: 5,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  button2: {
    width: 300,
    height: 50,
    borderRadius: 5,
    margin: 5,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  button3: {
    width: 300,
    height: 50,
    borderRadius: 5,
    margin: 5,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  text: {
    // color: 'white',
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
  },

  text1: {
    color: 'white',
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
  },
  text2: {
    color: 'white',
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
  },
  text3: {
    color: 'white',
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
  },

  icon:{
    color:'gray',
    textAlign: 'center',
    fontSize: 250,
    // paddingBottom:40,
  }
  
});

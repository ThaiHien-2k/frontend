import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard
} from 'react-native';
import {ActivityIndicator} from 'react-native';
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
import axios from 'axios';
import moment from 'moment';
// import { getAuth } from "firebase/auth";


export default function InforPage({ navigation }) {
  const auth = getAuth().currentUser;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([])

  const [task, setTask] = useState([])
  // const bloodStorage_remaining = `http://localhost:5000/api/infors`;

 
  const getData = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:5000/api/infors`);
  setData(response.data.data);
  // setTask(data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i));
  // setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
 

  // setData(response);
  // console.log(response);

}
useEffect( () => {
  getData();
  console.log(data)
  }, [])

 
// const [remainList, setRemainlist] = useState([]);
// useEffect(()=>{
// const fetchCashFlowsRemaining = async () => {
 
//     const response = await axios.get(bloodStorage_remaining);
   
//     setRemainlist('haha');
// };
// fetchCashFlowsRemaining();
// },[]);
    if (!data) return (
    <View style={styles.container}>
       
      <Text style={styles.text1}>Bạn chưa có thông tin!</Text>

  
       </View>);
  else 
  return (
    <View style={{flex: 1, padding: 24}}>
    {isLoading ? (
      <ActivityIndicator />
    ) : (
      <View style={styles.view} >
       
         <Text style={styles.text2}> <Text style={styles.text3}>CMND/CCCD:</Text> {data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.countryID)}</Text>
             <Text style={styles.text2}> <Text style={styles.text3}>Họ và tên: </Text> {data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.name)}</Text>
             <Text style={styles.text2}><Text style={styles.text3}>Số điện thoại: </Text> {data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.phone)}</Text>
            <Text style={styles.text2}><Text style={styles.text3}>Địa chỉ: </Text> {data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.address)}</Text>
              <Text style={styles.text2}><Text style={styles.text3}>Số lần hiến: </Text> {data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.donateTime)}</Text>
     <Text style={styles.text2}><Text style={styles.text3}>Nhóm máu: </Text> {data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.typeBlood)}</Text>
     <Text style={styles.text2}><Text style={styles.text3}>Ngày hiến cuối cùng: </Text> {moment(data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.lastDonate).toString()).format("D/M/YYYY")}</Text>
           <Text style={styles.text2}><Text style={styles.text3}>Trạng thái: </Text> {data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.status)}</Text>
          
     
          </View>
    )}
  </View>)
   

}

const styles = StyleSheet.create({
  container: {

    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  view: {
   borderWidth:1,
// backgroundColor:'#d6d6c2'
backgroundColor: '#fff',
  },
  text1: {
    color: 'red',
    fontSize: 50,
    padding: 5,
    textAlign: 'left',
  },
 
  text2: {
    textAlign: 'left',
    color: 'black',
    fontSize: 20,
    padding: 10,
    fontWeight: 'normal',
    textAlign: 'left',
  },
  text3: {
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    textAlign: 'left',
  },
});

import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect,useRef } from 'react';
import { Appbar } from 'react-native-paper';
import {
  View,
  Text,
  // TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  ToastAndroid
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
// import * as React from 'react';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
export default function BookingPage({ navigation ,route}) {
  const auth = getAuth().currentUser;
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [task, setTask] = useState([]);

  const initialRef = useRef();
  const getData = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:5000/api/infors`);
      setIdu(response.data.data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.id).toString());
      setName(response.data.data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.name).toString());
//       // setData(response.data.data.filter(index=> index.email.includes('a@gmail.com')));
//         setCountryID(response.data.data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.countryID).toString());
//   setPhone(response.data.data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.phone).toString());
//   setAddress(response.data.data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.address).toString());

    } catch (error) {
      console.error(error);
    } finally {
        // setTask(data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.email));
      setLoading(false);
    }

}

const click = async () => {

    navigation.navigate('Các buổi hiến máu đang tổ chức');

}

useEffect( () => {
  getData();

  
  setLoading(false);
  }, [])


  async function create() {


    const post ={
        iduser:idu,
        idBD:route.params.id,
        sex: 'Nam',
    //   status:"Đã duyệt",
      heigh:120,
      weight:120,
      isAcohol:false,
      isNicotine:false,
      isHeartDisease:false,
      isSitUp:false,
      isSick:false,
      isAllergies:"Không có",
      createdAt:Date.now(),


    }
    const res = await axios.post(`http://10.0.2.2:5000/api/admin/booking/new`,post);

    if(res.status===200){
   
      ToastAndroid.show('Đặt lịch thành công!', ToastAndroid.SHORT);
      setTitle('');
      setContent('');
      navigation.navigate('Các buổi hiến máu đang tổ chức');
    }
    else{
      ToastAndroid.show('Đã có lỗi xảy ra!', ToastAndroid.SHORT);
    }
}


  const [text, setText] = React.useState("");
  const [name, setName] = React.useState("");

  const [idu, setIdu] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
//   const [countryID, setCountryID] = React.useState("");
//   const [address, setAddress] = React.useState("");
  // const [text, setText] = React.useState(""); 

  return (
   <>
    <Appbar.Header style={[
    
        {
         
          backgroundColor: '#ff6666',
        },
      ]}>
    <Appbar.BackAction  onPress={() => click()}/>
    <Appbar.Content title="Thêm thông tin" />
    {/* <Appbar.Action icon="calendar" onPress={() => {}} />
    <Appbar.Action icon="magnify" onPress={() => {}} /> */}
  </Appbar.Header>
    <View style={{flex: 1, padding: 24}}>
      {/* <Text>Email:</Text>
    <TextInput
      // label="Email"
      value={data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.email).toString()}
      disabled
      onChangeText={text => setText(text)}
    /> */}
<Text style={styles.text2}>Tiêu đề:</Text>
{/* <TextInput
    
      value={title}
      // disabled
      autoCapitalize="none"
      autoCorrect={false}
      backgroundColor='white'
      onChangeText={text => setTitle(text)}
    /> */}
    <Text style={styles.text2}>Nội dung:</Text>
{/* <TextInput
    // ref={initialRef}
    multiline
        numberOfLines={14}
      value={content}
      // disabled
      backgroundColor='white'
      onChangeText={text => setContent(text)}
    /> */}

 <TouchableOpacity style={styles.button} onPress={create}>
                        <Text style={styles.text}>Đặt hẹn</Text>
                    </TouchableOpacity>
    </View>
    </>
  );
 
};

const styles = StyleSheet.create({
  container: {

    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#90D700',
},
text: {
    color: '#232323',
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
},
text2: {
  // color: '#232323',
  fontSize: 20,
  padding: 10,
  fontWeight:'bold',
  // textAlign: 'center',
},
 
});

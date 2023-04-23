import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect,useRef } from 'react';

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
export default function CreatePost({ navigation }) {
  const auth = getAuth().currentUser;
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [task, setTask] = useState([]);

  const initialRef = useRef();
  const getData = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:5000/api/infors`);
      setId(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.id).toString());
      setName(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.name).toString());
//       // setData(response.data.data.filter(index=> index.email.includes(auth.email)));
//         setCountryID(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.countryID).toString());
//   setPhone(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.phone).toString());
//   setAddress(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.address).toString());

    } catch (error) {
      console.error(error);
    } finally {
        // setTask(data.filter(index=> index.email.includes(auth.email)).map(i=>i.email));
      setLoading(false);
    }

}



useEffect( () => {
  getData();
  console.log(id)
  
  setLoading(false);
  }, [])


  async function create() {
    if(name===''){
      navigation.navigate('Change')
    }
else{
    const post ={
      title,
      content,
      iduser: id,
      status:"Đã duyệt",
      name:name,
      createdAt:Date.now(),
      like:0

    }
    const res = await axios.post(`http://10.0.2.2:5000/api/admin/post/new`,post);

    if(res.status===200){
   
      ToastAndroid.show('Thêm bài viết thành công!', ToastAndroid.SHORT);
      setTitle('');
      setContent('');
      navigation.navigate('Trang chủ');
    }
    else{
      ToastAndroid.show('Đã có lỗi xảy ra!', ToastAndroid.SHORT);
    }}
}


  const [text, setText] = React.useState("");
  const [name, setName] = React.useState("");

  const [id, setId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
//   const [countryID, setCountryID] = React.useState("");
//   const [address, setAddress] = React.useState("");
  // const [text, setText] = React.useState(""); 

  return (
    <View style={{flex: 1, padding: 24}}>
      {/* <Text>Email:</Text>
    <TextInput
      // label="Email"
      value={data.filter(index=> index.email.includes(auth.email)).map(i=>i.email).toString()}
      disabled
      onChangeText={text => setText(text)}
    /> */}
<Text style={styles.text2}>Tiêu đề:</Text>
<TextInput
    
      value={title}
      // disabled
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={text => setTitle(text)}
    />
    <Text style={styles.text2}>Nội dung:</Text>
<TextInput
    // ref={initialRef}
    multiline
        numberOfLines={14}
      value={content}
      // disabled
      onChangeText={text => setContent(text)}
    />

 <TouchableOpacity style={styles.button} onPress={create}>
                        <Text style={styles.text}>Tạo</Text>
                    </TouchableOpacity>
    </View>
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

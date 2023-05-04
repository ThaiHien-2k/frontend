import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect,useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  ScrollView,
  TextInput,
  Pressable,
  ToastAndroid,
  TouchableOpacity,Alert, Modal, 
  // StatusBar,
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
import send from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LogBox } from 'react-native';
import { Appbar } from 'react-native-paper';
import {  Portal, Button, Provider } from 'react-native-paper';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import moment from 'moment';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default function Post({ navigation,route}) {
    // const { itemId, otherParam } = route.params;
    const auth = getAuth().currentUser;
  const [data, setData] = useState([])
  // const [comment, setComment] = useState('')
  const [name, setName] = React.useState("");

  const [id, setId] = React.useState("");
  const [text, setText] = React.useState("");
  const [like, setLike] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [isLoading, setLoading] = useState(true);
//   const DATA = [
//     // {
//     //   title: 'Các buổi hiến sắp tới',
//     //   data: data,
//     // },

//     {

//       data: data,
//     },
   
    
//   ];
  
const [modalVisible, setModalVisible] = useState(false);
  // console.log(comment);
  // const [count, setCount] = useState(1)
  const click = async () => {
    //  count = count++;
    // setCount(count+1);
    // console.log(count);
    navigation.navigate('myTabs');
    // console.log(id);

}

const [cmt, setCmt] = useState([])
const DATA = [
  // {
  //   title: 'Các buổi hiến sắp tới',
  //   data: data,
  // },

  {

    data: cmt,
  },
 
  
];

const getInfor = async () => {
  try {
    const response = await axios.get(`http://10.0.2.2:5000/api/infors`);
    setId(response.data.data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.id).toString());
    setName(response.data.data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.name).toString());
//    

  } catch (error) {
    console.error(error);
  } finally {
      // setTask(data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i.email));
    setLoading(false);
  }

}


async function send() {
  getInfor();
  
  if(id===''){
    navigation.navigate('Change')
  }
  if(comment===''){
     
    ToastAndroid.show('Bình luận không được rỗng!', ToastAndroid.SHORT);}
  else 
  {
  // console.log(comment)
  const comments ={
    iduser:id,
    idPost:route.params.id,
    comment,
    createdAt:Date.now(),
    name:name,
    // like:0

  }
 
  
  const res = await axios.post(`http://10.0.2.2:5000/api/admin/comment/new`,comments);

  if(res.status===200){
 
    ToastAndroid.show('Thêm bình luận thành công!', ToastAndroid.SHORT);
    
   getCmt();
   setComment('')

  }
}
}

const deleteCmt = async (id) => {
  // console.log(id);
  const res = await axios.delete(`http://10.0.2.2:5000/api/admin/comment/`+id);

  if(res.status===200){
 
    ToastAndroid.show('Xóa bình luận thành công!', ToastAndroid.SHORT);
    
   getCmt();
   setModalVisible(!modalVisible);

  }
}


  const getData = async () => {
    try {
   
      const response3 = await axios.get(`http://10.0.2.2:5000/api/posts/`+route.params.id);
      setData(response3.data.data);
      // setLike(response3.data.data.map(i=>i.like))
      // console.log(response3.data.data.map(i=>i.status))
      // console.log(response3.data.data.map(i=>i.like));
  // setTask(data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i));
  // setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
 
}

const getCmt = async () => {
  try {
 
    const response3 = await axios.get(`http://10.0.2.2:5000/api/comments`);
    setCmt(response3.data.data.sort((a, b) =>new Date(a.time).getTime()-new Date(b.time).getTime()).filter(index=> route.params.id.includes(index.idPost)));
    // console.log(response3.data.data.map(i=>i.status))
// setTask(data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i));
// setLoading(false);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }

}
  const [count, setCount] = useState(1)
const clickLike = async (id) => {
  //  count = count++;
  setCount(count+1);
  if(count%2==0){
    const like ={
      like:data.like+1
      
    }
    const res = await axios.put(`http://10.0.2.2:5000/api/admin/post/${route.params.id}`,like);
    getData();
  }
  if(count%2!=0){
    if(data.like==0){
      const like ={
        like:data.like
        
    }
    const res = await axios.put(`http://10.0.2.2:5000/api/admin/post/${route.params.id}`,like);
    }
    if(data.like!=0){
      const like ={
        like:data.like-1
        
    }
    const res = await axios.put(`http://10.0.2.2:5000/api/admin/post/${route.params.id}`,like);}
    
  
    getData();
  }
  console.log(count);
  // navigation.navigate('Post',{ id: id });
  // console.log(id);

}

useEffect( () => {
  getData();
  getCmt();
  getInfor();
//  console.log(cmt)
  // getDta();
  }, [])

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  return (
    <>
<Appbar.Header >
    <Appbar.BackAction  onPress={() => click()}/>
    <Appbar.Content title="Bài viết" />
    {/* <Appbar.Action icon="calendar" onPress={() => {}} />
    <Appbar.Action icon="magnify" onPress={() => {}} /> */}
  </Appbar.Header>
    <ScrollView>
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.header}>Bài viết mới</Text> */}
      <View style={styles.item}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.newsSummary}>   {new Intl.DateTimeFormat('vn-VN', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(data.createdAt)}</Text>
        <View style={styles.item}>  
        <Text style={styles.newsTitle}>   {data.title}</Text>
          <Text style={styles.content}>   {data.content}</Text>
          
          </View> 
          <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',borderTopWidth:2, padding:5}}>
          <Button
        icon='heart'
        mode
        // buttonColor='gray'
        textColor='red'
        buttonColor="#ffe6e6"
        onPress={() =>clickLike(data._id)}
      ><Text style={styles.content}>   {data.like}</Text></Button>
          {/* <Text style={styles.content}>   Bình luận </Text> */}
          {/* <TouchableOpacity  style={styles.button} onPress={seeCmt()}>
            <Text style={styles.textLogin}>Bình luận</Text>
          </TouchableOpacity> */}
          </View></View>
          
          {/* <View> </View> */}
  </SafeAreaView>
  <SafeAreaView style={styles.container}>
      {/* <Text style={styles.header}>Bài viết mới</Text> */}
      <Text style={styles.name}>Bình luận</Text>
      <View style={styles.item2}>
       
        <TextInput
    style={styles.textInput}
      value={comment}
      // disabled
      placeholder='Nhập bình luận của bạn'
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={text => setComment(text)}
    />
          {/* <Text style={styles.content}>   {data.like}</Text> */}
          <TouchableOpacity  style={styles.button} onPress={send}>
            <Text style={styles.textLogin}><Ionicons name="arrow-undo" size={26} color={'blue'} /></Text>
          </TouchableOpacity>
          </View>
          
          {/* <View> </View> */}
          {/* <Text style={styles.name}>Các bình luận</Text> */}
          <SectionList
    
    sections={DATA}
    keyExtractor={(item, index) => item + index}
    renderItem={({item}) => (
      <SafeAreaView>
     <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Bạn có muốn xóa bình luận?</Text>
          <View style={{flexDirection: 'row',}}>
            <Pressable
              style={[ styles.buttonClose]}
              onPress={() => deleteCmt(item.id)}>
              <Text style={styles.textStyle}>Xóa</Text>
            </Pressable>
            <Pressable
              style={[styles.buttonOpen]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Thoát</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
     
     <Pressable
      onLongPress={() => setModalVisible(!modalVisible)}
      // style={styles.item3}
       style={({pressed}) => [
        { marginHorizontal:20,
          marginVertical: 4,
          borderWidth:1,
          borderRadius:10,
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
        },
        styles.wrapperCustom,
      ]}
      >
                 
      <View>
      
      <Text style={styles.name2}>{item.name}</Text>
      <Text style={styles.newsSummary}>   {new Intl.DateTimeFormat('vn-VN', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(item.createdAt)}</Text>
        <Text style={styles.newsTitle2}>   {item.comment}</Text>
        {/* <Text style={styles.newsSummary}>{item.content}</Text> */}
        
      </View>
      </Pressable> 
     
      </SafeAreaView>
        )}
      
        />
  </SafeAreaView>

  </ScrollView>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // marginHorizontal: 16,
    backgroundColor: '#fff',
    borderWidth:1,
    // borderRadius:10
  },

  
  button: {
    width: 50,
    height: 50,
    borderRadius: 5,
    margin: 5,
    
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    // marginTop: 20
  },
  item: {
    // backgroundColor: '#f9c2ff',
    // padding: 20,
    //  backgroundColor: '#fff',
    marginHorizontal:2,
    marginVertical: 4,
    // borderWidth:1,
    // borderRadius:10
  },

  item3: {
    // backgroundColor: '#f9c2ff',
    // padding: 20,
    //  backgroundColor: '#fff',
    marginHorizontal:20,
    marginVertical: 4,
    borderWidth:1,
    borderRadius:10
  },
  item2: {
    flexDirection:'row',
    // backgroundColor: '#f9c2ff',
    // padding: 20,
    //  backgroundColor: '#fff',
    marginHorizontal:2,
    marginVertical: 4,
    // borderWidth:1,
    // borderRadius:10
  },
  header: {
    fontSize: 20,
    textAlign:'center',
    backgroundColor: '#fff',
    padding: 8
  },
  title: {
    padding:5,
    fontSize: 15,
    // borderWidth:1
  },
  
  name : {
    padding: 8,
    paddingBottom:0,
    color : '#4f4f4f',
    fontSize : 20,
    fontWeight:'bold',
    textAlign : 'left',
},
name2: {
  padding: 8,
  paddingBottom:0,
  color : '#4f4f4f',
  fontSize : 15,
  fontWeight:'bold',
  textAlign : 'left',
},
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 22,
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
// button: {
//   borderRadius: 20,
//   padding: 10,
//   elevation: 2,
// },
buttonOpen: {
  width: 50,
  height: 50,
  borderRadius: 5,
  margin: 5,
  
  // backgroundColor: 'blue',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth:1,
  // backgroundColor: '#F194FF',
},
buttonClose: {
  width: 50,
  height: 50,
  borderRadius: 5,
  margin: 5,
  
  // backgroundColor: 'blue',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth:1,
  backgroundColor: 'red',
},

  newsTitle : {
    padding: 8,
    paddingTop:0,
    color : '#4f4f4f',
    fontSize : 20,
    fontWeight:'bold',
    textAlign : 'center',
},
newsTitle2 : {
  padding: 8,
  paddingTop:0,
  color : '#4f4f4f',
  fontSize : 15,
  // fontWeight:'bold',
  // textAlign : 'center',
},
textInput: {
 
  margin: 5,
  fontSize: 18,
  width: 270,
  height: 50,
  borderRadius: 5,
  // backgroundColor: '#232323',
  padding: 10,
  // color: '#ffcccc',
  borderWidth:0.8,
  marginHorizontal:20
},
content : {
    padding: 8,
    paddingTop:0,
    color : '#4f4f4f',
    fontSize : 15,
    textAlign : 'left',
},
newsSummary : {
  padding: 8,
    color : '#bababa',
    paddingTop:0,
    fontSize : 14,
    maxLine:30,
    textAlign : 'left',
},
like : {
  padding: 8,

    fontSize : 14,
    maxLine:30,
    textAlign : 'center',
},
});

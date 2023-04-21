import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  ScrollView,
  TouchableOpacity
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
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LogBox } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Modal, Portal, Button, Provider } from 'react-native-paper';
import { Avatar, Card, IconButton } from 'react-native-paper';

import axios from 'axios';
import moment from 'moment';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default function Post({ navigation,route}) {
    // const { itemId, otherParam } = route.params;

  const [data, setData] = useState([])

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
  

  console.log(route.params.id);
  // const [count, setCount] = useState(1)
  const click = async () => {
    //  count = count++;
    // setCount(count+1);
    // console.log(count);
    navigation.navigate('myTabs');
    // console.log(id);

}

// const view =  (id) => {
//   // navigation.navigate('myTabs');
//   console.log(id)

// }
  
  const getData = async () => {
    try {
   
      const response3 = await axios.get(`http://10.0.2.2:5000/api/posts/`+route.params.id);
      setData(response3.data.data);
      // console.log(response3.data.data.map(i=>i.status))
      console.log(response3.data.data);
  // setTask(data.filter(index=> index.email.includes(auth.email)).map(i=>i));
  // setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
 
}

useEffect( () => {
  getData();
 console.log(data)
  // getDta();
  }, [])

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  return (
    <>
<Appbar.Header>
    <Appbar.BackAction  onPress={() => click()}/>
    <Appbar.Content title="Bài viết" />
    {/* <Appbar.Action icon="calendar" onPress={() => {}} />
    <Appbar.Action icon="magnify" onPress={() => {}} /> */}
  </Appbar.Header>

    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.header}>Bài viết mới</Text> */}
      <View style={styles.item}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.newsSummary}>   {new Intl.DateTimeFormat('vn-VN', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(data.createdAt)}</Text>
        <View style={styles.item}>  
        <Text style={styles.newsTitle}>   {data.title}</Text>
          <Text style={styles.content}>   {data.content}</Text>
          {/* <Text style={styles.content}>   {data.like}</Text> */}
          </View> 
          </View>
          {/* <View> </View> */}
  </SafeAreaView>
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
    borderRadius:10
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

  newsTitle : {
    padding: 8,
    paddingTop:0,
    color : '#4f4f4f',
    fontSize : 20,
    fontWeight:'bold',
    textAlign : 'center',
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

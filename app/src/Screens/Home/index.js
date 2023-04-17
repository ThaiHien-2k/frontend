import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
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
export default function Home({ navigation }) {

  const [data, setData] = useState([])

  const [isLoading, setLoading] = useState(true);
  const DATA = [
    // {
    //   title: 'Các buổi hiến sắp tới',
    //   data: data,
    // },

    {

      data: data,
    },
   
    
  ];

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  }, []);
  // const [count, setCount] = useState(1)
  const click = async (id) => {
    //  count = count++;
    // setCount(count+1);
    // console.log(count);
    navigation.navigate('Post',{ id: id });
    // console.log(id);

}

const view =  (id) => {
  // navigation.navigate('Post');
  // console.log(id)

}
  
  const getData = async () => {
    try {
   
      const response3 = await axios.get(`http://10.0.2.2:5000/api/posts`);
      setData(response3.data.data.sort((a, b) =>new Date(b.time).getTime()-new Date(a.time).getTime()).filter(index=> ['Đã duyệt'].includes(index.status)).slice(0, 3));
      // console.log(response3.data.data.map(i=>i.status))
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
 
  // getDta();
  }, [])


  return (

    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.header}>Các bài viết</Text> */}
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
    <SectionList
    
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => (
        <SafeAreaView>
       
       
                     
                   
        <View style={styles.item}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.newsSummary}>   {moment(item.CreatedAT).format("MM:HHA D/M/YYYY")}</Text>
          <Text style={styles.newsTitle}>   {item.title}</Text>
          {/* <Text style={styles.newsSummary}>{item.content}</Text> */}
          <Text style={styles.like} ><Button   onPress={() => click(item.id)}>
          --Xem thêm--
  </Button></Text>
        </View>
    
       
        </SafeAreaView>
        
      )}
      
    />
  </ScrollView>
  </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // marginHorizontal: 16,
  },
  item: {
    // backgroundColor: '#f9c2ff',
    // padding: 20,
     backgroundColor: '#fff',
    marginHorizontal:8,
    marginVertical: 4,
    borderWidth:1,
    borderRadius:10
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

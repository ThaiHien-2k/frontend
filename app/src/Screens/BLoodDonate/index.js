import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  ScrollView,
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
import { Avatar, Card, IconButton } from 'react-native-paper';
import axios from 'axios';
import moment from 'moment';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default function BLoodDonate({ navigation }) {
  const [data, setData] = useState([])

  const [isLoading, setLoading] = useState(true);
  const DATA = [
    {
      title: 'Các buổi hiến sắp tới',
      data: data,
    },


   
    
  ];

  const getData = async () => {
    try {
   
      const response3 = await axios.get(`http://10.0.2.2:5000/api/bloodDonates`);
      setData(response3.data.data.sort((a, b) =>new Date(b.time).getTime()-new Date(a.time).getTime()).filter(index=> ['Chưa thực hiện'].includes(index.status)));
      // console.log(response3.data.data.map(i=>i.status))
  // setTask(data.filter(index=> index.email.includes('a@gmail.com')).map(i=>i));
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

  return (
    <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => (
        <SafeAreaView>
        <ScrollView>
        <View style={styles.item}>
          <Text style={styles.title}>Tên Buổi hiến: {item.name}</Text>
          <Text style={styles.title}>Thời gian: {moment(item.time).format("MM:HHA D/M/YYYY")}</Text>
          <Text style={styles.title}>Địa điểm: {item.address}</Text>
        </View>
        </ScrollView>
        </SafeAreaView>
      )}
      // renderSectionHeader={({section: {title}}) => (
      //   <Text style={styles.header}>{title}</Text>
      // )}
    />
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
    marginHorizontal:8,
    marginVertical: 4,
    borderWidth:1
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    padding:5,
    fontSize: 15,
    // borderWidth:1
  },
});


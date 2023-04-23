import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  RefreshControl,
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
      setData(response3.data.data.sort((a, b) =>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()).filter(index=> ['Chưa thực hiện'].includes(index.status)));
      // console.log(response3.data.data.map(i=>i.status))
  // setTask(data.filter(index=> index.email.includes(auth.email)).map(i=>i));
  // setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
 
}

const [refreshing, setRefreshing] = React.useState(false);

const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  getData();
  setTimeout(() => {
    setRefreshing(false);
  }, 200);
}, []);
useEffect( () => {
  getData();
 console.log(data)
  // getDta();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => (
        <SafeAreaView>
        <ScrollView>
        <View style={styles.item}>
        <View style={{flexDirection: 'row',}}>
          <Text style={styles.title}>Tên Buổi hiến: </Text>
          <Text style={styles.title2}> {item.name}</Text>

          </View>
          <View style={{flexDirection: 'row',}}>
          <Text style={styles.title}>Thời gian: </Text>
          <Text style={styles.title2}>{item.time.substr(10,5)+' - '+item.timeF.substr(10,5)}</Text>

          </View>
          <View style={{flexDirection: 'row',}}>
          <Text style={styles.title}>Ngày tổ chức: </Text>
          <Text style={styles.title2}>{moment(item.timeF.substring(0,10)).format('DD/MM/YYYY')}</Text>

          </View>
          <View style={{flexDirection: 'row',}}>
          <Text style={styles.title}>Địa điểm: </Text>
          <Text style={styles.title2}>{item.address}</Text>
          </View>
        </View>
        </ScrollView>
        </SafeAreaView>
      )}
      // renderSectionHeader={({section: {title}}) => (
      //   <Text style={styles.header}>{title}</Text>
      // )}
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
    borderWidth:1
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight:'bold',
    padding:5,
    fontSize: 20,
    // borderWidth:1
  },
  title2: {
    padding:5,
    fontSize: 20,
    // borderWidth:1
  },
});



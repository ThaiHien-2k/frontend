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
  SafeAreaView,
  RefreshControl,
  Keyboard,
  SimpleGrid,
  Table,
  Th,
  Tr,
  Td,
  Thead,
  Tbody
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
import { DataTable } from 'react-native-paper';
import axios from 'axios';
import moment from 'moment';
import { List } from 'react-native-paper';
import { Select } from "native-base";
export default function Statistic({ navigation }) {

  const auth = getAuth().currentUser;
  const [id, setId] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [num, setNum] = useState([]);
  const [dta, setDta] = useState([]);
  const [donate, setDonate] = useState([]);
  const [dnTime, setDntime] = useState([]) ;
  const [total, setTotal] = useState([]) ;
  const getId = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:5000/api/infors`);
      setId(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.id).toString());
      setDntime(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.donateTime).toString());
      
      

      const response2 = await axios.get(`http://10.0.2.2:5000/api/donates`);
      setData(response2.data.data.filter(index=> index.iduser.includes(id)).map(i=>i.idBD).toString());
      setDonate(response2.data.data);
      
      const response3 = await axios.get(`http://10.0.2.2:5000/api/bloodDonates`);
      setDta(response3.data.data.filter(index=> data.includes(index.id)));
      setTotal(0);
      // console.log(id)
      // console.log(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.id).toString())
  // setTask(data.filter(index=> index.email.includes(auth.email)).map(i=>i));
  // setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      
      setLoading(false);
    }
 
}
const idU =id;
// console.log(donate)
useEffect( () => {
  getId();

  // getDta();
  }, [])

  const getAmount =  async() => {
 
      const response2 = await axios.get(`http://10.0.2.2:5000/api/donates/amount/`+id);
      setTotal(response2.data.total);

 }   
 getAmount();
//  const sum = total.reduce((partialSum, a) => partialSum + a, 0);
 const getAll =  async() => {
//  setDta(dta)
const response3 = await axios.get(`http://10.0.2.2:5000/api/bloodDonates`);
setDta(response3.data.data.filter(index=> data.includes(index.id)));
// getAmount();
setNum(2);
setExpanded(!expanded);
}   
const getOne =  async() => {
  //  setDta(dta)
  const response3 = await axios.get(`http://10.0.2.2:5000/api/bloodDonates`);
  setDta(response3.data.data.sort((a, b) =>new Date(b.time).getTime()-new Date(a.time).getTime()).filter(index=> data.includes(index.id)).slice(0, 1));
  // getAmount();
  setNum(1);
  setExpanded(!expanded);
  }   
//  console.log(sum);
const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  getId();

  setTimeout(() => {
    setRefreshing(false);
  }, 200);
}, []);

const [expanded, setExpanded] = React.useState(true);
const [refreshing, setRefreshing] = React.useState(false);
const handlePress = () => setExpanded(!expanded);

if(id===''){
  return (
    <SafeAreaView  style={styles.container}>
    <ScrollView >
         <View >
        <Text style={styles.text}>Bạn chưa hiến lần nào!</Text>
      
        </View>
        </ScrollView>
    </SafeAreaView>
  ); 
}
else 
  return (

    <SafeAreaView style={styles.container}>
    <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
         <View >
        <Text style={styles.text}>Số lần hiến: {dnTime} </Text>
        <Text style={styles.text}>Tổng lượng máu đã hiến: {total}ml</Text>
        
   
                    <List.Section style={styles.chosse}>
      <List.Accordion
        title="Chọn kiểu xem"
        expanded={!expanded}
        onPress={handlePress}
       >
        <List.Item title="Xem tất cả"  style={{ borderWidth:1}} onPress={getAll}/>
        <List.Item title="Xem gần nhất" style={{ borderWidth:1}} onPress={getOne}/>
      </List.Accordion>

     
    </List.Section>
              {dta.sort((a, b) =>new Date(a.time).getTime()-new Date(b.time).getTime()).sort((a, b) =>new Date(a.time).getTime()-new Date(b.time).getTime()).map((bloodDonate, index) => {
                const {  name, time, address,id } =
                bloodDonate;
              if(num === 2){
              return (
                
                <View style={styles.item}>
                  <Text style={styles.text}>Lần hiến thứ: {index+1} </Text>
                  <View style={{flexDirection: 'row',}}>
                    <Text style={styles.title}>Tên Buổi hiến: </Text>
                    <Text style={styles.title2}>{name}</Text> 
                    </View>
                    <View style={{flexDirection: 'row',}}>
          <Text style={styles.title}>Thời gian: </Text>
          <Text style={styles.title2}>{new Intl.DateTimeFormat('vn-VN', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'})
        .format(donate.filter(index=> index.idBD.includes(id))
        .filter(index=> index.iduser.includes(idU)).map(index=>index.createdAt))
}</Text>
          </View>
          <View style={{flexDirection: 'row',}}>
          <Text style={styles.title}>Địa điểm:</Text>
          <Text style={styles.title2}>{address}</Text>
          </View>
          <View style={{flexDirection: 'row',}}>
          <Text style={styles.title}>Lượng máu hiến:</Text>
          <Text style={styles.title2}>{donate.filter(index=> index.idBD.includes(id)).filter(index=> index.iduser.includes(idU)).map(index=>index.amount)}ml</Text>

        </View>
        </View>
             
             
              );   }
            if(num ===1 ){
              return (
                <View style={styles.item}>
                <Text style={styles.text}>Lần hiến gần nhất</Text>
                <View style={{flexDirection: 'row',}}>
                  <Text style={styles.title}>Tên Buổi hiến: </Text>
                  <Text style={styles.title2}>{name}</Text> 
                  </View>
                  <View style={{flexDirection: 'row',}}>
        <Text style={styles.title}>Thời gian: </Text>
        <Text style={styles.title2}>{
        new Intl.DateTimeFormat('vn-VN', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'})
        .format(donate.filter(index=> index.idBD.includes(id))
        .filter(index=> index.iduser.includes(idU)).map(index=>index.createdAt))
        }</Text>
        </View>
        <View >
        <Text style={styles.title}>Địa điểm:</Text>
        <Text style={styles.title2}>{address}</Text>
        </View>
        <View style={{flexDirection: 'row',}}>
        <Text style={styles.title}>Lượng máu hiến:</Text>
        <Text style={styles.title2}>{donate.filter(index=> index.idBD.includes(id)).filter(index=> index.iduser.includes(idU)).map(index=>index.amount)}ml</Text>

      </View>
      </View>
             
             
              ); 
            }
          
           
               })}
        
    
 
        
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  table:{
    // backgroundColor: '#fff',
    padding:20,
    fontSize:20,
    
  },
  text:{
    fontWeight:'bold',
   textAlign:'center',
    padding:5,
    fontSize:25,
    
  },

  chosse:{
    marginLeft:160,
    marginRight:30,
    borderWidth:1
   },
  cell:{
    padding:10,
    borderWidth:1
  },
  cell2:{
    height:100,
    padding:10,
    borderWidth:1
  },
  item: {
    // backgroundColor: '#f9c2ff',
    // padding: 20,
    backgroundColor: '#fff',
    marginHorizontal:10,
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
    // fontWeight:'bold',
    padding:5,
    marginHorizontal:10,
    fontSize: 20,
    // borderWidth:1
  },
 
});

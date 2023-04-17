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
//  const sum = total.reduce((partialSum, a) => partialSum + a, 0);
 const getAll =  async() => {
//  setDta(dta)
const response3 = await axios.get(`http://10.0.2.2:5000/api/bloodDonates`);
setDta(response3.data.data.filter(index=> data.includes(index.id)));
getAmount();
setExpanded(!expanded);
}   
const getOne =  async() => {
  //  setDta(dta)
  const response3 = await axios.get(`http://10.0.2.2:5000/api/bloodDonates`);
  setDta(response3.data.data.sort((a, b) =>new Date(b.time).getTime()-new Date(a.time).getTime()).filter(index=> data.includes(index.id)).slice(0, 1));
  getAmount();
  setExpanded(!expanded);
  }   
//  console.log(sum);
const [expanded, setExpanded] = React.useState(true);

const handlePress = () => setExpanded(!expanded);
  return (

    <SafeAreaView >
    <ScrollView >
         <View >
        <Text style={styles.text}>Số lần hiến: {dnTime} </Text>
        <Text style={styles.text}>Tổng lượng máu đã hiến: {total}ml</Text>
        
        {/* <TouchableOpacity onPress={getAll}>
                        <Text >Đăng ký</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={getOne}>
                        <Text >Đăng ký</Text>
                    </TouchableOpacity> */}
                    <List.Section style={styles.chosse}>
      <List.Accordion
        title="Chọn kiểu xem"
        expanded={!expanded}
        onPress={handlePress}
       >
        <List.Item title="Xem tất cả" onPress={getAll}/>
        <List.Item title="Xem gần nhất" onPress={getOne}/>
      </List.Accordion>

     
    </List.Section>
              {dta.sort((a, b) =>new Date(a.time).getTime()-new Date(b.time).getTime()).sort((a, b) =>new Date(a.time).getTime()-new Date(b.time).getTime()).map((bloodDonate, index) => {
                const {  name, time, address,id } =
                bloodDonate;
              
              return (
                <DataTable style={styles.table} key={index}>
                <Text style={styles.Text}>Lần hiến thứ: {index+1} </Text>
            
                <DataTable.Row >
                  <DataTable.Cell  style={styles.cell}>Tên buổi hiến</DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>{name}</DataTable.Cell>
           
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell style={styles.cell}>Thời gian</DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>{moment(time).format("MM:HHA D/M/YYYY")}</DataTable.Cell>
             
                </DataTable.Row>
        
                <DataTable.Row>
                  <DataTable.Cell style={styles.cell}>Địa điểm</DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>{address}</DataTable.Cell>
             
                </DataTable.Row>
        
                <DataTable.Row>
                  <DataTable.Cell style={styles.cell}>Lượng máu hiến</DataTable.Cell>
                
                  <DataTable.Cell style={styles.cell}>{donate.filter(index=> index.idBD.includes(id)).filter(index=> index.iduser.includes(idU)).map(index=>index.amount)}ml</DataTable.Cell>
                </DataTable.Row>
        
              </DataTable>
              
              );
           
               })}
        
    
 
        
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
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
   textAlign:'center',
    padding:5,
    fontSize:20,
    
  },

  chosse:{
    marginLeft:170,
    marginRight:30
   },
  cell:{
    padding:10,
    borderWidth:0.5
  }
 
});

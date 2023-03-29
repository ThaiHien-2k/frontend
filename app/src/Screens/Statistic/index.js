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
export default function Statistic({ navigation }) {

  const [task, setTask] = useState([])
  const data = [
    {id: 1, name: 'John', email: 'john@gmail.com'},
    {id: 2, name: 'Bob', email: 'bob@gmail.com'},
    {id: 3, name: 'Mei', email: 'mei@gmail.com'},
    {id: 4, name: 'Steve', email: 'steve@gmail.com'}
]

  return (
         <View style={styles.container}>
        <Text>Số lần hiến: 1 </Text>
        <Text>Tổng lượng máu đã hiến: 300ml</Text>
        <Text></Text>
        <DataTable style={styles.table}>
        <Text>Lần hiến thứ: 1 </Text>
        {/* <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title numeric>Age</DataTable.Title>
        </DataTable.Header> */}

        <DataTable.Row >
          <DataTable.Cell  style={styles.cell}>Thời gian</DataTable.Cell>
          <DataTable.Cell style={styles.cell}>john@kindacode.com</DataTable.Cell>
   
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell style={styles.cell}>Địa điểm</DataTable.Cell>
          <DataTable.Cell style={styles.cell}>test@test.com</DataTable.Cell>
     
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell style={styles.cell}>Lượng máu hiến</DataTable.Cell>
     
          <DataTable.Cell style={styles.cell}>220ml</DataTable.Cell>
        </DataTable.Row>

      </DataTable>
           
          
 
        
        </View>
     
  );
}

const styles = StyleSheet.create({
  container: {

    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  table:{
    padding:20,
    fontSize:20,
    
  },
  cell:{
    padding:10,
    borderWidth:0.5
  }
 
});

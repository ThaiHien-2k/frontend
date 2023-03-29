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

export default function InforPage({ navigation }) {

  const [task, setTask] = useState([])

  // async function createTasks() {
  //   await addDoc(collection(db, 'tasks'), {
  //     descripition: task,
  //   })
  //   Keyboard.dismiss()
  // }

  // async function querySnapShotUser() {

  //   const usersQuery = collection(db, 'tasks');
  //   await onSnapshot(usersQuery, (snapshopt) => {
  //     let listTask = []
  //     snapshopt.forEach((doc) => {
  //       setTask()
  //       listTask.push(doc.data())
  //       setTask(listTask)
  //       Keyboard.dismiss()
  //       return true
  //     })
  //   })
  // }



  // async function deleteItem() {
  //   alert('Delete')
  // }

  // const renderItemTask = ({ item }) => {
  //   return (
  //     <View style={styles.cardViewItem}>
  //       <View style={{ justifyContent: 'center', alignItems: 'center' }}>
  //         <TouchableOpacity onPress={deleteItem} style={styles.buttonDelete}>
  //           <MaterialIcons
  //             name="delete"
  //             size={30}
  //             color="#232323"
  //           />
  //         </TouchableOpacity>
  //       </View>
  //       <Text style={styles.textItemDescription}> {item.descripition} </Text>
  //     </View>
  //   )
  // }

  // useEffect(() => {
  //   querySnapShotUser();
  // }, []);

  return (
         <View style={styles.container}>
        
        <Text>CMND/CCCD</Text>
           <Text>Họ và tên</Text>
           <Text>Số điện thoại</Text>
           <Text>Địa chỉ</Text>
           <Text>Đơn vị</Text>
           <Text>Giới tính: </Text>
           <Text>Số lần hiến</Text>
           <Text>Tổng lượng máu đã hiến:</Text>
           <Text>Nhóm máu</Text>
           <Text>Trạng thái</Text>
          
 
        
        </View>
     
  );
}

const styles = StyleSheet.create({
  container: {

    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
 
});

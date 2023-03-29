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
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Home({ navigation }) {

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
        

          {/* <TextInput style={styles.textInput}
            placeholder="description tasks"
            placeholderTextColor="#90D700"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType='default'
            value={task}
            onChangeText={(text) => setTask(text)}
          /> */}

          {/* <TouchableOpacity style={styles.buttonTask} onPress={createTasks}>
            <Text style={styles.textTask}>Create</Text>
          </TouchableOpacity> */}

          {/* <FlatList
            style={{ marginTop: 20 }}
            
          /> */}
{/* <HomeHeader  /> */}

          {/* <TouchableOpacity onPress={logout} style={styles.buttonLogout}>
            <MaterialIcons
              name="logout"
              size={30}
              color="#232323"
            /> 
           </TouchableOpacity> */}
          
 
         {/* <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer> */}
        </View>
     
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
  },

});

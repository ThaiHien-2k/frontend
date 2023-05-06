import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  ToastAndroid,
  Alert, Modal, 
} from 'react-native';
import {ActivityIndicator} from 'react-native';
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
import axios from 'axios';
import moment from 'moment';
// import { getAuth } from "firebase/auth";


export default function ViewBookingPage({ navigation }) {
  const auth = getAuth().currentUser;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [idu, setIdu] = useState([])
  const [idBD, setIBD] = React.useState("");
  const [idbooking, setIdbooking] = React.useState("");
  const [task, setTask] = useState([])
  // const bloodStorage_remaining = `http://localhost:5000/api/infors`;

 
  const getData = async () => {
    try {
        const response = await axios.get(`http://10.0.2.2:5000/api/infors`);
      idu.push(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.id).toString());
        
      const response2 = await axios.get(`http://10.0.2.2:5000/api/bookings`);
     setIBD(response2.data.data.filter(i=>i.iduser.includes(idu)).map(i=>i.idBD).toString());
        setData2(response2.data.data)
     setIdbooking(response2.data.data.filter(i=>i.iduser.includes(idu)).map(i=>i.id).toString());
     const response3 = await axios.get(`http://10.0.2.2:5000/api/bloodDonates`);
     setData(response3.data.data);
    //  console.log(idbooking)
  // setTask(data.filter(index=> index.email.includes(auth.email)).map(i=>i));
  // setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
 

  // setData(response);
  // console.log(response);

}
console.log(idu)
const dlt = async () => {
    
    const response2 = await axios.delete(`http://10.0.2.2:5000/api/admin/booking/`+idbooking);
  
    if(response2.status===200){
   
        ToastAndroid.show('Xóa đặt hẹn thành công!', ToastAndroid.SHORT);
        getData();
      }
      else{
        ToastAndroid.show('Đã có lỗi xảy ra!', ToastAndroid.SHORT);
      }
  }
  const [refreshing, setRefreshing] = React.useState(false);

 
useEffect( () => {
    getData();
    
//   getData2(idu)
//   getData3(idBD)

  }, [])


  const onRefresh = React.useCallback(async(idu) => {
    setRefreshing(true);
    // const response2 = await axios.get(`http://10.0.2.2:5000/api/bookings`);
    //  setIBD(response2.data.data.filter(i=>i.iduser.includes(idu)).map(i=>i.idBD).toString());
    //  console.log(idu)
    // setIdu([]);
    // getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  }, []);

// const [remainList, setRemainlist] = useState([]);
// useEffect(()=>{
// const fetchCashFlowsRemaining = async () => {
 
//     const response = await axios.get(bloodStorage_remaining);
   
//     setRemainlist('haha');
// };
// fetchCashFlowsRemaining();
// },[]);
// console.log(idu)
    if (!idBD) return (
    <View style={styles.container}>
       
      <Text style={styles.text1}>Bạn chưa đặt lịch!</Text>

  
       </View>);
        if (!data2) return (
            <View style={styles.container}>
               
              <Text style={styles.text1}>Bạn chưa đặt lịch!</Text>
        
          
               </View>);
  else 
  return (
    <ScrollView  refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        
    <View style={styles.container}>
    {isLoading ? (
      <ActivityIndicator />
    ) : (
      <View style={styles.container} >
          <Text style={styles.title}>Thông tin buổi hiến: </Text>
       <View style={styles.item}>
     
        <View style={{flexDirection: 'row',}}>
          <Text style={styles.title}>Tên Buổi hiến: </Text>
          <Text style={styles.title2}>{data.filter(i=>i.id.includes(idBD)).map(i=>i.name)}</Text>
         
          </View>
          <View style={{flexDirection: 'row',}}>
          <Text style={styles.title}>Thời gian: </Text>
          <Text style={styles.title2}>{data.filter(i=>i.id.includes(idBD)).map(i=>i.time).toString().substr(10,5)+' - '+data.filter(i=>i.id.includes(idBD)).map(i=>i.timeF).toString().substr(10,5)}</Text>

          </View>
          <View style={{flexDirection: 'row',}}>
          <Text style={styles.title}>Ngày tổ chức: </Text>
          <Text style={styles.title2}>{moment(data.filter(i=>i.id.includes(idBD)).map(i=>i.timeF).toString().substring(0,10)).format('DD/MM/YYYY')}</Text>

          </View>
          <View >
          <Text style={styles.title}>Địa điểm: </Text>
          <Text style={styles.title2}>{data.filter(i=>i.id.includes(idBD)).map(i=>i.address)}</Text>
          </View>
        
        </View>
        <View style={styles.container} >
          <Text style={styles.title}>Thông tin đặt hẹn: </Text>
          <View style={styles.item}>
     
     <View style={{flexDirection: 'row',}}>
       <Text style={styles.title3}>Chiều cao: </Text>
       <Text style={styles.title4}>{data2.filter(i=>i.iduser.includes(idu)).map(i=>i.heigh)}cm</Text>
          </View>

          <View style={{flexDirection: 'row',}}>
       <Text style={styles.title3}>Cân nặng: </Text>
       <Text style={styles.title4}>{data2.filter(i=>i.iduser.includes(idu)).map(i=>i.weight)}kg</Text>
          </View>

          <View style={{flexDirection: 'row',}}>
       <Text style={styles.title3}>Giới tính: </Text>
       <Text style={styles.title4}>{data2.filter(i=>i.iduser.includes(idu)).map(i=>i.sex)}</Text>
          </View>

          <View >
       <Text style={styles.title3}>Trong 24 giờ qua có sử dụng rượu bia không: </Text>
       <Text style={styles.title4}>{data2.filter(i=>i.iduser.includes(idu)).map(i=>i.isAcohol)}</Text>
          </View>

          <View>
       <Text style={styles.title3}>Trong 24 giờ qua có sử dụng thuốc lá không: </Text>
       <Text style={styles.title4}>{data2.filter(i=>i.iduser.includes(idu)).map(i=>i.isNicotine)}</Text>
          </View>

          <View >
       <Text style={styles.title3}>Có thức khuya những này trước không: </Text>
       <Text style={styles.title4}>{data2.filter(i=>i.iduser.includes(idu)).map(i=>i.isSitUp)}</Text>
          </View>

          <View >
       <Text style={styles.title3}>Có tiền sử mắc các bệnh tim mạch không: </Text>
       <Text style={styles.title4}>{data2.filter(i=>i.iduser.includes(idu)).map(i=>i.isHeartDisease)}</Text>
          </View>

          <View >
       <Text style={styles.title3}>Trong tuần qua có mắc bệnh phải dùng thuốc không: </Text>
       <Text style={styles.title4}>{data2.filter(i=>i.iduser.includes(idu)).map(i=>i.isSick)}</Text>
          </View>

          <View >
       <Text style={styles.title3}>Có dị ứng với thuốc nào không: </Text>
       <Text style={styles.title4}>{data2.filter(i=>i.iduser.includes(idu)).map(i=>i.isAllergies)}</Text>
          </View>
          </View>
          </View>
        <TouchableOpacity style={styles.button} onPress={dlt}>
                        <Text style={styles.text}>Hủy đặt hẹn</Text>
                    </TouchableOpacity>
       
          </View>
    )}
  </View>
  </ScrollView>
  )
   

}

const styles = StyleSheet.create({
  container: {

    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  title: {
    fontWeight:'bold',
    padding:5,
    fontSize: 20,
    // borderWidth:1
  },
  text: {
    width: 150,
  height: 30,
  borderRadius: 5,
  margin: 5,
  fontSize: 20,
  backgroundColor: 'red',
  justifyContent: 'center',
  textAlign:'center',
  alignItems: 'center',
  borderWidth:1,
},
  item: {
    // backgroundColor: '#f9c2ff',
    // padding: 20,
    backgroundColor: '#fff',
    marginHorizontal:8,
    marginVertical: 4,
    borderWidth:1
  },
  title2: {
    padding:5,
    fontSize: 20,
    // borderWidth:1
  },
  title3: {
    fontWeight:'bold',
    padding:5,
    fontSize: 20,
    // borderWidth:1
  },
  title4: {

    padding:5,
    fontSize: 20,
    // borderWidth:1
  },
  view: {
//    borderWidth:1,
// // backgroundColor:'#d6d6c2'
// backgroundColor: '#fff',
  },
  text1: {
    color: 'red',
    fontSize: 40,
    padding: 5,
    textAlign: 'left',
  },
 
  text2: {
    textAlign: 'left',
    color: 'black',
    fontSize: 20,
    padding: 10,
    fontWeight: 'normal',
    textAlign: 'left',
  },
  text3: {
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    textAlign: 'left',
  },
});

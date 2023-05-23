import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect,useRef } from 'react';
import { Appbar } from 'react-native-paper';
import {
  View,
  Text,
  // TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  ToastAndroid
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
  updateDoc,
  setIndexConfiguration
} from "firebase/firestore";
import { getAuth, Unsubscribe } from "firebase/auth";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import * as React from 'react';
import { Switch } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { Chip } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import axios from 'axios';

export default function BookingPage({ navigation ,route}) {
  const auth = getAuth().currentUser;
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [task, setTask] = useState([]);
  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const initialRef = useRef();
  const getData = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:5000/api/infors`);
      setIdu(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.id).toString());
      setName(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.name).toString());
      setStatus(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.status).toString());
      // const response2 = await axios.get(`http://10.0.2.2:5000/api/bookings`+'/'+idu);
      // setData2(response2.data.data);
  
//       // setData(response.data.data.filter(index=> index.email.includes(auth.email)));
//         setCountryID(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.countryID).toString());
//   setPhone(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.phone).toString());
//   setAddress(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.address).toString());

    } catch (error) {
      console.error(error);
    } finally {
        // setTask(data.filter(index=> index.email.includes(auth.email)).map(i=>i.email));
      setLoading(false);
    }

}

const getData2 = async (idu) => {
  try {
   
    const response2 = await axios.get(`http://10.0.2.2:5000/api/bookings`+'/'+idu);
    setData2(response2.data.data);
    console.log(idu)
    
//       // setData(response.data.data.filter(index=> index.email.includes(auth.email)));
//         setCountryID(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.countryID).toString());
//   setPhone(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.phone).toString());
//   setAddress(response.data.data.filter(index=> index.email.includes(auth.email)).map(i=>i.address).toString());

  } catch (error) {
    console.error(error);
  } finally {
      // setTask(data.filter(index=> index.email.includes(auth.email)).map(i=>i.email));
    setLoading(false);
  }

}

const click = async () => {

    navigation.navigate('Các buổi hiến máu đang tổ chức');

}

useEffect( () => {
  getData();
  
  getData2(idu);

  
  setLoading(false);
  }, [])

  
  const [sex, setSex] = useState('Nam');
  const [heigh, setheigh] = useState([]);
  const [weight, setweight] = useState([]);
  const [isAcohol, setisAcohol] = useState([]);
  const [isNicotine, setisNicotine] = useState([]);
  const [isHeartDisease, setisHeartDisease] = useState([]);
  const [isSitUp, setisSitUp] = useState([]);
  const [isSick, setisSick] = useState([]);
  const [isAllergies, seisAllergies] = useState([]);
  async function create() {
      getData();
      getData2(idu);
      console.log(route.params.id);
    console.log(data2===undefined)
    if(!sex||
    !heigh||
    !weight||
    !isAcohol||
    !isNicotine||
    !isHeartDisease||
    !isSitUp||
    !isSick

    ){
      ToastAndroid.show('Không được bỏ trống thông tin!', ToastAndroid.SHORT);

      navigation.navigate('Booking',{ id: route.params.id });
    
    }

     if(isAllergies===''){
      seisAllergies('Không có')
    }
    if(status==='Chưa thể hiến'){
      ToastAndroid.show('Bạn chưa thể hiến nên không thể đặt lịch!', ToastAndroid.SHORT);
      navigation.navigate('Booking',{ id:route.params.id });
    }
 
    if(data2===undefined){
    const post ={
      

        iduser:idu,
        idBD:route.params.id,
        sex: sex,
    //   status:"Đã duyệt",
      heigh:heigh,
      weight:weight,
      isAcohol:isAcohol,
      isNicotine:isNicotine,
      isHeartDisease:isHeartDisease,
      isSitUp:isSitUp,
      isSick:isSick,
      isAllergies:isAllergies,
      // isAllergies:"Không có",
      createdAt:Date.now(),


    }
    const res = await axios.post(`http://10.0.2.2:5000/api/admin/booking/new`,post);
  
    if(res.status===200){
   
      ToastAndroid.show('Đặt lịch thành công!', ToastAndroid.SHORT);
  
      navigation.navigate('BookingView');
    }
    else{
      ToastAndroid.show('Đã có lỗi xảy ra!', ToastAndroid.SHORT);
      navigation.navigate('Booking',{ id: route.params.id });
    }
  }
  if(data2!=undefined){
    ToastAndroid.show('Bạn đã đặt lịch trước đó vui lòng xóa để có thể đặt lịch!', ToastAndroid.SHORT);
    navigation.navigate('Booking',{ id:route.params.id });
  }
}

const [selected, setSelected] = React.useState(false);
const [selected1, setSelected1] = React.useState(false);
const [selected2, setSelected2] = React.useState(false);
const [selected3, setSelected3] = React.useState(false);
const [selected4, setSelected4] = React.useState(false);
const [selected5, setSelected5] = React.useState(false);
const [selected6, setSelected6] = React.useState(false);
const [selected7, setSelected7] = React.useState(false);
const [selected8, setSelected8] = React.useState(false);
const [selected9, setSelected9] = React.useState(false);
const [selected10, setSelected10] = React.useState(false);
const [selected11, setSelected11] = React.useState(false);



  const [text, setText] = React.useState("");
  const [name, setName] = React.useState("");

  const [idu, setIdu] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
//   const [countryID, setCountryID] = React.useState("");
//   const [address, setAddress] = React.useState("");
  // const [text, setText] = React.useState(""); 

  return (
   <>
    <Appbar.Header style={[
    
        {
         
          backgroundColor: '#ff6666',
        },
      ]}>
    <Appbar.BackAction  onPress={() => click()}/>
    <Appbar.Content title="Thêm thông tin" />
    {/* <Appbar.Action icon="calendar" onPress={() => {}} />
    <Appbar.Action icon="magnify" onPress={() => {}} /> */}
  </Appbar.Header>
  <ScrollView>
    <View style={{flex: 1, padding: 24}}>
      {/* <Text>Email:</Text>
    <TextInput
      // label="Email"
      value={data.filter(index=> index.email.includes(auth.email)).map(i=>i.email).toString()}
      disabled
      onChangeText={text => setText(text)}
    /> */}

    <Text style={styles.text2}>Chiều cao:</Text>
    <TextInput
    
      value={heigh}
      // disabled
      keyboardType='Number'
      autoCapitalize="none"
      autoCorrect={false}
      backgroundColor='white'
      onChangeText={text => setheigh(text)}
    />
    <Text style={styles.text2}>Cân nặng:</Text>
    <TextInput
    
    value={weight}
    // disabled
    keyboardType='Number'
    autoCapitalize="none"
    autoCorrect={false}
    backgroundColor='white'
    onChangeText={text => setweight(text)}
  />
    <Text style={styles.text2}>Giới tính:</Text>
    <View style={{flexDirection: 'row'}}>
    {/* <Switch value={isSwitchOn} onValueChange={onToggleSwitch} /> */}
    <Chip selected={selected} style={{ marginRight:20}} onPress={() => {setSelected(!selected);setSex('Nam')}}>Nam</Chip>
    
    <Chip selected={selected1} onPress={() => {setSelected1(!selected1);setSex('Nữ')}}>Nữ</Chip>
    </View>

  
     <Text style={styles.text2}>Trong 24 giờ qua có sử dụng rượu bia không:</Text>
     <View style={{flexDirection: 'row'}}>
       <Chip selected={selected2} style={{ marginRight:20}} onPress={() => {setSelected2(!selected2);setisAcohol('Có')}}>Có</Chip>
        <Chip selected={selected3} onPress={() => {setSelected3(!selected3);setisAcohol('Không')}}>Không</Chip>
    </View>
     <Text style={styles.text2}>Trong 24 giờ qua có sử dụng thuốc lá không:</Text>
     <View style={{flexDirection: 'row'}}>
       <Chip selected={selected4} style={{ marginRight:20}} onPress={() => {setSelected4(!selected4);setisNicotine('Có')}}>Có</Chip>
        <Chip selected={selected5} onPress={() => {setSelected5(!selected5);setisNicotine('Không')}}>Không</Chip>
    </View>
     <Text style={styles.text2}>Có thức khuya những này trước không:</Text>
     <View style={{flexDirection: 'row'}}>
       <Chip selected={selected6} style={{ marginRight:20}} onPress={() => {setSelected6(!selected6);setisSitUp('Có')}}>Có</Chip>
        <Chip selected={selected7} onPress={() => {setSelected7(!selected7);setisSitUp('Không')}}>Không</Chip>
    </View>
     <Text style={styles.text2}>Có tiền sử mắc các bệnh tim mạch không:</Text>
     <View style={{flexDirection: 'row'}}>
       <Chip selected={selected8} style={{ marginRight:20}} onPress={() => {setSelected8(!selected8);setisHeartDisease('Có')}}>Có</Chip>
        <Chip selected={selected9} onPress={() => {setSelected9(!selected9);setisHeartDisease('Không')}}>Không</Chip>
    </View>
     <Text style={styles.text2}>Trong tuần qua có mắc bệnh phải dùng thuốc không:</Text>
     <View style={{flexDirection: 'row'}}>
       <Chip selected={selected10} style={{ marginRight:20}} onPress={() => {setSelected10(!selected10);setisSick('Có')}}>Có</Chip>
        <Chip selected={selected11} onPress={() => {setSelected11(!selected11);setisSick('Không')}}>Không</Chip>
    </View>
     <Text style={styles.text2}>Có dị ứng với thuốc nào không:</Text>
    <TextInput
    
      value={isAllergies}
      // disabled
      autoCapitalize="none"
      autoCorrect={false}
      backgroundColor='white'
      onChangeText={text => seisAllergies(text)}
    />
 <TouchableOpacity style={styles.button} onPress={create}>
                        <Text style={styles.text}>Đặt hẹn</Text>
                    </TouchableOpacity>
    </View>
    </ScrollView>
    </>
  );
 
};

const styles = StyleSheet.create({
  container: {

    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#90D700',
},
text: {
    color: '#232323',
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
},
text2: {
  // color: '#232323',
  fontSize: 20,
  padding: 10,
  fontWeight:'bold',
  // textAlign: 'center',
},
 
});

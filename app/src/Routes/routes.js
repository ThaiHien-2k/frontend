// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home'
import Login from '../Screens/Login'
import SingUp from '../Screens/SingUp'
import BLoodDonate from '../Screens/BLoodDonate';
import Statistic from '../Screens/Statistic';
import { Ionicons } from "@expo/vector-icons";
import Profile from "../Screens/Profile";
import changePage from '../Screens/change';
import InforPage from '../Screens/Infor';
import CreatePost  from '../Screens/CreatePost';
// import myTabs from '../component/tab';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function myTabs() {
  return (

    <Tab.Navigator
    initialRouteName="Trang chủ"
    tabBarOptions={{
      activeTintColor: "#161F3D",
      inactiveTintColor: "#B8BBc4",
      showLabel: false,
      style: {
        height: 65,
      },
    }}
  >
    <Tab.Screen
      name="Trang chủ"
      component={Home}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Thống kê"
      component={Statistic}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="stats-chart-outline" color={color} size={26} />
        ),
      }}
    /> 
     <Tab.Screen
      name="Tạo bài viết"
      component={CreatePost}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="add-circle-outline" color={color} size={26} />
        ),
      }}
    /> 
   
   
    <Tab.Screen
      name="Các buổi hiến máu sắp tới"
      component={BLoodDonate}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="calendar-outline" color={color} size={26} />
        ),
      }}
    /> 
    <Tab.Screen
      name="Thông tin"
      component={Profile}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="ios-person" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
 
  );}

  function Infor() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Xem thông tin" component={InforPage} />
 
      </Stack.Navigator>
      )
  }

  function Change() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Thay đổi thông tin" component={changePage} />
 
      </Stack.Navigator>
      )
  }


export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name="SingUp" component={SingUp} /> */}
        <Stack.Screen name="myTabs" component={myTabs} />
        <Stack.Screen name="Change" component={Change} />
        <Stack.Screen name="Infor" component={Infor} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Switch, Text, View, Dimensions,Image, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//Import files for Navigation
import {Feather} from '@expo/vector-icons'
import logo from './assets/bondap.png'
//Navigation Drawer Screen
import {createDrawerNavigator,DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native'

import Dashboard from './screens/Dashboard';
import BatteryDashboard from './screens/BatteryDashboard';
import PAMotor from './screens/PAMotor';
import PABattery from './screens/PABattery';
import DMotor from './screens/DMotor';
import DBattery from './screens/DBattery';
import ThermalMapMotor from './screens/ThermalMapMotor'; 
import ThermalMapBattery from './screens/ThermalMapBattery';
import Webview from './screens/Webview';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Custom header with logo and text */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
        <Image
          source={require('./assets/bondap.png')}
          style={{ width: 40, height: 40, marginRight: 10 }}
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Aurora Motor Monitor</Text>
      </View>
      
      {/* Drawer items */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const Stack = createNativeStackNavigator();
function MotorDash(){
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={Dashboard}/>
      <Stack.Screen name="PAMotor" component={PAMotor}/>
    </Stack.Navigator>
  );
}

function BatteryDash(){
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BatteryDashboard" component={BatteryDashboard}/>
      <Stack.Screen name="PABattery" component={PABattery}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="MotorDash" screenOptions={{headerShown: false}} drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="MotorDash" component={MotorDash} options={{drawerLabel: 'Motor Dashboard'}}/>
          <Drawer.Screen name="BatteryDash" component={BatteryDash} options={{drawerLabel: 'Battery Dashboard'}}/>
          <Drawer.Screen name="DMotor" component={DMotor} options={{drawerLabel: 'MotorAR'}}/>
          <Drawer.Screen name="DBattery" component={DBattery} options={{drawerLabel: 'BatteryAR'}}/>
          <Drawer.Screen name="ThermalMapMotor" component={ThermalMapMotor} options={{drawerLabel: 'Motor ThermalAR'}}/>
          <Drawer.Screen name="ThermalMapBattery" component={ThermalMapBattery} options={{drawerLabel: 'Battery ThermalAR'}}/>
          <Drawer.Screen name="Webview" component={Webview} options={{drawerLabel: 'Webview'}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


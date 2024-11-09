import React from 'react';
import { Text, View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Navigation Drawer Screen
import {createDrawerNavigator,DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native'

import Dashboard from './screens/Dashboard';
import BatteryDashboard from './screens/BatteryDashboard';
import PAMotor from './screens/PAMotor';
import PABattery from './screens/PABattery';
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
          <Drawer.Screen name="Webview" component={Webview} options={{drawerLabel: 'About'}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


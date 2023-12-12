import { View, Text, KeyboardAvoidingView, ScrollView, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import DonutChart from './Components/DonutChart'
import {SvgUri} from 'react-native-svg'
import VoltageChart from './Components/VoltageChart'
import TempChart from './Components/TempChart'
import HumidChart from './Components/HumidChart'
import PAMotor from './PAMotor'

// Firebase header files
import {rdb} from '../firebaseConfig.js'
import { ref,onValue } from 'firebase/database'
import HamburgerButton from './Components/HamburgerButton'


const Dashboard = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    const fetchRef = ref(rdb,'motordat/');
    onValue(fetchRef, (snapshot) =>{
      const adata = snapshot?.val();
      const motorData = Object.keys(adata).map(key => ({
         id: key,
         ...adata[key] 
      }));
      setData(motorData);
  });
},[]);

  return (
    
       <View className="flex flex-col justify-center py-8">
        <HamburgerButton/>
      <ScrollView style={styles.scrollView} >
        
      <View className="flex flex-row flex-wrap ml-1 h-full">

      
      {
        data.map((item, index)=>{
          return(
    <View key={index} className="flex flex-row flex-wrap ml-1 h-full">
      <View className="my-1 pr-1 w-full p-6 bg-green-200 border-green-200 rounded-3xl">
      <SvgUri
    width="42px"
    height="42px"
    
    uri="https://svgshare.com/i/10e7.svg"
      />
        <Text className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">{item.Type}</Text>
        <Text className="mt-1 font-normal text-gray-500">Manufactured by {item.manufacturer}</Text>
        <Text className="font-normal text-gray-500">Rated Voltage: {item.ratedVoltage}</Text>
        <Text className="font-normal text-gray-500">Rated Current: {item.ratedCurrent}</Text>
        <Text className="font-normal text-gray-500">Rated RPM: {item.ratedRPM}</Text>
      </View>
      <View>
            <TouchableOpacity className="bg-pink-500  focus:ring-4 focus:outline-none focus:ring-pink-700 dark:focus:ring-pink-800 font-extrabold rounded-3xl  px-14 py-2.5 text-center me-2 mb-2 mx-11 mt-2 justify-center" onPress={()=> navigation.navigate('PAMotor')}><Text className="text-white text-lg">Perform ML Motor Analysis</Text></TouchableOpacity>
      </View>
      <View className="my-1 mx-1 w-48 h-48 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">Voltage</Text>
        <VoltageChart progress={item.actualVoltage} fullrange={item.ratedVoltage}/>
      </View>

      <View className="my-1 mx-1 w-48 h-48 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">Current</Text>
        <VoltageChart progress={item.actualCurrent} fullrange={item.ratedCurrent}/>
      </View>

      <View className="my-1 mx-1 w-48 h-48 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">RPM</Text>
        <VoltageChart progress={item.actualRPM} fullrange={item.ratedRPM}/>
      </View>

      <View className="my-1 mx-1 w-48 h-48 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">Torque</Text>
        <VoltageChart progress={18} fullrange={item.ratedTorque}/>
      </View>

      <View className="my-1 mx-1 w-48 h-48 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">Output Power</Text>
        <VoltageChart progress={item.actualPower} fullrange={item.ratedPower}/>
      </View>

      <View className="my-1 mx-1 w-48 h-48 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">Temperature</Text>
        <TempChart progress={item.temperature} fullrange={item.ratedTemperature}/>
      </View>
     
      <View className="my-1 mx-1 w-48 h-48 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">Humidity</Text>
        <HumidChart progress={item.humidity} fullrange={100}/>
      </View>
    </View>
          )
      })
      }
      </View>
      </ScrollView>
      </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  scrollView: {

   },
  text: {
    fontSize: 42,
  },
});
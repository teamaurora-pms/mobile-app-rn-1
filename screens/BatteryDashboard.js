import { View, Text, KeyboardAvoidingView, ScrollView, TextInput, StyleSheet, Button, TouchableOpacity, Linking } from 'react-native'
import React, {useState, useEffect} from 'react'
import DonutChart from './Components/DonutChart'
import {SvgUri} from 'react-native-svg'
import VoltageChart from './Components/VoltageChart'
import TempChart from './Components/TempChart'
import HumidChart from './Components/HumidChart'


// Firebase header files
import {rdb} from '../firebaseConfig.js'
import { ref,onValue } from 'firebase/database'
import HamburgerButton from './Components/HamburgerButton'


const BatteryDashboard = ({navigation}) => {

  const [data, setData] = useState([]);
 
  useEffect(()=>{
    const fetchRef = ref(rdb,'pms/battery/');
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
        
     

      
      {
        data.map((item, index)=>{
          return(
    <View key={index} className="flex flex-row flex-wrap h-full">
      <View className="my-1 pr-1 w-full p-6 bg-green-200 border-green-200 rounded-3xla">
      <SvgUri
    width="42px"
    height="45px"
    uri="https://svgshare.com/i/10gf.svg"
      />
        <Text className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">{item.Type}</Text>
        <Text className="mt-1 font-normal text-gray-500">Manufactured by {item.manufacturer}</Text>
        <Text className="font-normal text-gray-500">Rated Voltage: {item.ratedVoltage}V</Text>
        <Text className="font-normal text-gray-500">Rated Current: {item.ratedCurrent}A</Text>
        <Text className="font-normal text-gray-500">Capacity: {item.noOfCell}</Text>
        <Text className="font-normal text-gray-500">Number of Cells: {item.ratedPower}Ah</Text>
       
      </View>
     
      <View className="w-48 h-48 mx-1 my-3 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">Backup</Text>
        <HumidChart progress={item.soc} fullrange={100} status="No maintenance required" />
      </View>

      <View className="w-48 h-48 my-3 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">Voltage</Text>
        <VoltageChart progress={item.actualVoltage} fullrange={item.ratedVoltage} status="No maintenance required" />
      </View>

      <View className="w-48 h-48 mx-1 my-3 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">Current</Text>
        <VoltageChart progress={item.actualCurrent} fullrange={item.ratedCurrent} status="No maintenance required"/>
      </View>

      <View className="w-48 h-48 my-3 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">Temperature</Text>
        <TempChart progress={item.temperature} fullrange={100} status="No maintenance required"/>
      </View>
     
      
    </View>
          )
      })
      }
     
      </ScrollView>
      </View>
  )
}

export default BatteryDashboard

const styles = StyleSheet.create({
  scrollView: {

   },
  text: {
    fontSize: 42,
  },
});
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking} from 'react-native'
import React, {useState, useEffect, Suspense} from 'react'
import {SvgUri} from 'react-native-svg'
import VoltageChart from './Components/VoltageChart'
import TempChart from './Components/TempChart'
import HumidChart from './Components/HumidChart'
import LoadingScreen from './LoadingScreen'
// Firebase header files
import {rdb} from '../firebaseConfig.js'
import { ref,onValue } from 'firebase/database'

//Hamburger Menu
import HamburgerButton from './Components/HamburgerButton'

//Axios
import axios from 'axios'


const Dashboard = ({navigation}) => {
  const [data, setData] = useState([]);

  const [voltage, setVoltage]=useState('0');
  const [current, setCurrent]=useState('0');
  const [temperature, setTemperature]=useState('0');
  const [humidity, setHumidity]=useState('0');
  const [vibration, setVibration]=useState('0');

  const [status, setStatus]=useState('No maintenance required');
  const [changer, setChanger]=useState(0);
  

  const mlCode =  () => {
   
    const params = { current, voltage, temperature, humidity, vibration };
    axios
      .post('https://2058-14-194-54-206.ngrok-free.app/prediction', params)
      .then((res) => {
        const msg = res.data.data
        set(msg)
      })
      // .catch((error) => alert(`Error: ${error.message} Unprocessable data`));
  };


  const set = (msg) => {
    setStatus(msg);
  };

  
  useEffect(()=>{
    const fetchRef = ref(rdb,'pms/motor/');
    onValue(fetchRef, (snapshot) =>{
      const adata = snapshot?.val();
      const motorData = Object.keys(adata).map(key => ({
         id: key,
         ...adata[key] 
      }));
      setData(motorData);
      if(data.length === 0){
        setChanger(changer+1)
      }
      
      

  });
  
},[temperature, changer]);

const refreshPage = () => {
  // Navigate to the same screen
  // navigation.navigate('Dashboard');

  // or reset the navigation stack
  navigation.reset({
    index: 0,
    routes: [{ name: 'Dashboard' }],
  });
  if(data.length>0){
    setVoltage(data[0].actualVoltage)
    setCurrent(data[0].actualCurrent)
    setTemperature(data[0].temperature)
    setHumidity(data[0].humidity)
    setVibration(data[0].vibration) 
    mlCode();
    console.log(status)

  }
};



  return (
      <Suspense fallback={<LoadingScreen/>}>
       <View className="flex flex-col justify-center py-8">
        <HamburgerButton/>
      <ScrollView style={styles.scrollView} >
        
        
      {
        data.map((item, index)=>{
          return(
    <View key={index} className="flex flex-row flex-wrap h-full">
      {item.maintenance === 'No maintenance required' && 
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
          <Text className="font-normal text-gray-500">Status: No maintenance required</Text>
        </View>
        }
       { item.maintenance !=='No maintenance required' && <View className="my-1 pr-1 w-full p-6 bg-red-200 border-red-200 rounded-3xl">
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
        <Text className="font-normal text-gray-500">Status: Maintenance required</Text>
      </View>
        }
        
      <View className="flex justify-center items-center">
            <TouchableOpacity className="bg-pink-500  focus:ring-4 focus:outline-none focus:ring-pink-700 dark:focus:ring-pink-800 font-extrabold rounded-3xl  px-11 py-2.5 text-center me-2 mb-2 mx-11 mt-2 justify-center" onPress={()=> navigation.navigate('PAMotor')}><Text className="text-white text-lg">Perform ML Motor Analysis</Text></TouchableOpacity>
      </View>
      <View>
            <TouchableOpacity className="bg-orange-500  focus:ring-4 focus:outline-none focus:ring-orange-700 dark:focus:ring-orange-800 font-extrabold rounded-3xl  px-16 py-2.5 text-center me-2 mb-2 mx-11 mt-2 justify-center" onPress={()=> {Linking.openURL('https://main--stellular-chimera-5e447f.netlify.app/')}}><Text className="text-white text-lg">AR Thermal Mapping</Text></TouchableOpacity>
      </View>
 
        <View className="w-48 h-48 mx-1 my-3 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">Voltage</Text>
        <VoltageChart progress={item.actualVoltage} fullrange={item.ratedVoltage} status={item.maintenance}/>
        </View>

        <View className="w-48 h-48 my-3 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">Current</Text>
        <VoltageChart progress={item.actualCurrent} fullrange={item.ratedCurrent} status={item.maintenance}/>
        </View>

      <View className="w-48 h-48 mx-1 my-3 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">RPM</Text>
        <VoltageChart progress={item.actualRPM} fullrange={item.ratedRPM} status={item.maintenance}/>
      </View>

      <View className="w-48 h-48 my-3 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">Torque</Text>
        <VoltageChart progress={Math.floor((60*item.actualVoltage*item.actualCurrent)/(2*(3.14)*item.actualRPM))} fullrange={Math.floor((60*item.ratedVoltage*item.ratedCurrent)/(2*(3.14)*item.ratedRPM))} status={item.maintenance}/>
      </View>

      <View className="w-48 h-48 mx-1 my-3 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">Output Power</Text>
        <VoltageChart progress={Math.floor(item.actualVoltage*item.actualCurrent)} fullrange={Math.floor(item.ratedVoltage*item.ratedCurrent)} status={item.maintenance}/>
      </View>

      <View className="w-48 h-48 my-3 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">Temperature</Text>
        <TempChart progress={Math.floor(item.temperature)} fullrange={item.ratedTemperature} status={item.maintenance} />
      </View>
     
      <View className="w-48 h-48 mx-1 my-3 bg-slate-200 border border-slate-200 rounded-3xl">
        <Text className="text-center mt-2 font-bold text-lg">Humidity</Text>
        <HumidChart progress={item.humidity} fullrange={100} status={item.maintenance}/>
      </View>
      </View>
    
          )
      })
      }
     
      </ScrollView>
      </View>
      </Suspense>
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
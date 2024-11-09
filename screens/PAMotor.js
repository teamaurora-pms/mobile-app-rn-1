import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native'
import React,{useState, useEffect}from 'react'
import HamburgerButton from './Components/HamburgerButton'

//Firebase
import {rdb} from '../firebaseConfig.js'
import { ref,onValue, set } from 'firebase/database'

//Axios
import axios from 'axios'
import { SvgUri } from 'react-native-svg'

const PAMotor = ({navigation}) => {

  const [data, setData] = useState([]);
  const [input, setInput] = useState('No maintenance required');

  const [voltage, setVoltage]=useState('0');
  const [current, setCurrent]=useState('0');
  const [temperature, setTemperature]=useState('0');
  const [humidity, setHumidity]=useState('0');
  const [vibration, setVibration]=useState('0');
  
  const mlCode =  () => {
   
    const params = { current, voltage, temperature, humidity, vibration };
    axios
      .post('https://3d5c-14-194-54-206.ngrok-free.app/prediction', params)
      .then((res) => {
        const msg = res.data.data;
        setInput(msg);
        if(input === 'Maintenance required'){
          alert('Maintenance required! Your motor requires care and maintenance');
        }
        console.log(input);
      })
  };

  const MLRun = () =>{
    if(data.length>0){
      setVoltage(data[0].actualVoltage);
      setCurrent(data[0].actualCurrent);
      setTemperature(data[0].temperature);
      setHumidity(data[0].humidity);
      setVibration(data[0].vibration); 

      mlCode();
      firebasePush();

      console.log('pushed into firebase');
    }
  }
  const firebasePush = () =>{
    const pushRef = ref(rdb, 'motordat/motor/maintenance/');
    set(pushRef, input);
  }

  useEffect(()=>{
    const fetchRef = ref(rdb,'motordat/');
    console.log('useEffect activated...');
    onValue(fetchRef, (snapshot) =>{
      const adata = snapshot?.val();
      const motorData = Object.keys(adata).map(key => ({
         id: key,
         ...adata[key] 
         
      }));
      setData(motorData); 
      if(input === 'Maintenance required'){
        Alert.alert('Maintenance required!',' Your motor requires care and maintenance');
      }
  });   
    
},[]);

  return (
  <View className="flex flex-col justify-center py-8">
      <HamburgerButton/>
      {
        data.map((item, index)=>{
           return(
      <View key={index}>
     { item.maintenance === 'No maintenance required' ? (
        <View className="my-1 pr-1 w-full p-6 bg-green-200 border-green-200 rounded-3xl">
        <SvgUri
      width="42px"
      height="42px"
      
      uri="https://svgshare.com/i/10e7.svg"
        />
          <Text className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">No maintenance is required</Text>
          <Text className="mt-1 font-normal text-gray-500">Your electric motor is safe and doesn't required any maintenance</Text>
        </View>
     ):(
      <View className="my-1 pr-1 w-full p-6 bg-red-200 border-red-200 rounded-3xl">
      <SvgUri
    width="42px"
    height="42px"
    
    uri="https://svgshare.com/i/10e7.svg"
      />
        <Text className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Maintenance required</Text>
        <Text className="mt-1 font-normal text-gray-500">Your electric motor needs maintenance and care. Please contact nearby service stations.</Text>
      </View>
     )
     }
     </View>
      ) 
    } )
      }
       
      <View>
            <TouchableOpacity className="bg-pink-500  focus:ring-4 focus:outline-none focus:ring-pink-700 dark:focus:ring-pink-800 font-extrabold rounded-3xl  px-11 py-2.5 text-center me-2 mb-2 mx-20 mt-2 justify-center" onPress={()=> {Linking.openURL('https://lovely-sundae-928e2e.netlify.app/bar')}}><Text className="text-white text-lg">Graphical Report </Text></TouchableOpacity>
      </View>
  </View>
    )
} 

export default PAMotor
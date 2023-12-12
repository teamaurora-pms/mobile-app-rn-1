import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {FontAwesome5} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const HamburgerButton = () => {
    const navigation = useNavigation();

    const openDrawer = () => {
        navigation.openDrawer();
    }
  return (
        <View className="mt-5 mx-3">       
        <TouchableOpacity
        style={{alignItems:"flex-end", margin: 10}}
        onPress={openDrawer}
        >
            
            <FontAwesome5  name="bars" size={17} color="#161924"/>
        </TouchableOpacity>
        </View>

  )
}

export default HamburgerButton

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFF"
    },
    text:{
        color:"#161924",
        fontStyle: 20,
        fontWeight:"500"
    }
})
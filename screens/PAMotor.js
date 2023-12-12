import { View, Text , SafeAreaView} from 'react-native'
import React from 'react'
import {WebView} from 'react-native-webview';
import HamburgerButton from './Components/HamburgerButton';

const cust = `<body>
<h1> Hello World</h1>
</body>`;
const PAMotor = () => {
  return <WebView originWhitelist={["*"]} source={{uri:'https://main--playful-longma-99d308.netlify.app/'}} style={{flex:1}} />     
    
  
}

export default PAMotor
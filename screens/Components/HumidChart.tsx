import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import {Svg, G, Circle} from 'react-native-svg';
import Animated, {interpolateColor, useAnimatedProps, useDerivedValue, useSharedValue, withTiming} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type TempChartTypes ={
    progress: number;
    fullrange: number;
    status: string;
}

const HumidChart = ({progress, fullrange, status}:TempChartTypes) => {
    const CIRCUMFERENCE=350;
    const R = CIRCUMFERENCE / (2*Math.PI);
    const STROKE_WIDTH=20;
    const HALF_CIRCLE=R+STROKE_WIDTH;
    const DIAMETER=HALF_CIRCLE*2;

    const progressValue= useSharedValue(0);
    const fullrangeValue=fullrange;

    useEffect(()=>{
       if(!progress){
        progressValue.value=withTiming(0, {duration: 2000});
       } else {
        progressValue.value=withTiming(progress, {duration: 2000});
       }
    },[progress]);

    const animatedProps=useAnimatedProps(()=>{
        return {
            strokeDashoffset: CIRCUMFERENCE * (1 - (progressValue.value/fullrangeValue))
        }
    },[progressValue.value])

    const animatedText = useDerivedValue(()=>{
        return `${Math.floor(progressValue.value)} %`
    })

  return (
    <View style={styles.container}>
      <ReText text={animatedText}
      style={styles.text}/>
     { status==='No maintenance required' ? (
         <Svg 
         width={DIAMETER}
         height={DIAMETER}
       viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}>
           <G origin={`${HALF_CIRCLE},${HALF_CIRCLE}`} rotation={'-90'}>
               <AnimatedCircle
               animatedProps={animatedProps}
               fill={'transparent'}
               r={R}
               cx={'50%'}
               cy={'50%'}
               stroke={'green'}
               strokeWidth={STROKE_WIDTH}
               strokeLinecap='round'
               strokeDasharray={CIRCUMFERENCE}
   
               />
   
               <Circle
               fill={'transparent'}
               stroke={'white'}
               r={R}
               cx={'50%'}
               cy={'50%'}
               strokeWidth={STROKE_WIDTH}
               strokeLinecap='round'
               strokeDasharray={CIRCUMFERENCE}
               strokeOpacity={0.3}
               />
           </G>
         </Svg>) : (
             <Svg 
             width={DIAMETER}
             height={DIAMETER}
           viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}>
               <G origin={`${HALF_CIRCLE},${HALF_CIRCLE}`} rotation={'-90'}>
                   <AnimatedCircle
                   animatedProps={animatedProps}
                   fill={'transparent'}
                   r={R}
                   cx={'50%'}
                   cy={'50%'}
                   stroke={'red'}
                   strokeWidth={STROKE_WIDTH}
                   strokeLinecap='round'
                   strokeDasharray={CIRCUMFERENCE}
       
                   />
       
                   <Circle
                   fill={'transparent'}
                   stroke={'white'}
                   r={R}
                   cx={'50%'}
                   cy={'50%'}
                   strokeWidth={STROKE_WIDTH}
                   strokeLinecap='round'
                   strokeDasharray={CIRCUMFERENCE}
                   strokeOpacity={0.3}
                   />
               </G>
             </Svg>
         )
     }
    </View>
  )
}

const styles=StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        position: 'absolute',
        color: 'black',
        fontSize: 30,
        fontWeight: '900'
    }
})

export default HumidChart
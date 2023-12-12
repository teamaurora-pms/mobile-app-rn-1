import { View, Text, ScrollView } from 'react-native'
import React,{useRef} from 'react'
import {useGLTF} from '@react-three/drei/native';
import useControls from "r3f-native-orbitcontrols"
import motorScene from '../../assets/electric_motor.glb';

const MotorModel = (props) => {
    const [OrbitControls, events] = useControls()
    const { nodes, materials } = useGLTF(motorScene);
    const islandRef = useRef();
  return (

    <group ref={islandRef} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial.geometry}
            material={materials.body}/>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_1.geometry}
            material={materials.parts}/>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_2.geometry}
            material={materials.closingParts}/>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(motorScene);

export default MotorModel
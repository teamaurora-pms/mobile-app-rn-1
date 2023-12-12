import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { toggleSession } from '@react-three/xr';

const VRToggleButton = () => {
  const [isVR, setIsVR] = useState(false);

  const handleClick = async () => {
    const session = await toggleSession('immersive-vr');
    if (session) {
      setIsVR(true);
    } else {
      setIsVR(false);
    }
  };

  return (
    <View>
      <Button title={isVR ? 'Exit VR' : 'Enter VR'} onPress={handleClick} />
    </View>
  );
};

export default VRToggleButton;

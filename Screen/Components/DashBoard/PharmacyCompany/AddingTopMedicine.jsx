import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from '@thirdweb-dev/react-native';
import { Button, TextInput } from 'react-native-paper';
import FileUpload from '../../File/FileUpload';
import { contractAddress } from '../../../../constant';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const AddingTopMedichine = () => {
  const user = useAddress();

  const { contract } = useContract(contractAddress);
  const { mutateAsync: addTopMedichine, isLoading } = useContractWrite(
    contract,
    'addTopMedichine',
  );

  const [topMedicine, SetTopMedicine] = useState('');
  const [errors, setErrors] = useState({ userAddress: false });

  const submitMedicine = async () => {
    // Reset errors state before submitting
    setErrors({ userAddress: false });

    try {
      if (topMedicine.trim() !== '') {
        const data = await addTopMedichine({ args: [topMedicine] });
        console.info('contract call successs', data);
      } else {
        setErrors(prevErrors => ({ ...prevErrors, userAddress: true }));
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleInputChange = (name, value) => {
    if (name === 'topMedicine') {
      SetTopMedicine(value);

      // Reset errors state when input changes
      setErrors({ userAddress: false });
    }
  };

  return (
    <Animated.View entering={FadeInDown.springify()}
    exiting={FadeInUp.springify()}>
      <View style={{ marginHorizontal: 16 }}>
        <Text>Share Data</Text>

        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          keyboardType="default"
          value={topMedicine}
          error={errors.topMedicine}
          onChangeText={value => handleInputChange('topMedicine', value)}
          label="Enter  topMedicine"
        />
        {errors.userAddress && (
          <Text style={{ color: 'red' }}>Field required</Text>
        )}
        <Button
          style={{ marginVertical: 30 }}
          onPress={submitMedicine}
          mode="outlined">
          {/* Your custom button component */}
          Submit
        </Button>
      </View>
    </Animated.View>
  );
};

export default AddingTopMedichine;

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {useContract, useContractWrite} from '@thirdweb-dev/react-native';
import {Button, TextInput} from 'react-native-paper';
import {contractAddress} from '../../../../constant';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const TransferData = () => {
  const {contract} = useContract(contractAddress);
  const {mutateAsync: transferDataByPatient, isLoading} = useContractWrite(
    contract,
    'transferDataByPatient',
  );

  const [userAddress, setUserAddress] = useState('');
  const [errors, setErrors] = useState({userAddress: false});

  const shareData = async () => {
    // Reset errors state before submitting
    setErrors({userAddress: false});

    try {
      if (userAddress.trim() !== '') {
        const data = await transferDataByPatient({args: [userAddress]});
        console.info('contract call successs', data);
      } else {
        setErrors(prevErrors => ({...prevErrors, userAddress: true}));
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleInputChange = (name, value) => {
    if (name === 'userAddress') {
      setUserAddress(value);

      // Reset errors state when input changes
      setErrors({userAddress: false});
    }
  };

  return (
    <Animated.View entering={FadeInDown.springify()}
    exiting={FadeInUp.springify()}>
      <View style={{marginHorizontal: 20, marginTop: 250}}>
        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="default"
          value={userAddress}
          error={errors.userAddress}
          onChangeText={value => handleInputChange('userAddress', value)}
          label="Enter userAddress"
        />
        {errors.userAddress && (
          <Text style={{color: 'red'}}>Field required</Text>
        )}

        <Button
          onPress={shareData}
          mode="contained"
          textColor="white"
          style={{  marginTop: 70, marginHorizontal: 20}}>
          Share Data
        </Button>
      </View>
    </Animated.View>
  );
};

export default TransferData;

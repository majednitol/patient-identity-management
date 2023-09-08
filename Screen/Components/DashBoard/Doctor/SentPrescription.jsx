import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useContract, useContractWrite} from '@thirdweb-dev/react-native';
import {TextInput} from 'react-native-paper';
import FileUpload from '../../File/FileUpload';
import {contractAddress} from '../../../../constant';

const SentPrescription = () => {
  const {contract} = useContract(contractAddress);
  useContractWrite(
    contract,
    'transferDataByPatient'
  );

  const [userAddress, setUserAddress] = useState('');
  const [errors, setErrors] = useState({userAddress: false});

  const handleInputChange = (name, value) => {
    if (name === 'userAddress') {
      setUserAddress(value);

      // Reset errors state when input changes
      setErrors({userAddress: false});
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        style={{
          marginBottom: 0,
          width: 360,
          position: 'absolute',
          top: 130,
          right: 25,
        }}
        mode="outlined"
        keyboardType="default"
        value={userAddress}
        error={errors.userAddress}
        onChangeText={value => handleInputChange('userAddress', value)}
        label="Enter  userAddress"
      />
      {errors.userAddress && <Text style={{color: 'red'}}>Field required</Text>}

      <View
        style={{
          marginTop: 190,
        }}>
        <FileUpload userAddress={userAddress} />
      </View>
    </View>
  );
};

export default SentPrescription;

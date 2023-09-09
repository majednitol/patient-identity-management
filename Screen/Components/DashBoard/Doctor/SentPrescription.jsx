import React, {useState} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {useContract, useContractWrite} from '@thirdweb-dev/react-native';
import {TextInput} from 'react-native-paper';
import FileUpload from '../../File/FileUpload';
import {contractAddress} from '../../../../constant';
const screenHeight = Dimensions.get('window').height;
const SentPrescription = () => {
  const {contract} = useContract(contractAddress);
  useContractWrite(contract, 'transferDataByPatient');

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
    <View style={{ alignItems: 'center'}}>
      <TextInput
       style={{
            marginTop: screenHeight / 6,
            width: 360,
            marginBottom: 20,
            marginLeft: 15,
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

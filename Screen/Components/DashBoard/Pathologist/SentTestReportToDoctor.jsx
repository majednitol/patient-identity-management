import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useContract, useContractWrite} from '@thirdweb-dev/react-native';
import {Button, TextInput} from 'react-native-paper';
import FileUpload from '../../File/FileUpload';
import {contractAddress} from '../../../../constant';
import {ScrollView} from 'react-native-gesture-handler';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const SentTestReportToDoctor = () => {
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
    <ScrollView>
      <View>
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
          label="Enter  Doctor Address"
        />
        {errors.userAddress && (
          <Text style={{color: 'red'}}>Field required</Text>
        )}

        <FileUpload userAddress={userAddress} />
      </View>
    </ScrollView>
  );
};

export default SentTestReportToDoctor;

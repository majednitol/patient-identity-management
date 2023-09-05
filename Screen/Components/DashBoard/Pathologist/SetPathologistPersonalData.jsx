import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useContract, useContractWrite} from '@thirdweb-dev/react-native';
import {contractAddress} from '../../../../constant';
import { ScrollView } from 'react-native-gesture-handler';

const SetPathologistPersonalData = () => {
  const {contract} = useContract(contractAddress);
  const {mutateAsync: setPathologist, isLoading} = useContractWrite(
    contract,
    'setPathologist',
  );
  const [name, setName] = useState('');
  const [pathologistID, setpathologistID] = useState('');
  const [specializationArea, setspecializationArea] = useState('');
  const [totalExperience, settotalExperience] = useState('');

  const [licenseNumber, setlicenseNumber] = useState('');
  const [errors, setErrors] = useState({});
  const handleInputChange = (name, value) => {
    if (name === 'name') {
      setName(value);
    } else if (name === 'pathologistID') {
      setpathologistID(value);
    } else if (name === 'licenseNumber') {
      setlicenseNumber(value);
    } else if (name === 'totalExperience') {
      settotalExperience(value);
    } else if (name === 'specializationArea') {
      setspecializationArea(value);
    }
  };
  const handleSubmit = async () => {
    if (
      name.trim() !== '' &&
      pathologistID.trim() !== '' &&
      specializationArea.trim() !== '' &&
      totalExperience.trim() !== '' &&
      licenseNumber.trim() !== ''
    ) {
      // Perform form submission
      console.log('Form submitted');
      try {
        const data = await setPathologist({
          args: [
            pathologistID,
            name,
            licenseNumber,
            specializationArea,
            totalExperience,
          ],
        });
        console.info('contract call successs', data);
      } catch (err) {
        console.error('contract call failure', err);
      }
    } else {
      console.log('Please fill up all fields');
      setErrors({
        name: name.trim() === '',
        pathologistID: pathologistID.trim() === '',
        specializationArea: specializationArea.trim() === '',
        totalExperience: totalExperience.trim() === '',

        licenseNumber: licenseNumber.trim() === '',
      });
    }
  };

  return (
    <ScrollView>
      {/* Your custom patient input form */}
      <ScrollView View style={{marginHorizontal: 16}}>
        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="numeric"
          value={pathologistID}
          error={errors.pathologistID}
          onChangeText={value => handleInputChange('pathologistID', value)}
          label="Enter your pathologistID"
        />
        {errors.pathologistID && (
          <Text style={{color: 'red'}}>Field required</Text>
        )}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="default"
          value={name}
          error={errors.name}
          onChangeText={value => handleInputChange('name', value)}
          label="Enter your name"
        />
        {errors.name && <Text style={{color: 'red'}}>Field required</Text>}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="default"
          value={specializationArea}
          error={errors.specializationArea}
          onChangeText={value => handleInputChange('specializationArea', value)}
          label="Enter your specializationArea"
        />
        {errors.specializationArea && (
          <Text style={{color: 'red'}}>Field required</Text>
        )}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="numeric"
          value={totalExperience}
          error={errors.totalExperience}
          onChangeText={value => handleInputChange('totalExperience', value)}
          label="Enter your totalExperience"
        />
        {errors.totalExperience && (
          <Text style={{color: 'red'}}>Field required</Text>
        )}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="numeric"
          value={licenseNumber}
          error={errors.licenseNumber}
          onChangeText={value => handleInputChange('licenseNumber', value)}
          label="Enter your licenseNumber"
        />
        {errors.licenseNumber && (
          <Text style={{color: 'red'}}>Field required</Text>
        )}

        <Button
          style={{marginVertical: 30}}
          onPress={handleSubmit}
          mode="outlined">
          {/* Your custom button component */}
          Submit
        </Button>
      </ScrollView>
    </ScrollView>
  );
};

export default SetPathologistPersonalData;

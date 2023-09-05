import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useContract, useContractWrite} from '@thirdweb-dev/react-native';
import {contractAddress} from '../../../../constant';
import { ScrollView } from 'react-native-gesture-handler';
const SetPatientPersonalDetails = () => {
  const {contract} = useContract(contractAddress);
  const {mutateAsync: setPatient, isLoading} = useContractWrite(
    contract,
    'setPatient',
  );
  const [name, setName] = useState('');
  const [patientID, setpatientID] = useState('');
  const [gender, setgender] = useState('');
  const [age, setage] = useState('');
  const [location, setlocation] = useState('');
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    if (name === 'name') {
      setName(value);
    } else if (name === 'patientID') {
      setpatientID(value);
    } else if (name === 'gender') {
      setgender(value);
    } else if (name === 'age') {
      setage(value);
    } else if (name === 'location') {
      setlocation(value);
    }
  };

  const handleSubmit = async () => {
    if (
      name.trim() !== '' &&
      age.trim() !== '' &&
      patientID.trim() !== '' &&
      location.trim() !== '' &&
      gender.trim() !== ''
    ) {
      // Perform form submission
      console.log('Form submitted');
      try {
        const data = await setPatient({
          args: [patientID, name, gender, age, location],
        });
        console.info('contract call successs', data);
      } catch (err) {
        console.error('contract call failure', err);
      }
    } else {
      console.log('Please fill up all fields');
      setErrors({
        name: name.trim() === '',
        patientID: patientID.trim() === '',
        gender: gender.trim() === '',
        age: age.trim() === '',
        location: location.trim() === '',
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
          value={patientID}
          error={errors.patientID}
          onChangeText={value => handleInputChange('patientID', value)}
          label="Enter your patient ID"
        />
        {errors.patientID && <Text style={{color: 'red'}}>Field required</Text>}

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
          value={gender}
          error={errors.gender}
          onChangeText={value => handleInputChange('gender', value)}
          label="Enter your gender"
        />
        {errors.gender && <Text style={{color: 'red'}}>Field required</Text>}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="numeric"
          value={age}
          error={errors.age}
          onChangeText={value => handleInputChange('age', value)}
          label="Enter your age"
        />
        {errors.age && <Text style={{color: 'red'}}>Field required</Text>}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="default"
          value={location}
          error={errors.location}
          onChangeText={value => handleInputChange('location', value)}
          label="Enter your location"
        />
        {errors.location && <Text style={{color: 'red'}}>Field required</Text>}

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

export default SetPatientPersonalDetails;

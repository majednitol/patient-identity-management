import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useContract, useContractWrite} from '@thirdweb-dev/react-native';
import {contractAddress} from '../../../../constant';
import { ScrollView } from 'react-native-gesture-handler';

const SetDoctorPersonalData = () => {
  const {contract} = useContract(contractAddress);
  const {mutateAsync: setDoctor, isLoading} = useContractWrite(
    contract,
    'setDoctor',
  );
  const [name, setName] = useState('');
  const [doctorID, setdoctorID] = useState('');
  const [specialty, setspecialty] = useState('');
  const [consultationFee, setconsultationFee] = useState('');
  const [BMDCNumber, setBMDCNumber] = useState('');
  const [yearOfExperience, setyearOfExperience] = useState('');
  const [errors, setErrors] = useState({});
  const handleInputChange = (name, value) => {
    if (name === 'name') {
      setName(value);
    } else if (name === 'doctorID') {
      setdoctorID(value);
    } else if (name === 'specialty') {
      setspecialty(value);
    } else if (name === 'consultationFee') {
      setconsultationFee(value);
    } else if (name === 'BMDCNumber') {
      setBMDCNumber(value);
    } else if (name === 'yearOfExperience') {
      setyearOfExperience(value);
    }
  };

  const handleSubmit = async () => {
    if (
      name.trim() !== '' &&
      doctorID.trim() !== '' &&
      specialty.trim() !== '' &&
      consultationFee.trim() !== '' &&
      BMDCNumber.trim() !== '' &&
      yearOfExperience.trim() !== ''
    ) {
      // Perform form submission
      console.log('Form submitted');
      try {
        const data = await setDoctor({
          args: [
            doctorID,
            name,
            specialty,
            consultationFee,
            BMDCNumber,
            yearOfExperience,
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
        doctorID: doctorID.trim() === '',
        specialty: specialty.trim() === '',
        consultationFee: consultationFee.trim() === '',
        BMDCNumber: BMDCNumber.trim() === '',
        yearOfExperience: yearOfExperience.trim() === '',
      });
    }
  };

  return (
    <ScrollView>
      <ScrollView View style={{marginHorizontal: 16}}>
        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="numeric"
          value={doctorID}
          error={errors.doctorID}
          onChangeText={value => handleInputChange('doctorID', value)}
          label="Enter your doctorID"
        />
        {errors.doctorID && <Text style={{color: 'red'}}>Field required</Text>}

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
          value={specialty}
          error={errors.specialty}
          onChangeText={value => handleInputChange('specialty', value)}
          label="Enter your specialty"
        />
        {errors.specialty && <Text style={{color: 'red'}}>Field required</Text>}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="numeric"
          value={consultationFee}
          error={errors.consultationFee}
          onChangeText={value => handleInputChange('consultationFee', value)}
          label="Enter your consultationFee"
        />
        {errors.consultationFee && (
          <Text style={{color: 'red'}}>Field required</Text>
        )}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="numeric"
          value={BMDCNumber}
          error={errors.BMDCNumber}
          onChangeText={value => handleInputChange('BMDCNumber', value)}
          label="Enter your BMDCNumber"
        />
        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="numeric"
          value={yearOfExperience}
          error={errors.yearOfExperience}
          onChangeText={value => handleInputChange('yearOfExperience', value)}
          label="Enter your yearOfExperience"
        />
        {errors.yearOfExperience && (
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

export default SetDoctorPersonalData;

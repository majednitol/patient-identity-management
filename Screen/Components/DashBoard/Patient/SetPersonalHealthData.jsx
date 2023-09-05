import React, {useState} from 'react';
import { View, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useContract, useContractWrite} from '@thirdweb-dev/react-native';
import {contractAddress} from '../../../../constant';
import { ScrollView } from 'react-native-gesture-handler';

const SetPersonalHealthData = () => {
  const {contract} = useContract(contractAddress);
  const {mutateAsync: setPatientPersonalData, isLoading} = useContractWrite(
    contract,
    'setPatientPersonalData',
  );
  const [height, setheight] = useState('');
  const [bloodGroup, setbloodGroup] = useState('');
  const [previousDiseases, setpreviousDiseases] = useState('');
  const [medicineDrugs, setmedicineDrugs] = useState('');
  const [badHabits, setbadHabits] = useState('');
  const [chronicDiseases, setchronicDiseases] = useState('');
  const [healthAllergies, sethealthAllergies] = useState('');
  const [birthDefects, setbirthDefects] = useState('');

  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    if (name === 'height') {
      setheight(value);
    } else if (name === 'bloodGroup') {
      setbloodGroup(value);
    } else if (name === 'previousDiseases') {
      setpreviousDiseases(value);
    } else if (name === 'medicineDrugs') {
      setmedicineDrugs(value);
    } else if (name === 'badHabits') {
      setbadHabits(value);
    } else if (name === 'chronicDiseases') {
      setchronicDiseases(value);
    } else if (name === 'healthAllergies') {
      sethealthAllergies(value);
    } else if (name === 'birthDefects') {
      setbirthDefects(value);
    }
  };
  const handleSubmit = async () => {
    if (
      height.trim() !== '' &&
      bloodGroup.trim() !== '' &&
      previousDiseases.trim() !== '' &&
      medicineDrugs.trim() !== '' &&
      badHabits.trim() !== '' &&
      chronicDiseases.trim() !== '' &&
      healthAllergies.trim() !== '' &&
      birthDefects.trim() !== ''
    ) {
      // Perform form submission
      console.log('Form submitted');
      try {
        const data = await setPatientPersonalData({
          args: [
            height,
            bloodGroup,
            previousDiseases,
            medicineDrugs,
            badHabits,
            chronicDiseases,
            healthAllergies,
            birthDefects,
          ],
        });
        console.info('contract call successs', data);
      } catch (err) {
        console.error('contract call failure', err);
      }
    } else {
      console.log('Please fill up all fields');
      setErrors({
        height: height.trim() === '',
        previousDiseases: previousDiseases.trim() === '',
        badHabits: badHabits.trim() === '',
        bloodGroup: bloodGroup.trim() === '',
        medicineDrugs: medicineDrugs.trim() === '',

        chronicDiseases: chronicDiseases.trim() === '',
        healthAllergies: healthAllergies.trim() === '',
        birthDefects: birthDefects.trim() === '',
      });
    }
  };

  return (
    <ScrollView>
      {/* Your custom patient input form */}
      <View View style={{marginHorizontal: 16}}>
        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="numeric"
          value={height}
          error={errors.height}
          onChangeText={value => handleInputChange('height', value)}
          label="Enter your height"
        />
        {errors.height && <Text style={{color: 'red'}}>Field required</Text>}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="default"
          value={previousDiseases}
          error={errors.previousDiseases}
          onChangeText={value => handleInputChange('previousDiseases', value)}
          label="Enter your previousDiseases"
        />
        {errors.previousDiseases && (
          <Text style={{color: 'red'}}>Field required</Text>
        )}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="default"
          value={badHabits}
          error={errors.badHabits}
          onChangeText={value => handleInputChange('badHabits', value)}
          label="Enter your badHabits"
        />
        {errors.badHabits && <Text style={{color: 'red'}}>Field required</Text>}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="default"
          value={bloodGroup}
          error={errors.bloodGroup}
          onChangeText={value => handleInputChange('bloodGroup', value)}
          label="Enter your bloodGroup"
        />
        {errors.bloodGroup && (
          <Text style={{color: 'red'}}>Field required</Text>
        )}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="default"
          value={medicineDrugs}
          error={errors.medicineDrugs}
          onChangeText={value => handleInputChange('medicineDrugs', value)}
          label="Enter your medicineDrugs"
        />
        {errors.medicineDrugs && (
          <Text style={{color: 'red'}}>Field required</Text>
        )}
        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="default"
          value={chronicDiseases}
          error={errors.chronicDiseases}
          onChangeText={value => handleInputChange('chronicDiseases', value)}
          label="Enter your chronicDiseases"
        />
        {errors.chronicDiseases && (
          <Text style={{color: 'red'}}>Field required</Text>
        )}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="default"
          value={healthAllergies}
          error={errors.healthAllergies}
          onChangeText={value => handleInputChange('healthAllergies', value)}
          label="Enter your healthAllergies"
        />
        {errors.birthDefects && (
          <Text style={{color: 'red'}}>Field required</Text>
        )}
        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="default"
          value={birthDefects}
          error={errors.birthDefects}
          onChangeText={value => handleInputChange('birthDefects', value)}
          label="Enter your birthDefects"
        />
        {errors.birthDefects && (
          <Text style={{color: 'red'}}>Field required</Text>
        )}
        <Button
          style={{
            marginVertical: 30,
            marginHorizontal: 50,
            backgroundColor: 'rgb(108, 99, 255)', // Background color
          }}
          onPress={handleSubmit}
          mode="contained"
          labelStyle={{color: 'white'}} // Text color
        >
          {/* Your custom button component */}
          Submit
        </Button>
      </View>
    </ScrollView>
  );
};

export default SetPersonalHealthData;

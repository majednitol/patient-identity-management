import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useContract, useContractWrite} from '@thirdweb-dev/react-native';
import {contractAddress} from '../../../../constant';
import { ScrollView } from 'react-native-gesture-handler';

const SetMediResearchLabPersonalData = () => {
  const {contract} = useContract(contractAddress);
  const {mutateAsync: setMedicalResearchLab, isLoading} = useContractWrite(
    contract,
    'setMedicalResearchLab',
  );
  const [name, setName] = useState('');
  const [labID, setlabID] = useState('');
  const [researchArea, setresearchArea] = useState('');

  const [licenseID, setlicenseID] = useState('');
  const [labRating, setlabRating] = useState('');
  const [errors, setErrors] = useState({});
  const handleInputChange = (name, value) => {
    if (name === 'name') {
      setName(value);
    } else if (name === 'labID') {
      setlabID(value);
    } else if (name === 'licenseID') {
      setlicenseID(value);
    } else if (name === 'researchArea') {
      setresearchArea(value);
    } else if (name === 'labRating') {
      setlabRating(value);
    }
  };
  const handleSubmit = async () => {
    if (
      name.trim() !== '' &&
      labID.trim() !== '' &&
      researchArea.trim() !== '' &&
      licenseID.trim() !== '' &&
      labRating.trim() !== ''
    ) {
      // Perform form submission
      console.log('Form submitted');
      try {
        const data = await setMedicalResearchLab({
          args: [labID, name, licenseID, researchArea, labRating],
        });
        console.info('contract call successs', data);
      } catch (err) {
        console.error('contract call failure', err);
      }
    } else {
      console.log('Please fill up all fields');
      setErrors({
        name: name.trim() === '',
        labID: labID.trim() === '',
        researchArea: researchArea.trim() === '',
        licenseID: licenseID.trim() === '',
        labRating: labRating.trim() === '',
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
          value={labID}
          error={errors.labID}
          onChangeText={value => handleInputChange('labID', value)}
          label="Enter your labID"
        />
        {errors.labID && <Text style={{color: 'red'}}>Field required</Text>}

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
          value={researchArea}
          error={errors.researchArea}
          onChangeText={value => handleInputChange('researchArea', value)}
          label="Enter your researchArea"
        />
        {errors.researchArea && (
          <Text style={{color: 'red'}}>Field required</Text>
        )}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="numeric"
          value={licenseID}
          error={errors.licenseID}
          onChangeText={value => handleInputChange('licenseID', value)}
          label="Enter your licenseID"
        />
        {errors.licenseID && <Text style={{color: 'red'}}>Field required</Text>}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="numeric"
          value={labRating}
          error={errors.labRating}
          onChangeText={value => handleInputChange('labRating', value)}
          label="Enter your labRating"
        />

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

export default SetMediResearchLabPersonalData;

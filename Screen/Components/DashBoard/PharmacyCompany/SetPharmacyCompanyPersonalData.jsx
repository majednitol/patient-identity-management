import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useContract, useContractWrite} from '@thirdweb-dev/react-native';
import {contractAddress} from '../../../../constant';
import {ScrollView} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const SetPharmacyCompanyPersonalData = () => {
  const {contract} = useContract(contractAddress);
  const {mutateAsync: setPharmacyCompany, isLoading} = useContractWrite(
    contract,
    'setPharmacyCompany',
  );
  const [name, setName] = useState('');
  const [companyID, setcompanyID] = useState('');
  const [productInformation, setproductInformation] = useState('');
  const [pharmacyRating, setpharmacyRating] = useState('');

  const [licenseID, setlicenseID] = useState('');
  const [errors, setErrors] = useState({});
  const handleInputChange = (name, value) => {
    if (name === 'name') {
      setName(value);
    } else if (name === 'companyID') {
      setcompanyID(value);
    } else if (name === 'licenseID') {
      setlicenseID(value);
    } else if (name === 'pharmacyRating') {
      setpharmacyRating(value);
    } else if (name === 'productInformation') {
      setproductInformation(value);
    }
  };
  const handleSubmit = async () => {
    if (
      name.trim() !== '' &&
      companyID.trim() !== '' &&
      productInformation.trim() !== '' &&
      pharmacyRating.trim() !== '' &&
      licenseID.trim() !== ''
    ) {
      // Perform form submission
      console.log('Form submitted');
      try {
        const data = await setPharmacyCompany({
          args: [
            companyID,
            name,
            licenseID,
            productInformation,
            pharmacyRating,
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
        companyID: companyID.trim() === '',
        productInformation: productInformation.trim() === '',
        pharmacyRating: pharmacyRating.trim() === '',

        licenseID: licenseID.trim() === '',
      });
    }
  };

  return (
    <ScrollView >
      {/* Your custom patient input form */}
      <ScrollView View style={{marginHorizontal: 16}}>
        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="numeric"
          value={companyID}
          error={errors.companyID}
          onChangeText={value => handleInputChange('companyID', value)}
          label="Enter your companyID"
        />
        {errors.companyID && <Text style={{color: 'red'}}>Field required</Text>}

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
          value={productInformation}
          error={errors.productInformation}
          onChangeText={value => handleInputChange('productInformation', value)}
          label="Enter your productInformation"
        />
        {errors.productInformation && (
          <Text style={{color: 'red'}}>Field required</Text>
        )}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="numeric"
          value={pharmacyRating}
          error={errors.pharmacyRating}
          onChangeText={value => handleInputChange('pharmacyRating', value)}
          label="Enter your pharmacyRating"
        />
        {errors.pharmacyRating && (
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

export default SetPharmacyCompanyPersonalData;

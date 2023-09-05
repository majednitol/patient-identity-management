import { View, Text } from 'react-native'
import React from 'react'
import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react-native';
import { contractAddress } from '../../../../constant';
import DisplayPrescription from './DisplayPrescription';

const PatientPrescription = () => {
    const user = useAddress();
    const { contract } = useContract(contractAddress);
    const { data: doctorAllData,isLoading } = useContractRead(
      contract,
      'getDoctor',
      [user],
    );
  return (
    <View>
      <DisplayPrescription doctorData={doctorAllData}/>
    </View>
  )
}

export default PatientPrescription
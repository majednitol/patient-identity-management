import { View, Text } from 'react-native'
import React from 'react'
import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react-native';
import { contractAddress } from '../../../../constant';
import PatientToMedicalResearchLabSharedData from './PatientToMedicalResearchLab';


const PatientAlPrescription = () => {
    const user = useAddress();
    const { contract } = useContract(contractAddress);
    const {data: MedicalResearchLab, isLoading} = useContractRead(
      contract,
      'getMedicalResearchLab',
      [user],
    );
  return (
    <View>
      <PatientToMedicalResearchLabSharedData medicalLabData={MedicalResearchLab}/>
    </View>
  )
}

export default PatientAlPrescription
import { View, Text } from 'react-native'
import React from 'react'
import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react-native';
import { contractAddress } from '../../../../constant';
import PatientToPharmacyCompanySharedData from './PatientToPharmacyCompanySharedData';

const PatientAllPrescription = () => {
    const user = useAddress();
    const { contract } = useContract(contractAddress);
    const {data: PharmacyCompany, isLoading} = useContractRead(
      contract,
      'getPharmacyCompany',
      [user],
    );
  return (
    <View>
      <PatientToPharmacyCompanySharedData PharmaData={PharmacyCompany}/>
    </View>
  )
}

export default PatientAllPrescription
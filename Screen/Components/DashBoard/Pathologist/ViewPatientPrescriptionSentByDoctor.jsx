import React, {useContext, useEffect} from 'react';

import {contractAddress} from '../../../../constant';
import {
  useAddress,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react-native';
import {View} from 'react-native';
import DisplayFile from '../../File/DisplayFile';
import {Text} from 'react-native-paper';
const ViewPatientPrescriptionSentByDoctor = () => {
  const user = useAddress();

  const {contract} = useContract(contractAddress);
  const {data: PathologistData, isLoading} = useContractRead(
    contract,
    'getPathologist',
    [user],
  );
  return (
    <View>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <DisplayFile userData={PathologistData} />
      )}
    </View>
  );
};

export default ViewPatientPrescriptionSentByDoctor;

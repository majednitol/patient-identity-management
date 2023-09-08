

import {
  useContract,
  useContractRead,
} from '@thirdweb-dev/react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import {contractAddress} from '../../../../constant';
import DisplayFile from '../../File/DisplayFile';



const DisplayPrescription = ({doctorData}) => {
  


  const {contract} = useContract(contractAddress);
  
  const patientAddress = doctorData[7];
  const {data: patientData, isLoading} = useContractRead(
    contract,
    'getPatient',
    [patientAddress[0]],
  );
  return (
    <Animated.View>
      {isLoading ? (
       <ActivityIndicator/>
      ) : patientData ? (
        <DisplayFile userData={patientData} />
      ) : null}
    </Animated.View>
  );
};


export default DisplayPrescription;

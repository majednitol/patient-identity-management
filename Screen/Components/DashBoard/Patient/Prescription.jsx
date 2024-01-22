import React from 'react';
import FileUpload from '../../File/FileUpload';
import DisplayFile from '../../File/DisplayFile';
import {View} from 'react-native';
import {
  useAddress,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react-native';
import {contractAddress} from '../../../../constant';
import Animated, {FadeInLeft, FadeInUp} from 'react-native-reanimated';

const Prescription = () => {
  const user = useAddress();
  const {contract} = useContract(contractAddress);
  const {data: patientData, isLoading} = useContractRead(
    contract,
    'getPatient',
    [user],
  );
  return (
    <Animated.View>
      <DisplayFile userData={patientData} />
    </Animated.View>
  );
};

export default Prescription;

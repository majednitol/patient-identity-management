import React from 'react';
import FileUpload from '../../File/FileUpload';
import DisplayFile from '../../File/DisplayFile';
import {Dimensions, View} from 'react-native';
import {
  useAddress,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react-native';
import {contractAddress} from '../../../../constant';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
const screenHeight = Dimensions.get('window').height;
const Upload_File = () => {
  const user = useAddress();
  const {contract} = useContract(contractAddress);
  const {data: patientData, isLoading} = useContractRead(
    contract,
    'getPatient',
    [user],
  );
  return (
    <Animated.View
      style={{flex: 1}}
      entering={FadeInDown.springify()}
      exiting={FadeInUp.springify()}>
      <FileUpload userAddress={user} userData={patientData} />

      {/* {console.warn(patientData)} */}
    </Animated.View>
  );
};

export default Upload_File;

import React, {useContext} from 'react';
import {View} from 'react-native';
import {
  useAddress,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react-native';
import {contractAddress} from '../../../../constant';
import DisplayFile from '../../File/DisplayFile';

const ViewPrescriptionOrLabReport = () => {
  const user = useAddress();

  const {contract} = useContract(contractAddress);
  const {data: MedicalResearchLab, isLoading} = useContractRead(
    contract,
    'getMedicalResearchLab',
    [user],
  );
  return (
    <View>
      <DisplayFile userData={MedicalResearchLab} />
    </View>
  );
};

export default ViewPrescriptionOrLabReport;

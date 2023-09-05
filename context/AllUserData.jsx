import {
  useAddress,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react-native';
import React, { useEffect, useState } from 'react';
import { contractAddress } from '../constant';

export const DataContext = React.createContext();
const ALLUserDataProvider = ({ children }) => {
  const [patientAllData, setpatientAllData] = useState('');
  const [doctorAllData, setdoctorAllData] = useState('');
  const [MedicalResearchLabAllData, setMedicalResearchLabAllData] =
    useState('');
  const [PathologistAllData, setPathologistAllData] = useState('');
  const [PharmacyCompanyAllData, setPharmacyCompanyAllData] = useState('');
  const user = useAddress();
  const { contract, isLoading } = useContract(contractAddress);
  const { data: patientData } = useContractRead(contract, 'getPatient', [user]);
  
  const { data: doctorData } = useContractRead(contract, 'getDoctor', [user]);
  const { data: MedicalResearchLab } = useContractRead(
    contract,
    'getMedicalResearchLab',
    [user],
  );
  const { data: PathologistData } = useContractRead(
    contract,
    'getPathologist',
    [user],
  );
  const { data: PharmacyCompany } = useContractRead(
    contract,
    'getPharmacyCompany',
    [user],
  );

  const AllData = () => {
   
  };

  useEffect(() => {
    //   AllData();
      console.log("patientAllData",patientAllData)
  }, [user, !isLoading, contract]);

  return (
    <DataContext.Provider
      value={{
        // patientAllData,
        // setpatientAllData,
        // doctorAllData,
        // setdoctorAllData,
        // MedicalResearchLabAllData,
        // setMedicalResearchLabAllData,
        // PathologistAllData,
        // setPathologistAllData,
        // PharmacyCompanyAllData,
        // setPharmacyCompanyAllData,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default ALLUserDataProvider;

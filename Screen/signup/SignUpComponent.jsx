import React, { useEffect } from 'react';

// Import your second screen component
import SetPatientPersonalDetails from '../Components/DashBoard/Patient/SetPersonalDetails';
import SetDoctorPersonalData from '../Components/DashBoard/Doctor/SetDoctorPersonalData';
import SetPathologistPersonalData from '../Components/DashBoard/Pathologist/SetPathologistPersonalData';
import SetMediResearchLabPersonalData from '../Components/DashBoard/MedicalResearchLab/SetMediResearchLabPersonalData';
import SetPharmacyCompanyPersonalData from '../Components/DashBoard/PharmacyCompany/SetPharmacyCompanyPersonalData';
import PrimaryScreen from './PrimaryScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { contractAddress } from '../../constant';
import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react-native';
import Dashboard from '../Components/DashBoard/Dashboard';
import { View } from 'react-native';

const Stack = createStackNavigator();

const SignUpComponent = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: 'rgb(108, 99, 255)'
        
      },
      headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
       
    }}>
      
      <Stack.Screen name=" SignUp Screen" component={PrimaryScreen} />
      <Stack.Screen
        name="Patient SignUp Screen"
        component={SetPatientPersonalDetails}
      />
      <Stack.Screen
        name="Doctor SignUp Screen"
        component={SetDoctorPersonalData}
      />
      <Stack.Screen
        name="Pathologist SignUp Screen"
        component={SetPathologistPersonalData}
      />
      <Stack.Screen
        name="Medical Research Lab SignUp Screen"
        component={SetMediResearchLabPersonalData}
      />
      <Stack.Screen
        name="Pharmacy company SignUp Screen"
        component={SetPharmacyCompanyPersonalData}
      />
    </Stack.Navigator>
  );
};

export default SignUpComponent;

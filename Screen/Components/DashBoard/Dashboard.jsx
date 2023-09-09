/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import 'react-native-gesture-handler';
import {StatusBar, View, useColorScheme} from 'react-native';
import {SimpleLineIcons, MaterialIcons, FontAwesome} from '@expo/vector-icons';
import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {DrawerItemList, createDrawerNavigator} from '@react-navigation/drawer';

import GetPersonalDetails from './Patient/GetPersonalDetails';
import PersonalHealthData from './Patient/PersonalHealthData';
import SetPersonalHealthData from './Patient/SetPersonalHealthData';
import Prescription from './Patient/Prescription';
import TransferData from './Patient/TransferData';

import PatientPersonalDoctors from './Patient/PatientPersonalDoctors';
import Wellcome from '../Notification';
import GetPathologistPersonalData from './Pathologist/GetPathologistPersonalData';
import SentTestReportToDoctor from './Pathologist/SentTestReportToDoctor';
import ViewPatientPrescriptionSentByDoctor from './Pathologist/ViewPatientPrescriptionSentByDoctor';
import GetMediResearchLabPersonalData from './MedicalResearchLab/GetMediResearchLabPersonalData';
import AddResearchLabReport from './MedicalResearchLab/AddResearchLabResport';
import PatientToMedicalResearchLabSharedData from './MedicalResearchLab/PatientToMedicalResearchLab';
import ViewPrescriptionOrLabReport from './MedicalResearchLab/ViewPrescriptionOrLabReport';
import GetDoctorPersonalData from './Doctor/GetDoctorPersonalData';
import SentPrescription from './Doctor/SentPrescription';
import SharedDataFromPathologist from './Doctor/SharedDataFromPathologist';
import DoctorPersonalPatientList from './Doctor/DoctorPersonalPatientList';
import GetPharmacyCompanyPersonalData from './PharmacyCompany/GetPharmacyCompanyPersonalData';
import AddingTopMedichine from './PharmacyCompany/AddingTopMedicine';
import ViewTopMedicine from './PharmacyCompany/ViewTopMedicine';
import PatientToPharmacyCompanySharedData from './PharmacyCompany/v';
import {contractAddress} from '../../../constant';
import Upload_File from './Patient/Upload_File';

import ProfilePicture from '../File/ProfilePicture';
import PatientPrescription from './Doctor/PatientPrescription';
import {Text} from 'react-native-paper';
import Notification from '../Notification';
import PatientAllPrescription from './PharmacyCompany/PatientAllPrescription';
import PatientAlPrescription from './MedicalResearchLab/PatientAlPrescription';

const Drawer = createDrawerNavigator();

export default function Dashboard({ConnectedAccountUser}) {
  const user = useAddress();
  const {contract, isLoading} = useContract(contractAddress);
  const {data: patientData} = useContractRead(contract, 'getPatient', [user]);

  const {data: doctorData} = useContractRead(contract, 'getDoctor', [user]);
  const {data: MedicalResearchLab} = useContractRead(
    contract,
    'getMedicalResearchLab',
    [user],
  );
  const {data: PathologistData} = useContractRead(contract, 'getPathologist', [
    user,
  ]);
  const {data: PharmacyCompany} = useContractRead(
    contract,
    'getPharmacyCompany',
    [user],
  );
  console.warn(ConnectedAccountUser);

  const scheme = useColorScheme();
  StatusBar.setBackgroundColor('rgb(108, 99, 255)');
  const theme = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const MyTheme = {
    dark: false,
    darkcolors: {
      card: 'rgb(255, 255, 255)',
      text: 'white',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
      primary: '#dcb8ff',
      secondary: '#d0c1da',
      tertiary: '#f3b7be',
      error: '#ffb4ab',
      title: '#000000',
      background: '#000000',
    },
    lightColors: {
      borderBottomColor: '#f4f4f4',
      text: '#111',
      backgroundColor: '#fff',
      headerbackgroundColor: 'rgb(108, 99, 255)',
      headerTintColor: '#fff',
      iconcolor: '#808080',
    },
  };

  return (
    <Drawer.Navigator
      drawerContent={props => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 220,
                width: '100%',
                marginTop: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: '#f4f4f4',
                borderBottomWidth: 1,
              }}>
              {isLoading || user == null ? (
                console.log('loading')
              ) : String(ConnectedAccountUser) === '1' ? (
                <ProfilePicture userData={doctorData[12]} />
              ) : String(ConnectedAccountUser) === '2' ? (
                <ProfilePicture userData={PathologistData[10]} />
              ) : String(ConnectedAccountUser) === '4' ? (
                <ProfilePicture userData={PharmacyCompany[10]} />
              ) : String(ConnectedAccountUser) === '3' ? (
                <ProfilePicture userData={MedicalResearchLab[10]} />
              ) : String(ConnectedAccountUser) === '5' ? (
                <ProfilePicture userData={patientData[11]} />
              ) : null}

              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: 'bold',
                  color:
                    scheme === 'light'
                      ? MyTheme.lightColors.text
                      : MyTheme.darkcolors.text,
                }}>
                {isLoading || user == null
                  ? console.log('object')
                  : String(ConnectedAccountUser) === '1'
                  ? doctorData[2]
                  : String(ConnectedAccountUser) === '2'
                  ? PathologistData[2]
                  : String(ConnectedAccountUser) === '4'
                  ? PharmacyCompany[2]
                  : String(ConnectedAccountUser) === '3'
                  ? MedicalResearchLab[2]
                  : String(ConnectedAccountUser) === '5'
                  ? patientData[2]
                  : null}
              </Text>
              <Text style={{marginBottom: 2}}>
                {isLoading || user == null
                  ? console.log('object')
                  : String(ConnectedAccountUser) === '1'
                  ? doctorData[11]
                  : String(ConnectedAccountUser) === '2'
                  ? PathologistData[9]
                  : String(ConnectedAccountUser) === '4'
                  ? PharmacyCompany[8]
                  : String(ConnectedAccountUser) === '3'
                  ? MedicalResearchLab[9]
                  : String(ConnectedAccountUser) === '5'
                  ? patientData[7]
                  : null}
              </Text>
              <View
                style={{
                  fontSize: 16,
                  color:
                    scheme === 'light'
                      ? MyTheme.lightColors.text
                      : MyTheme.darkcolors.text,
                  marginBottom: 50,
                }}>
                <ConnectWallet />
              </View>
            </View>

            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor:
            scheme === 'light'
              ? MyTheme.lightColors.backgroundColor
              : 'rgb(32,33,36)',
          width: 310,
        },
        headerStyle: {
          backgroundColor: 'rgb(108, 99, 255)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerLabelStyle: {
          color:
            scheme === 'light'
              ? MyTheme.lightColors.text
              : MyTheme.darkcolors.text,
        },
      }}>
      <Drawer.Screen
        name="Notification"
        options={{
          drawerLabel: 'Notification',
          title: 'Notification',
          drawerIcon: () => (
            <FontAwesome name="newspaper-o" size={20} color="#808080" />
          ),
        }}
        component={Notification}
      />

      {/* patient */}
      {ConnectedAccountUser == 5 && ( //5
        <>
          <Drawer.Screen
            name="Home"
            options={{
              drawerLabel: 'Patient Basic Information',
              title: 'Patient Basic Information',
              drawerIcon: () => (
                <SimpleLineIcons name="info" size={20} color="#808080" />
              ),
            }}
            component={GetPersonalDetails}
          />

          <Drawer.Screen
            name="Update Personal Health data"
            options={{
              drawerLabel: 'Update Personal Health data',
              title: 'Update Personal Health data',
              drawerIcon: () => (
                <MaterialIcons name="category" size={20} color="#808080" />
              ),
            }}
            component={SetPersonalHealthData}
          />
          <Drawer.Screen
            name="Prescription"
            options={{
              drawerLabel: 'Prescription',
              title: 'Prescription',
              drawerIcon: () => (
                <MaterialIcons
                  name="dashboard-customize"
                  size={20}
                  color="#808080"
                />
              ),
            }}
            component={Prescription}
          />
          <Drawer.Screen
            name="Upload File"
            options={{
              drawerLabel: 'Upload File',
              title: 'Upload File',
              drawerIcon: () => (
                <MaterialIcons
                  name="dashboard-customize"
                  size={20}
                  color="#808080"
                />
              ),
            }}
            component={Upload_File}
          />
          <Drawer.Screen
            name="Share data"
            options={{
              drawerLabel: 'Share data',
              title: 'Share data',
              drawerIcon: () => (
                <SimpleLineIcons name="settings" size={20} color="#808080" />
              ),
            }}
            component={TransferData}
          />

          <Drawer.Screen
            name="Personal Doctor"
            options={{
              drawerLabel: 'Personal Doctor',
              title: 'Personal Doctor',
              drawerIcon: () => (
                <MaterialIcons name="backup" size={20} color="#808080" />
              ),
            }}
            component={PatientPersonalDoctors}
          />
        </>
      )}
      {/* Doctor */}

      {ConnectedAccountUser == 1 && (
        <>
          <Drawer.Screen
            name="Personal Info"
            options={{
              drawerLabel: 'Personal Info',
              title: 'Personal Info',
              drawerIcon: () => (
                <SimpleLineIcons name="home" size={20} color="#808080" />
              ),
            }}
            component={GetDoctorPersonalData}
          />
          <Drawer.Screen
            name="Sent Prescription"
            options={{
              drawerLabel: 'Sent Prescription',
              title: 'Sent Prescription',
              drawerIcon: () => (
                <MaterialIcons name="timer" size={20} color="#808080" />
              ),
            }}
            component={SentPrescription}
          />
          <Drawer.Screen
            name="Pathologist Shared Data"
            options={{
              drawerLabel: 'Pathologist Shared Data',
              title: 'Pathologist Shared Data',
              drawerIcon: () => (
                <MaterialIcons name="category" size={20} color="#808080" />
              ),
            }}
            component={SharedDataFromPathologist}
          />
          <Drawer.Screen
            name="Personal Patient"
            options={{
              drawerLabel: 'Personal Patient',
              title: 'Personal Patient',
              drawerIcon: () => (
                <MaterialIcons
                  name="dashboard-customize"
                  size={20}
                  color="#808080"
                />
              ),
            }}
            component={DoctorPersonalPatientList}
          />
          <Drawer.Screen
            name="Prescription"
            options={{
              drawerLabel: 'Prescription',
              title: 'Prescription',
              drawerIcon: () => (
                <SimpleLineIcons name="settings" size={20} color="#808080" />
              ),
            }}
            component={PatientPrescription}
          />
        </>
      )}
      {/* Pathlogist  */}
      {ConnectedAccountUser == 2 && (
        <>
          <Drawer.Screen
            name="Personal Info"
            options={{
              drawerLabel: 'Personal Info',
              title: 'Personal Info',
              drawerIcon: () => (
                <SimpleLineIcons name="home" size={20} color="#808080" />
              ),
            }}
            component={GetPathologistPersonalData}
          />
          <Drawer.Screen
            name="Share Report To Doctor"
            options={{
              drawerLabel: 'Share Report To Doctor',
              title: 'Share Report To Doctor',
              drawerIcon: () => (
                <MaterialIcons name="timer" size={20} color="#808080" />
              ),
            }}
            component={SentTestReportToDoctor}
          />
          <Drawer.Screen
            name="Patient Prescription"
            options={{
              drawerLabel: 'Patient Prescription',
              title: 'Patient Prescription',
              drawerIcon: () => (
                <MaterialIcons name="image" size={20} color="#808080" />
              ),
            }}
            component={ViewPatientPrescriptionSentByDoctor}
          />
        </>
      )}
      {/* Pharacy */}
      {ConnectedAccountUser == 4 && (
        <>
          <Drawer.Screen
            name="Home"
            options={{
              drawerLabel: 'Personal Information',
              title: 'Personal Information',
              drawerIcon: () => (
                <SimpleLineIcons name="info" size={20} color="#808080" />
              ),
            }}
            component={GetPharmacyCompanyPersonalData}
          />
          <Drawer.Screen
            name="Add Top Medicine"
            options={{
              drawerLabel: 'Add Top Medicine',
              title: 'Add Top Medicine',
              drawerIcon: () => (
                <MaterialIcons name="timer" size={20} color="#808080" />
              ),
            }}
            component={AddingTopMedichine}
          />
          <Drawer.Screen
            name="View Medicine"
            options={{
              drawerLabel: 'View Medicine',
              title: 'Medicine',
              drawerIcon: () => (
                <MaterialIcons
                  name="medical-services"
                  size={20}
                  color="#808080"
                />
              ),
            }}
            component={ViewTopMedicine}
          />
          <Drawer.Screen
            name="Patient Prescription"
            options={{
              drawerLabel: 'Patient Prescription',
              title: 'Patient Prescription',
              drawerIcon: () => (
                <MaterialIcons name="image" size={20} color="#808080" />
              ),
            }}
            component={PatientAllPrescription}
          />
        </>
      )}
      {/* Medical  */}
      {ConnectedAccountUser == 3 && (
        <>
          <Drawer.Screen
            name="Home"
            options={{
              drawerLabel: 'Person Info',
              title: 'Person Info',
              drawerIcon: () => (
                <SimpleLineIcons name="info" size={20} color="#808080" />
              ),
            }}
            component={GetMediResearchLabPersonalData}
          />
          <Drawer.Screen
            name="Add Report"
            options={{
              drawerLabel: 'Add Report',
              title: 'Add Report',
              drawerIcon: () => (
                <MaterialIcons name="report" size={20} color="#808080" />
              ),
            }}
            component={AddResearchLabReport}
          />
          <Drawer.Screen
            name="Patient Prescription"
            options={{
              drawerLabel: 'Patient Prescription',
              title: 'Patient Prescription',
              drawerIcon: () => (
                <MaterialIcons name="image" size={20} color="#808080" />
              ),
            }}
            component={PatientAlPrescription}
          />
          <Drawer.Screen
            name="Prescription or Report"
            options={{
              drawerLabel: 'Prescription or Report',
              title: 'Prescription or Report',
              drawerIcon: () => (
                <MaterialIcons
                  name="dashboard-customize"
                  size={20}
                  color="#808080"
                />
              ),
            }}
            component={ViewPrescriptionOrLabReport}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}

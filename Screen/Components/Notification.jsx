/* eslint-disable react/react-in-jsx-scope */
import {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, Card, MD2Colors, Text} from 'react-native-paper';
import {
  useAddress,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react-native';
import {contractAddress} from '../../constant';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

export default function Notification() {
  const user = useAddress();
  const {contract} = useContract(contractAddress);
  const {data: ConnectedAccountUser,isLoading} = useContractRead(
    contract,
    'ConnectedAccountType',
    [user],
  );
  const {data: patientData} = useContractRead(
    contract,
    'getPatient',
    [user],
  );
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
  const [AllNotification, setAllNotification] = useState('');
  useEffect(() => {
    isLoading
      ? console.log('loading')
      : String(ConnectedAccountUser) === '1'
      ? setAllNotification(doctorData[13])
      : String(ConnectedAccountUser) === '2'
      ? setAllNotification(PathologistData[11])
      : String(ConnectedAccountUser) === '3'
      ? setAllNotification(MedicalResearchLab[11])
      : String(ConnectedAccountUser) === '4'
      ? setAllNotification(PharmacyCompany[11])
      : String(ConnectedAccountUser) === '5'
      ? setAllNotification(patientData[12])
      : null;
  }, [isLoading, ConnectedAccountUser, patientData, doctorData, PathologistData, MedicalResearchLab, PharmacyCompany]);

  return (
    <ScrollView style={{marginHorizontal:10, marginVertical:10}} >
      <Animated.View entering={FadeInDown.duration(800)}
      exiting={FadeInUp.springify()}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size={40}
            animating={true}
            color={MD2Colors.blueA400}
          />
        </View>
      ) : AllNotification.length > 0 ? (
          <Card>
            {AllNotification.map((el, index) => (
          <View key={index} style={{marginVertical:10}}>
            <Card.Content>
              <Text >
                {index + 1}. {el}
              </Text>
            </Card.Content>
          </View>
        ))}
        </Card>
      ) : (
        <Card style={{marginTop: 20, marginHorizontal: 10}}>
          <Card.Content>
            <Text style={styles.title}>You don't have any notification</Text>
          </Card.Content>
        </Card>
        )}
        </Animated.View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
    marginHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 10,
    elevation: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

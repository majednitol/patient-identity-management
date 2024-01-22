import React, { useContext } from 'react';
import { View } from 'react-native';
import {
  useContract,
  useContractRead,
  useAddress,
} from '@thirdweb-dev/react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { contractAddress } from '../../../../constant';
import { Card, Text } from 'react-native-paper';
import PersonalHealthData from './PersonalHealthData';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const GetPersonalDetails = () => {
  const user = useAddress();
  const { contract } = useContract(contractAddress);
  const { data: patientData, isLoading } = useContractRead(
    contract,
    'getPatient',
    [user],
  );

  return (
    <Animated.View
      style={{ marginHorizontal: 12, marginVertical: 50 }}
      entering={FadeInDown.duration(800)}
      exiting={FadeInUp.springify()}>
      {user ? (
        isLoading ? (
          <Animated.View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <ActivityIndicator animating={true} color={MD2Colors.blueA400} />
          </Animated.View>
        ) : (
          <Card style={{ elevation: 7 }}>
            <Card.Content>
              <Text style={styles.title}>Patient Basic Information</Text>

              <CustomText label="Account" value={patientData[0]} />
              <CustomText label="PatientId" value={String(patientData[1])} />
              <CustomText label="Patient Name" value={patientData[2]} />
              <CustomText label="Patient Gender" value={patientData[3]} />
              <CustomText label="Patient Age" value={String(patientData[4])} />
              <CustomText label="Patient Location" value={patientData[5]} />
            </Card.Content>
          </Card>
        )
      ) : null}
      {console.log(patientData)}
      <PersonalHealthData />
    </Animated.View>
  );
};

const CustomText = ({ label, value }) => (
  <Text style={styles.text}>
    <Text style={styles.label}>{label}:</Text>{' '}
    <Text style={styles.boldValue}>{value}</Text>
  </Text>
);

const styles = {
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    marginBottom: 10,
  },
  // label: {
  //   fontWeight: "bold",
  // },
  boldValue: {
    fontWeight: 'bold',
  },
};

export default GetPersonalDetails;

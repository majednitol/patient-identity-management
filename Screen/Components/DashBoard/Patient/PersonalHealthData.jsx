import { View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  useAddress,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react-native';
import { contractAddress } from '../../../../constant';
import { MD2Colors, Card, Text } from 'react-native-paper';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';


const PersonalHealthData = () => {
  const [patientPersonalHealthData, setPatientPersonalHealthData] = useState(
    [],
  );
  const user = useAddress();

  const { contract } = useContract(contractAddress);
  const { data: patientData, isLoading } = useContractRead(
    contract,
    'getPatient',
    [user],
  );

  useEffect(() => {
    if (Array.isArray(patientData)) {
      setPatientPersonalHealthData(patientData[9]);
    }
  }, [patientData]);

  if (!user) {
    return null;
  }

  return (
    <Animated.View style={{ marginVertical: 50 }} entering={FadeInDown.springify()}
      exiting={FadeInUp.springify()}>
      {isLoading ? (
        <ActivityIndicator animating={true} color={MD2Colors.blueA400} />
      ) : (
        <Card >
          <Card.Content>
            <CustomText
              label="Height "
              value={String(patientPersonalHealthData[0])}
            />
            <CustomText
              label="Blood Group "
              value={String(patientPersonalHealthData[1])}
            />
            <CustomText
              label="Previous Diseases"
              value={patientPersonalHealthData[2]}
            />
            <CustomText
              label="Medicine/Drugs"
              value={patientPersonalHealthData[3]}
            />
            <CustomText
              label="Bad Habits"
              value={String(patientPersonalHealthData[4])}
            />
            <CustomText
              label="Chronic Diseases"
              value={patientPersonalHealthData[5]}
            />
            <CustomText
              label="Health Allergies"
              value={patientPersonalHealthData[6]}
            />
            <CustomText
              label="Birth Defects"
              value={patientPersonalHealthData[7]}
            />
          </Card.Content>
        </Card>
      )}

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
export default PersonalHealthData;

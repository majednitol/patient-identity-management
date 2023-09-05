import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  useAddress,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react-native';
import { contractAddress } from '../../../../constant';
import { ActivityIndicator, Card, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const DoctorPersonalPatientList = () => {
  const [doctorPersonalPatientsList, setDoctorPersonalPatientsList] = useState(
    [],
  );
  const user = useAddress();
  const { contract } = useContract(contractAddress);
  const { data: doctorData, isLoading } = useContractRead(
    contract,
    'getDoctor',
    [user],
  );

  useEffect(() => {
    if (!isLoading && Array.isArray(doctorData)) {
      const personalPatients = doctorData[10];
      setDoctorPersonalPatientsList(personalPatients || []);
    }
  }, [user, doctorData, isLoading]);

  return (
    <ScrollView style={{ marginHorizontal: 12,  marginBottom: 50  }}>
      {isLoading ? (
        <ActivityIndicator
          size={45}
          animating={true}
          color="rgb(108, 99, 255)"
          style={{
            flex: 1,
            justifyContent: 'center', // Center content vertically
            alignItems: 'center',
          }}
        />
      ) : doctorPersonalPatientsList.length > 0 ? (
        doctorPersonalPatientsList.map((doctor, index) => (
          <Card style={{ marginTop: 20 }}>
            <Card.Content>
              <Text style={styles.title} key={index}>
                {index + 1}. {doctor}
              </Text>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Card style={{ marginTop: 20 }}>
          <Card.Content>
            <Text style={styles.title}>You don't treatment anyone</Text>
              </Card.Content>
              
        </Card>
      )}
    </ScrollView>
  );
};

export default DoctorPersonalPatientList;
const styles = {
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 1,
  },
};

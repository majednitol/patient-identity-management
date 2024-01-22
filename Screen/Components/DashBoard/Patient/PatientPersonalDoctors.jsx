import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react-native';
import { contractAddress } from '../../../../constant';
import { ActivityIndicator, Card, MD2Colors, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const PatientPersonalDoctors = () => {
  const [patientPersonalDoctorsList, setPatientPersonalDoctorsList] = useState([]);
  const user = useAddress();
  const { contract } = useContract(contractAddress);
  const { data: patientData, isLoading } = useContractRead(contract, 'getPatient', [user]);

  useEffect(() => {
    if (!isLoading && Array.isArray(patientData)) {
      const personalDoctors = patientData[10];
      setPatientPersonalDoctorsList(personalDoctors || []);
    }
  }, [user, patientData, isLoading]);

  return (
    <ScrollView style={styles.container} >
      <Animated.View entering={FadeInDown.duration(800)}
        exiting={FadeInUp.springify()}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={40} animating={true} color={MD2Colors.blueA400} />
          </View>
        ) : patientPersonalDoctorsList.length > 0 ? (
          patientPersonalDoctorsList.map((doctor, index) => (
            <Card key={index} style={styles.card}>
              <Card.Content>
                <Text> {doctor}</Text>
              </Card.Content>
            </Card>
          ))
        ) : (

          <Card style={{ marginTop: 20 }}>
            <Card.Content>
              <Text style={styles.title}>You don't have treatment from anyone</Text>
            </Card.Content>

          </Card>
        )}
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
    marginHorizontal: 20,
    marginTop: 15,
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

export default PatientPersonalDoctors;

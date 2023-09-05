import { View } from 'react-native';
import React from 'react';
import {
  useAddress,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react-native';
import { contractAddress } from '../../../../constant';
import { ActivityIndicator, Card, MD2Colors, Text } from 'react-native-paper';
const GetDoctorPersonalData = () => {
  const user = useAddress();

  const { contract } = useContract(contractAddress);
  const { data: doctorData, isLoading } = useContractRead(
    contract,
    'getDoctor',
    [user],
  );
  return (
    <View style={{ marginHorizontal: 12, marginVertical: 50 }}>
      {isLoading ? (
        <ActivityIndicator animating={true} color={MD2Colors.blueA400} />
      ) : (
        <Card>
          <Card.Content>
            <Text style={styles.title}>Doctor Basic Information</Text>
            <CustomText label="Account " value={doctorData[0]} />
            <CustomText label="DoctorId " value={String(doctorData[1])} />
            <CustomText label="Doctor Name" value={doctorData[2]} />
            <CustomText label="BMDC Number" value={String(doctorData[5])} />
            <CustomText label="Doctor Speciality" value={doctorData[3]} />
            <CustomText
              label="Consultation Fee"
              value={String(doctorData[4])}
            />
            <CustomText
              label="Year Of Experience"
              value={String(doctorData[6])}
            />
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

export default GetDoctorPersonalData;

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
    marginBottom: 15,
  },
  text: {
    marginBottom: 13,
    fontSize:18
  },
  // label: {
  //   fontWeight: "bold",
  // },
  boldValue: {
    fontWeight: 'bold',
  },
};

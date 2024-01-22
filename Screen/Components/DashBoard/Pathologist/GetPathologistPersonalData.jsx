import { View, Text } from 'react-native';
import React from 'react';
import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react-native';
import { contractAddress } from '../../../../constant';
import { ActivityIndicator, Card, MD2Colors } from 'react-native-paper';
const GetPathologistPersonalData = () => {
  const user = useAddress();

  const { contract } = useContract(contractAddress);
  const { data: PathologistData, isLoading } = useContractRead(contract, 'getPathologist', [user]);

  return (
    <View style={{ marginHorizontal: 12, marginVertical: 50 }}>
      {isLoading ? (
        <ActivityIndicator animating={true} color={MD2Colors.blueA400} />
      ) : (
        <Card>
          <Card.Content>
            <Text style={styles.title}>Pathologist Personal Information</Text>
            <CustomText label="Account " value={PathologistData[0]} />
            <CustomText label="PathologistID" value={String(PathologistData[1])} />
            <CustomText label="Pathologist Name" value={PathologistData[2]} />
            <CustomText label="licenseNumber" value={String(PathologistData[3])} />
            <CustomText label="Specialization Area" value={PathologistData[4]} />
            <CustomText
              label="totalExperience"
              value={String(PathologistData[5])}
            />

          </Card.Content>
        </Card>
      )}
    </View>
  );
};

export default GetPathologistPersonalData;

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
    marginBottom: 5,
  },
  // label: {
  //   fontWeight: "bold",
  // },
  boldValue: {
    fontWeight: 'bold',
  },
};

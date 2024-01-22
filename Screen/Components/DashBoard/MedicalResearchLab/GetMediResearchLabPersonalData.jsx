import { View } from 'react-native';
import React from 'react';
import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react-native';
import { contractAddress } from '../../../../constant';
import { ActivityIndicator, Card, MD2Colors, Text } from 'react-native-paper';
const GetMediResearchLabPersonalData = () => {
  const user = useAddress();

  const { contract } = useContract(contractAddress);
  const { data: MedicalResearchLab, isLoading } = useContractRead(contract, 'getMedicalResearchLab', [user]);

  return (


    <View style={{ marginHorizontal: 12, marginVertical: 50 }}>
      {isLoading ? (
        <ActivityIndicator animating={true} color={MD2Colors.blueA400} />
      ) : (
        <Card>
          <Card.Content>
            <Text style={styles.title}>Medical Reserch Lab Information</Text>
            <CustomText label="Lab Address " value={MedicalResearchLab[0]} />
            <CustomText label="Lab Name " value={MedicalResearchLab[2]} />
            <CustomText label="LicenseID" value={String(MedicalResearchLab[3])} />
            <CustomText label="LabID" value={String(MedicalResearchLab[1])} />
            <CustomText label="Research Area" value={MedicalResearchLab[4]} />
            <CustomText
              label="Lab Rating"
              value={String(MedicalResearchLab[5])}
            />

          </Card.Content>
        </Card>
      )}
    </View>
  );
};

export default GetMediResearchLabPersonalData;


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

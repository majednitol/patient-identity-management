import { View } from 'react-native'
import React from 'react'
import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react-native';
import { contractAddress } from '../../../../constant';
import { ActivityIndicator, Card, MD2Colors,Text } from "react-native-paper";
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
const GetPharmacyCompanyPersonalData = () => {
  const user = useAddress()

  const { contract } = useContract(contractAddress);
  const { data: PharmacyCompany, isLoading } = useContractRead(contract, "getPharmacyCompany", [user])

  return (

    

    <Animated.View style={{ marginHorizontal: 12, marginVertical: 50 }} entering={FadeInDown.springify()}
    exiting={FadeInUp.springify()}>
      {isLoading ? (
        <ActivityIndicator animating={true} color={MD2Colors.blueA400} />
      ) : (
        <Card>
          <Card.Content>
            <Text style={styles.title}>Pharmacy Company Information</Text>
            <CustomText label="Account " value={PharmacyCompany[0]} />
            <CustomText label="companyID " value={String(PharmacyCompany[1])} />
            <CustomText label="Company Name" value={PharmacyCompany[2]} />
            <CustomText label="licenseID" value={String(PharmacyCompany[3])} />
            <CustomText label="product Information" value={PharmacyCompany[4]} />
            <CustomText
              label="pharmacyRating"
              value={String(PharmacyCompany[5])}
            />
            
          </Card.Content>
        </Card>
      )}
    </Animated.View>

  );
}

export default GetPharmacyCompanyPersonalData

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

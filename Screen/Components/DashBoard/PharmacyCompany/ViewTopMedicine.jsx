import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  useAddress,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react-native';
import { contractAddress } from '../../../../constant';
import { Card, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const ViewTopMedicine = () => {
  const [topMedicine, setTopMedicine] = useState([]);
  const user = useAddress();
  const { contract } = useContract(contractAddress);
  const { data: pharmacyCompany, isLoading } = useContractRead(
    contract,
    'getPharmacyCompany',
    [user],
  );

  useEffect(() => {
    if (pharmacyCompany && pharmacyCompany[9]) {
      setTopMedicine(pharmacyCompany[9]);
    }
  }, [pharmacyCompany]);

  return (
    <View style={{ marginHorizontal: 15, marginBottom: 50 }}>
      <ScrollView>
        {topMedicine.map((el, i) => (
          <Card style={{ marginTop: 20 }}>
            <Card.Content>
              <Text style={styles.title} key={i}>
                {i + 1}. {el}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   listContainer: {
//     marginTop: 10,
//   },
//   listItem: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
// });

const styles = {
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
};
export default ViewTopMedicine;

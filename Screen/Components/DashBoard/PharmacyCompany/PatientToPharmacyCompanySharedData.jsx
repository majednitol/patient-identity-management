import React, {useEffect, useState} from 'react';
import {
  useAddress,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react-native';
import {Text, TouchableOpacity, View, Image, Linking} from 'react-native';
import {contractAddress} from '../../../../constant';

const PatientToPharmacyCompanySharedData = () => {
  const user = useAddress();

  const {contract} = useContract(contractAddress);
  const {data: PharmacyCompany, isLoading} = useContractRead(
    contract,
    'getPharmacyCompany',
    [user],
  );

  const [imageUrl, setImageUrl] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const patientAllAddress = PharmacyCompany[7];

      const images = await Promise.all(
        patientAllAddress.map(async el => {
          try {
            const {data: patientPrescription} = useContractRead(
              contract,
              'showSharedPrescription',
              [el],
            );
            return patientPrescription;
          } catch (error) {
            console.warn(error);
            return null;
          }
        }),
      );

      setImageUrl(images);
    };

    if (
      PharmacyCompany &&
      PharmacyCompany[7] &&
      PharmacyCompany[7].length > 0
    ) {
      fetchData();
    }
  }, [PharmacyCompany, contract]);

  const displayImages = () => {
    if (imageUrl.length > 0) {
      const images = imageUrl.map((item, i) => {
        const imgUrl = item;

        return (
          <TouchableOpacity key={i} onPress={() => Linking.openURL(imgUrl)}>
            <Image
              source={{uri: imgUrl}}
              style={{width: 100, height: 100}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        );
      });

      setData(images);
    } else {
      alert('No file to display');
    }
  };

  return (
    <View>
      <View>{data}</View>
      <TouchableOpacity onPress={displayImages}>
        <Text>Get data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PatientToPharmacyCompanySharedData;

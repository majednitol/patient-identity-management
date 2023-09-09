// import React, { useEffect, useState } from "react";
// import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react-native";
// import { Text, TouchableOpacity, View, Image, Linking } from "react-native";
// import { contractAddress } from "../../../../constant";

// const PatientToMedicalResearchLabSharedData = () => {
//   const user = useAddress();
//   const { contract } = useContract(contractAddress);
//   const { data: medicalResearchData, isLoading } = useContractRead(contract, "getMedicalResearchLab", [user])

//   const [imageUrl, setImageUrl] = useState("");
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const patientAllAddress = medicalResearchData[7];

//       const images = await Promise.all(
//         patientAllAddress.map(async (el) => {
//           try {
//             const { data: patientPrescription } = await useContractRead(contract, "showSharedPrescription", [el]);
//             return patientPrescription;
//           } catch (error) {
//             console.warn(error);
//             return null;
//           }
//         })
//       );

//       setImageUrl(images);
//     };

//     if (medicalResearchData && medicalResearchData[7] && medicalResearchData[7].length > 0) {
//       fetchData();
//     }
//   }, [medicalResearchData]);

//   const displayImages = () => {
//     if (imageUrl.length > 0) {
//       const images = imageUrl.map((item, i) => {
//         const imgUrl = item;

//         return (
//           <TouchableOpacity key={i} onPress={() => Linking.openURL(imgUrl)}>
//             <Image source={{ uri: imgUrl }} style={{ width: 100, height: 100 }} resizeMode="contain" />
//           </TouchableOpacity>
//         );
//       });

//       setData(images);
//     } else {
//       alert("No file to display");
//     }
//   };

//   return (
//     <View>
//       <View>{data}</View>
//       <TouchableOpacity onPress={displayImages}>
//         <Text>Get data</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default PatientToMedicalResearchLabSharedData;

import {useContract, useContractRead} from '@thirdweb-dev/react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import {contractAddress} from '../../../../constant';
import DisplayFile from '../../File/DisplayFile';

const PatientToMedicalResearchLabSharedData = ({medicalLabData}) => {
  const {contract} = useContract(contractAddress);

  const patientAddress = medicalLabData[7];
  console.log(medicalLabData);
  const {data: patientData, isLoading} = useContractRead(
    contract,
    'getPatient',
    [patientAddress[0]],
  );
  return (
    <Animated.View>
      {isLoading ? (
        <ActivityIndicator />
      ) : patientData ? (
        <DisplayFile userData={patientData} />
      ) : null}
    </Animated.View>
  );
};

export default PatientToMedicalResearchLabSharedData;

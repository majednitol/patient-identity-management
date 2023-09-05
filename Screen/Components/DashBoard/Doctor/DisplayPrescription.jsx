// import React, { useEffect, useState } from 'react';
// import { useAddress, useContract } from '@thirdweb-dev/react-native';
// import { Text, TouchableOpacity, View, Image, Linking } from 'react-native';
// import { contractAddress } from './../../../../constant';
// import { Button } from 'react-native-paper';

// const DisplayPrescription = () => {
//   const user = useAddress();
//   const { contract } = useContract(contractAddress);

//   const [doctorData, setDoctorData] = useState(null);
//   const [imageUrl, setImageUrl] = useState([]);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchDoctorData = async () => {
//       try {
//         const result = await contract.getDoctor(user);
//         setDoctorData(result);
//       } catch (error) {
//         console.warn('Error fetching doctor data:', error);
//       }
//     };

//     fetchDoctorData();
//   }, [user, contract]);

//   const fetchData = async () => {
//     if (doctorData && doctorData[7] && doctorData[7].length > 0) {
//       const patientAllAddress = doctorData[7];

//       const images = await Promise.all(
//         patientAllAddress.map(async el => {
//           try {
//             const result = await contract.showSharedPrescription(el);
//             return result;
//           } catch (error) {
//             console.warn('Error fetching prescription:', error);
//             return null;
//           }
//         }),
//       );

//       setImageUrl(images);
//     }
//   };

//   const displayImages = () => {
//     if (imageUrl.length > 0) {
//       const images = imageUrl.map((item, i) => {
//         const imgUrl = item;
//         return (
//           <TouchableOpacity key={i} onPress={() => Linking.openURL(imgUrl)}>
//             <Image
//               source={{ uri: imgUrl }}
//               style={{ width: 100, height: 100 }}
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         );
//       });

//       setData(images);
//     } else {
//       alert('No file to display');
//     }
//   };

//   return (
//     <View>
//       <Button
//         onPress={() => {
//           fetchData();
//           displayImages();
//         }}
//         mode="contained"
//         textColor="white"
//         style={{ marginTop: 60, marginHorizontal: 30 }}>
//         Get Data
//       </Button>
//       <View>{data}</View>
//     </View>
//   );
// };

// export default DisplayPrescription;

import {
  useAddress,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react-native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { contractAddress } from '../../../../constant';
import DisplayFile from '../../File/DisplayFile';

const { width, height } = Dimensions.get('window');

const DisplayPrescription = ({ doctorData }) => {
  const [images, setImages] = useState([]);
  const [dataArray, setDataArray] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const user = useAddress();
  const { contract } = useContract(contractAddress);
  // const { data: doctorDat } = useContractRead(
  //   contract,
  //   'getDoctor',
  //   [user],
  // );
  const patientAddress = doctorData[7];
  const { data: patientData,isLoading } = useContractRead(contract, 'getPatient', [
    patientAddress,
  ]);
return (
    <Animated.View >
      {isLoading ? <Text>hhh</Text>: patientData ? <DisplayFile userData={patientData}/>:null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 2,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  fullscreenImage: {
    width,
    height,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,

    paddingTop: 30,
  },
});

export default DisplayPrescription;

import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useContract, useContractWrite } from '@thirdweb-dev/react-native';
import axios from 'axios';
import { contractAddress } from '../../../constant';
import { Button, Text } from 'react-native-paper';
const mime = require('mime');

const FileUpload = ({ userAddress }) => {
  const [file, setFile] = useState(null);

  const { contract } = useContract(contractAddress);
  const { mutateAsync: addPrescription } = useContractWrite(
    contract,
    'addPrescription',
  );

  const handleSubmit = async () => {
    if (file) {
      try {
        Alert.alert('Wait a moment for wallet confirmation maximum 1 min');
        const formData = new FormData();
        formData.append('file', {
          uri: file.uri,
          name: file.name,
          type: mime.getType(file.name),
        });

        const resFile = await axios.post(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          formData,
          {
            headers: {
              pinata_api_key: '752553477556da356e27',
              pinata_secret_api_key:
                '4c58ebd75a2eb12433ed51d396bd349ee0e7d21d0942596e52b2bda6405c9987',
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        const imgHash = `ipfs://${resFile.data.IpfsHash}`;
        await addPrescription({ args: [userAddress, imgHash] });
        Alert.alert('Successfully Image Uploaded');

        setFile(null);
      } catch (error) {
        // console.error('Error uploading image :', error);
        Alert.alert('Unable to upload file');
      }
    } else {
      Alert.alert('Error', 'Please  pick file for upload');
    }
  };

  const handleFilePick = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
      });
      setFile(document.assets[0]);
    } catch (error) {
      Alert.alert('Error', 'Unable to pick file');
      console.warn(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {file ? (
          <Image source={{ uri: file.uri }} style={{ width: 200, height: 200 }} />
        ) : (
          <TouchableOpacity onPress={handleFilePick} style={{}}>
            <Image
              source={require('../../../assets/prescription.png')}
              style={{ width: 200, height: 200 }}
            />
          </TouchableOpacity>
        )}
      </View>

      <Button
        onPress={handleSubmit}
        mode="contained"
        textColor="white"
        style={{ paddingHorizontal: 100, marginTop: 60 }}>
        upload file
      </Button>
    </View>
  );
};

export default FileUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


// import React, { useState } from 'react';
// import { View, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
// import * as DocumentPicker from 'expo-document-picker';
// import { useContract, useContractWrite, useStorageUpload } from '@thirdweb-dev/react-native';

// import { contractAddress } from '../../../constant';
// import { ActivityIndicator, Button, Text } from 'react-native-paper';
// import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';


// const FileUpload = ({ userAddress }) => {

//   const [file, setFile] = useState(null);
//   const [loader, setLoader] = useState(false);
//   const { contract } = useContract(contractAddress);
//   const { mutateAsync: addPrescription } = useContractWrite(
//     contract,
//     'addPrescription',
//   );
//   const { mutateAsync: upload } = useStorageUpload();


//   const handleFilePick = async () => {
//     try {
//       const document = await DocumentPicker.getDocumentAsync({
//         type: 'image/*',
//       });
//       setFile(document.assets[0]);
//     } catch (error) {
//       Alert.alert('Error', 'Unable to pick file');
//       console.warn(error);
//     }
//   };
//   const uploadToIpfs = async () => {
//     if (file) {
//      try {
//       setLoader(true);
//       const uploadUrl = await upload({
//         data: [file],
//         options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
//       });
//       const response = await fetch(uploadUrl);
//       const data1 = await response.json();
//       // setIPFSFile(data1.uri);
//       console.log('uploadUrl', data1.uri);
//       console.log('uploadUrl', uploadUrl);
//        await addPrescription({ args: [userAddress, data1.uri] });
//        Alert.alert('File successfully uploaded');
//       setFile(null);
//       setLoader(false);
//      } catch (error) {
//      Alert.alert('File successfully uploaded');
//       setFile(null);
//       setLoader(false);
//      }

//     }
//     else {
//       Alert.alert('Please choose a file to upload');
//     }
//   };



//   return (
//     <Animated.View style={styles.container} entering={FadeInDown.duration(800)}
//       exiting={FadeInUp.springify()}>
//       <View>
//         {file ? (
//           <Image source={{ uri: file.uri }} style={{ width: 200, height: 200 }} />
//         ) : (
//           <TouchableOpacity onPress={handleFilePick} style={{}}>
//             <Image
//               source={require('../../../assets/prescription.png')}
//               style={{ width: 200, height: 200 }}
//             />
//           </TouchableOpacity>
//         )}
//       </View>

//       <Button
//         onPress={uploadToIpfs}
//         mode="contained"
//         textColor="white"
//         style={{ paddingHorizontal: 100, marginTop: 60 }}>
//         {loader === false ? <Text>upload file</Text> : null}

//       </Button>
//       {loader === true ? <ActivityIndicator color="white" style={{ position: 'relative', top: -32 }} /> : null}


//     </Animated.View>
//   );
// };

// export default FileUpload;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

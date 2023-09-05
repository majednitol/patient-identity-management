import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  useStorageUpload,
  useContract,
  useContractWrite,
} from '@thirdweb-dev/react-native';
import axios from 'axios';
import { contractAddress } from '../../../constant';
import { Button, Text, ActivityIndicator } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
const mime = require('mime');
const { width, height } = Dimensions.get('window');

const ProfilePicture = ({  userData }) => {
    const profilePic = userData
    console.log('profilePic',profilePic)
  const [file, setFile] = useState(null);
  const { contract } = useContract(contractAddress);
  const { mutateAsync: addProfilePic } = useContractWrite(
    contract,
    'addProfilePic',
  );
  const { mutateAsync: upload } = useStorageUpload();

  const handleFilePick = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
      });
      setFile(document.assets[0]);
      uploadImage(document.assets[0]);
    } catch (error) {
      Alert.alert('Error', 'Unable to pick file');
      console.warn(error);
    }
  };

  const uploadImage = async image => {
    if (image) {
      try {
        Alert.alert('Wait a moment for wallet confirmation maximum 1 min');
        const formData = new FormData();
        formData.append('file', {
          uri: image.uri,
          name: image.name,
          type: mime.getType(image.name),
        });

        const resFile = await axios.post(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          formData,
          {
            headers: {
              pinata_api_key: `752553477556da356e27`,
              pinata_secret_api_key: `4c58ebd75a2eb12433ed51d396bd349ee0e7d21d0942596e52b2bda6405c9987`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        const imgHash = `ipfs://${resFile.data.IpfsHash}`;
        await addProfilePic({ args: [ imgHash] });
        Alert.alert('Successfully Image Uploaded');

        setFile(null);
      } catch (error) {
        console.error('Error uploading image to Pinata:', error);
        Alert.alert('Unable to upload file');
      }
    } else {
      Alert.alert('Error', 'Please pick a file for upload');
    }
  };

  return (
    <View>
      <View>
        {file ? (
          <Image
            source={{ uri: file.uri }} 
            style={{ height: 130, width: 130, borderRadius: 65 }}
          />
        ) : (
          <TouchableOpacity onPress={handleFilePick}>
          {profilePic=='' ? <Image
            source={require('../../../assets/icon.png')}
            style={{ height: 130, width: 130, borderRadius: 65 }}
          />:<Image
            source={{
              uri: `https://lavender-civil-tick-210.mypinata.cloud/ipfs${profilePic?.substring(
                6,
              )}`,
            }}
            style={{height: 130, width: 130, borderRadius: 65}}
            resizeMode="contain"
          />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ProfilePicture;

import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import {
  useContract,
  useContractWrite,
} from '@thirdweb-dev/react-native';
import axios from 'axios';
import {contractAddress} from '../../../constant';
import * as DocumentPicker from 'expo-document-picker';
const mime = require('mime');
const {width, height} = Dimensions.get('window');

const ProfilePicture = ({userData}) => {
  const profilePic = userData;
  console.log('profilePic', profilePic);
  const [file, setFile] = useState(null);
  const {contract} = useContract(contractAddress);
  const {mutateAsync: addProfilePic} = useContractWrite(
    contract,
    'addProfilePic',
  );

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
        Alert.alert('Wait a moment for wallet confirmation');
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
              pinata_api_key: '752553477556da356e27',
              pinata_secret_api_key:
                '4c58ebd75a2eb12433ed51d396bd349ee0e7d21d0942596e52b2bda6405c9987',
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        const imgHash = `ipfs://${resFile.data.IpfsHash}`;
        await addProfilePic({args: [imgHash]});
        Alert.alert('Successfully set profile pic');

        setFile(null);
      } catch (error) {
        console.error('Error uploading image to Pinata:', error);
        Alert.alert('Unable to set profile pic');
      }
    } else {
      Alert.alert('Error', 'Please pick a file for profile pic');
    }
  };

  return (
    <View>
      <View>
        <TouchableOpacity onPress={handleFilePick}>
          {file ? (
            <Image
              source={{uri: file.uri}}
              style={{height: 130, width: 130, borderRadius: 65}}
            />
          ) : profilePic == '' ? (
            <Image
              source={require('../../../assets/icon.png')}
              style={{height: 130, width: 130, borderRadius: 65}}
            />
          ) : (
            <Image
              source={{
                uri: `https://lavender-civil-tick-210.mypinata.cloud/ipfs${profilePic?.substring(
                  6,
                )}`,
              }}
              style={{height: 130, width: 130, borderRadius: 65}}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfilePicture;

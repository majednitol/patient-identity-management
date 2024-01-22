import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import { useContract, useContractWrite, useStorageUpload } from '@thirdweb-dev/react-native';
import { contractAddress } from '../../../constant';
import * as DocumentPicker from 'expo-document-picker';
import { DataContext } from '../../../context/AllUserData';


const ProfilePicture = ({ userData }) => {
  const { mutateAsync: upload } = useStorageUpload();
  const { setPloader } = useContext(DataContext);
  const [ipfsFile, setIPFSFile] = useState('');
  const profilePic = userData;
  console.log('profilePic3', profilePic);
  const [file, setFile] = useState(null);
  const { contract } = useContract(contractAddress);
  const { mutateAsync: addProfilePic } = useContractWrite(
    contract,
    'addProfilePic',
  );
  const showProfile = async () => {

    // const response = await fetch(profilePic);
    // const data1 = await response.json();
    setIPFSFile(profilePic);
  };
  useEffect(() => {
    if (profilePic !== null) {
      showProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePic]);

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
        setPloader(true);

        const uploadUrl = await upload({
          data: [file],
          options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
        });
        const response = await fetch(uploadUrl);
        const data1 = await response.json();
        // setIPFSFile(data1.uri);
        //console.log('uploadUrl', data1.uri);
        // const imgHash = `ipfs://${resFile.data.IpfsHash}`;
        await addProfilePic({ args: [data1.uri] });
        setPloader(false);
        Alert.alert('Successfully set profile pic');

        setFile(null);
      } catch (error) {

        console.error('Error uploading image to Pinata:', error);
        setPloader(false);
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
              source={{ uri: file.uri }}
              style={{ height: 130, width: 130, borderRadius: 65 }}
            />
          ) : profilePic == '' ? (
            <Image
              source={require('../../../assets/icon.png')}
              style={{ height: 130, width: 130, borderRadius: 65 }}
            />
          ) : (
            ipfsFile === null ? setPloader(true) : <Image
              source={{
                uri: 'https://lavender-civil-tick-210.mypinata.cloud/ipfs/QmVrJb1wihBogaJVrQFcwSg5hBvnWdmBTT8ADusdgovcgz?_gl=1*1uxqawh*_ga*MTEyNTIxOTQ1Ny4xNjkzNjM3ODM5*_ga_5RMPXG14TE*MTcwMDQwMzUyNC41LjEuMTcwMDQwMzY4MS42MC4wLjA.',
              }}
              style={{ height: 130, width: 130, borderRadius: 65 }}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>

        {console.log('ipfs', ipfsFile)}
      </View>
    </View>
  );
};

export default ProfilePicture;

import React, {useEffect, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';

import {ActivityIndicator, Button, Text} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import {downloadFile} from './Download';
import RNFetchBlob from 'rn-fetch-blob';

const {width, height} = Dimensions.get('window');

const DisplayFile = ({userData}) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

  const getData = async () => {
    try {
      const dataArray = await userData[8];

      const imageComponents = dataArray.map((item, i) => (
        <TouchableOpacity key={i} onPress={() => openFullscreen(item)}>
          <Image
            source={{
              uri: `https://lavender-civil-tick-210.mypinata.cloud/ipfs${item.substring(
                6,
              )}`,
            }}
            style={{
              width: 120,
              height: 150,
              marginBottom: 10,
            }}
          />
          <Button onPress={() => {

if (Platform.OS === 'android') {
  downloadFile(`https://lavender-civil-tick-210.mypinata.cloud/ipfs${item.substring(
                6,
              )}`);
} else {
  downloadFile(`https://lavender-civil-tick-210.mypinata.cloud/ipfs${item.substring(
                6,
              )}`).then(res => {
      RNFetchBlob.ios.previewDocument(res.path());
  });
}
}} mode="contained" textColor="white" style={{marginBottom: 10}}>
            Download
          </Button>
        </TouchableOpacity>
      ));

      setImages(imageComponents);
    } catch (error) {
      Alert.alert(error);
    }
  };

  useEffect(() => {
    if (userData) {
      getData();
    }
  }, [userData]);

  const openFullscreen = item => {
    setSelectedImage(item);
    setFullscreen(true);
  };

  const closeFullscreen = () => {
    setSelectedImage(null);
    setFullscreen(false);
  };

  return (
    <Animated.View>
      <Animated.View style={styles.imageContainer}>
        {images.length > 0 ? (
          images
        ) : images.length === 0 ? (
          <Text>No Prescription to display</Text>
        ) : (
          <ActivityIndicator
            size={45}
            animating={true}
            color="rgb(108, 99, 255)"
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        )}
      </Animated.View>

      <Modal visible={fullscreen} transparent={true}>
        <Animated.View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeFullscreen}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Image
            source={{
              uri: `https://lavender-civil-tick-210.mypinata.cloud/ipfs${selectedImage?.substring(
                6,
              )}`,
            }}
            style={styles.fullscreenImage}
            resizeMode="contain"
          />
        </Animated.View>
      </Modal>
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

    paddingTop: 10,
  },
});

export default DisplayFile;



// import React, { useEffect, useState } from 'react';
// import {
//   Image,
//   TouchableOpacity,
//   Modal,
//   StyleSheet,
//   Dimensions,
//   Alert,
//   Platform,
//   ScrollView,
// } from 'react-native';

// import { ActivityIndicator, Button, Text } from 'react-native-paper';
// import Animated, { FadeInLeft, FadeInUp } from 'react-native-reanimated';
// import { downloadFile } from './Download';
// import RNFetchBlob from 'rn-fetch-blob';

// const { width, height } = Dimensions.get('window');

// const DisplayFile = ({ userData }) => {
//   const [images, setImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [fullscreen, setFullscreen] = useState(false);
//   const [ipfsFile, setIPFSFile] = useState('');
//   const getData = async () => {
//     try {

//       const dataArray = await userData[8];
//       // const datab = 'https://9232fd6649c1ec511405a4a42cef4655.ipfscdn.io/ipfs/bafkreih5dxvkgtw5hq3647mkovrfyopdyvh62he7c3gacwakxr2kgr4vbu/';
//       // const response = await fetch(datab);
//       // const data1 = await response.json();
//       // setIPFSFile(data1.uri);
//       // Alert.alert(JSON.stringify(data1.uri));  // Use Alert.alert and stringify the JSON data
//       const imageComponents = dataArray.map((item, i) => (
//         <ScrollView>
//           <TouchableOpacity key={i} onPress={() => openFullscreen(item)}>
//             <Image
//               source={{
//                 uri: item,
//               }}
//               style={{
//                 width: 120,
//                 height: 150,
//                 marginBottom: 10,
//                 borderRadius: 5,
//               }}
//             />
//             <Button
//               onPress={() => {
//                 if (Platform.OS === 'android') {
//                   downloadFile(
//                     item,
//                   );
//                 } else {
//                   downloadFile(
//                     item,
//                   ).then(res => {
//                     RNFetchBlob.ios.previewDocument(res.path());
//                   });
//                 }
//               }}
//               mode="contained"
//               textColor="white"
//               style={{ marginBottom: 15, width: 120 }}>
//               Download
//             </Button>
//           </TouchableOpacity>
//         </ScrollView>
//       ));

//       setImages(imageComponents);
//     } catch (error) {
//       Alert.alert(error);
//     }
//   };

//   useEffect(() => {
//     if (userData) {
//       getData();
//     }
//   }, [userData]);

//   const openFullscreen = item => {
//     setSelectedImage(item);
//     setFullscreen(true);
//   };

//   const closeFullscreen = () => {
//     setSelectedImage(null);
//     setFullscreen(false);
//   };

//   return (
//     <ScrollView>
//       <Animated.View
//         style={styles.imageContainer}
//         entering={FadeInLeft.duration(800)}
//         exiting={FadeInUp.springify()}>
//         {images.length > 0 ? (
//           images
//         ) : images.length === 0 ? (
//           <Text>No Prescription to display</Text>
//         ) : (
//           <ActivityIndicator
//             size={45}
//             animating={true}
//             color="rgb(108, 99, 255)"
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//           />
//         )}
//       </Animated.View>

//       <Modal visible={fullscreen} transparent={true}>
//         <Animated.View style={styles.modalContainer}>
//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={closeFullscreen}>
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//           <Image
//             source={{
//               uri: `https://lavender-civil-tick-210.mypinata.cloud/ipfs${selectedImage?.substring(
//                 6,
//               )}`,
//             }}
//             style={styles.fullscreenImage}
//             resizeMode="contain"
//           />
//         </Animated.View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//     zIndex: 2,
//     padding: 10,
//   },
//   closeButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   fullscreenImage: {
//     width,
//     height,
//   },
//   imageContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-evenly',
//     paddingHorizontal: 10,

//     paddingTop: 10,
//   },
// });

// export default DisplayFile;























// // import React, { useEffect, useState } from 'react';
// // import {
// //   Image,
// //   TouchableOpacity,
// //   Modal,
// //   StyleSheet,
// //   Dimensions,
// //   Alert,
// //   Platform,
// //   ScrollView,
// // } from 'react-native';

// // import { ActivityIndicator, Button, Text } from 'react-native-paper';
// // import Animated, { FadeInLeft, FadeInUp } from 'react-native-reanimated';
// // import { downloadFile } from './Download';
// // import RNFetchBlob from 'rn-fetch-blob';

// // const { width, height } = Dimensions.get('window');

// // const DisplayFile = ({ userData }) => {

// //   const [images, setImages] = useState([]);
// //   const [selectedImage, setSelectedImage] = useState(null);
// //   const [fullscreen, setFullscreen] = useState(false);

// //   const getData = async () => {
// //     try {
// //       const dataArray = await userData[8];



// //         const response = await fetch('https://9232fd6649c1ec511405a4a42cef4655.ipfscdn.io/ipfs/bafkreih5dxvkgtw5hq3647mkovrfyopdyvh62he7c3gacwakxr2kgr4vbu/');
// //         const data1 = await response.json();
// //         Alert.alert(JSON.stringify(data1.uri));  // Use Alert.alert and stringify the JSON data
// //         console.log('hhhhhh');



// //       const imageComponents = dataArray.map((item, i) => (
// //         <ScrollView>
// //           <TouchableOpacity key={i} onPress={() => openFullscreen(item)}>
// //             <Image
// //               source={{
// //                 uri: data1.uri,
// //               }}
// //               style={{
// //                 width: 120,
// //                 height: 150,
// //                 marginBottom: 10,
// //                 borderRadius: 5,
// //               }}
// //             />
// //             <Button
// //               onPress={() => {
// //                 if (Platform.OS === 'android') {
// //                   downloadFile(
// //                     `https://lavender-civil-tick-210.mypinata.cloud/ipfs${item.substring(
// //                       6,
// //                     )}`,
// //                   );
// //                 } else {
// //                   downloadFile(
// //                     `https://lavender-civil-tick-210.mypinata.cloud/ipfs${item.substring(
// //                       6,
// //                     )}`,
// //                   ).then(res => {
// //                     RNFetchBlob.ios.previewDocument(res.path());
// //                   });
// //                 }
// //               }}
// //               mode="contained"
// //               textColor="white"
// //               style={{ marginBottom: 15, width: 120 }}>
// //               Download
// //             </Button>
// //           </TouchableOpacity>
// //         </ScrollView>
// //       ));

// //       setImages(imageComponents);
// //     } catch (error) {
// //       Alert.alert(error);
// //     }
// //   };

// //   useEffect(() => {
// //     if (userData) {
// //       getData();
// //     }
// //   }, [userData]);

// //   const openFullscreen = item => {
// //     setSelectedImage(item);
// //     setFullscreen(true);
// //   };

// //   const closeFullscreen = () => {
// //     setSelectedImage(null);
// //     setFullscreen(false);
// //   };

// //   return (
// //     <ScrollView>
// //       <Animated.View
// //         style={styles.imageContainer}
// //         entering={FadeInLeft.duration(800)}
// //         exiting={FadeInUp.springify()}>
// //         {images.length > 0 ? (
// //           images
// //         ) : images.length === 0 ? (
// //           <Text>No Prescription to display</Text>
// //         ) : (
// //           <ActivityIndicator
// //             size={45}
// //             animating={true}
// //             color="rgb(108, 99, 255)"
// //             style={{
// //               flex: 1,
// //               justifyContent: 'center',
// //               alignItems: 'center',
// //             }}
// //           />
// //         )}
// //       </Animated.View>

// //       <Modal visible={fullscreen} transparent={true}>
// //         <Animated.View style={styles.modalContainer}>
// //           <TouchableOpacity
// //             style={styles.closeButton}
// //             onPress={closeFullscreen}>
// //             <Text style={styles.closeButtonText}>Close</Text>
// //           </TouchableOpacity>
// //           {/* <Image
// //             source={{
// //               uri: `https://lavender-civil-tick-210.mypinata.cloud/ipfs${selectedImage?.substring(
// //                 6,
// //               )}`,
// //             }}
// //             style={styles.fullscreenImage}
// //             resizeMode="contain"
// //           /> */}

// //         </Animated.View>
// //       </Modal>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   modalContainer: {
// //     flex: 1,
// //     backgroundColor: 'rgba(0, 0, 0, 0.8)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   closeButton: {
// //     position: 'absolute',
// //     top: 40,
// //     right: 20,
// //     zIndex: 2,
// //     padding: 10,
// //   },
// //   closeButtonText: {
// //     color: 'white',
// //     fontSize: 16,
// //   },
// //   fullscreenImage: {
// //     width,
// //     height,
// //   },
// //   imageContainer: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     justifyContent: 'space-evenly',
// //     paddingHorizontal: 10,

// //     paddingTop: 10,
// //   },
// // });

// // export default DisplayFile;

import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    //  delay for the splash screen
    const timer = setTimeout(() => {
      NetInfo.addEventListener(state => {
        if (state.isConnected === false) {
          navigation.replace('NotConnected');
        } else if (state.isConnected === true) {
          navigation.replace('HomeScreen');
        }
      });

      // Navigate to the main screen after the delay
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('../../assets/splash2.png')}
        style={{
          width: screenWidth,
          height: screenHeight,
          resizeMode: 'contain',
        }}
      />
      <ActivityIndicator
        size={40}
        animating={true}
        color="rgb(108, 99, 255)"
        style={{
          position: 'absolute',
          bottom: 100,
        }}
      />
    </View>
  );
};

export default SplashScreen;

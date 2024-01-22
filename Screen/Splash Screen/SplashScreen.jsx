import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import {Dimensions} from 'react-native';
import NotConnected from './../NotConnected';
import HomeScreen from './../HomeScreen';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      NetInfo.addEventListener(state => {
        if (state.isConnected === false) {
          navigation.replace('NotConnected');
          console.log('object not');
        } else if (state.isConnected === true) {
          navigation.replace('HomeScreen');
        }
      });
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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

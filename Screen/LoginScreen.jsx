import {View} from 'react-native';
import React from 'react';
import {ConnectWallet} from '@thirdweb-dev/react-native';

const LoginScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ConnectWallet />
    </View>
  );
};

export default LoginScreen;

import {View} from 'react-native';
import React from 'react';

import {
  useAddress,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react-native';

import {contractAddress} from '../constant';
import Dashboard from './Components/DashBoard/Dashboard';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import SignUpComponent from './signup/SignUpComponent';
import LoginScreen from './LoginScreen';

const HomeScreen = () => {
  const user = useAddress();
  const {contract, isLoading} = useContract(contractAddress);
  const {data: ConnectedAccountUser} = useContractRead(
    contract,
    'ConnectedAccountType',
    [user],
  );

  return (
    <View
      style={{
        flex: 1,
      }}>
      {isLoading ? (
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
      ) : user == null ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LoginScreen />
        </View>
      ) : String(ConnectedAccountUser) === '1' ||
        String(ConnectedAccountUser) === '2' ||
        String(ConnectedAccountUser) === '3' ||
        String(ConnectedAccountUser) === '4' ||
        String(ConnectedAccountUser) === '5' ? (
        <Dashboard ConnectedAccountUser={String(ConnectedAccountUser)} />
      ) : String(ConnectedAccountUser) === '0' ? (
        <SignUpComponent />
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
    </View>
  );
};

export default HomeScreen;

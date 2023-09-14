import {
  metamaskWallet,
  ThirdwebProvider,
  smartWallet,
} from '@thirdweb-dev/react-native';

import { Sepolia } from '@thirdweb-dev/chains';
import { useColorScheme } from 'react-native';
import { useTheme } from 'react-native-paper';

import React from 'react';

import HomeScreen from './Screen/HomeScreen';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Screen/Splash Screen/SplashScreen';

import NotConnected from './Screen/NotConnected';
import PrimaryScreen from './Screen/signup/PrimaryScreen';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ALLUserDataProvider from './context/AllUserData';
import { client_id } from './constant';


const Stack = createStackNavigator();

export default function App() {
  const scheme = useColorScheme();
  const theme = useTheme();

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ThirdwebProvider
        clientId={client_id}
        activeChain={Sepolia}
        supportedWallets={[
          smartWallet({
            factoryAddress: '0x2e03895E3114f40eD5c3d320A38a5c85072d745C',
            gasless: true,
            personalWallets:
              [
             metamaskWallet(),
           ],
          }),
        ]}>
        <ALLUserDataProvider>
          <NavigationContainer
            theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator initialRouteName="Splash">
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="NotConnected"
                component={NotConnected}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={PrimaryScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ALLUserDataProvider>
      </ThirdwebProvider>
    </GestureHandlerRootView>
  );
}



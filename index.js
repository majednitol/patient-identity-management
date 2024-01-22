/* eslint-disable react/react-in-jsx-scope */
/**
 * @format
 */
import {useColorScheme} from 'react-native';

import {MD3LightTheme, MD3DarkTheme, PaperProvider} from 'react-native-paper';

import 'react-native-gesture-handler';
import '@thirdweb-dev/react-native-compat';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

export default function Main() {
  const colorScheme = useColorScheme();

  const lightMode = {
    ...MD3DarkTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: 'rgb(108, 99, 255)',
      // Change text color
    },
  };
  const darkMode = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: 'rgb(108, 99, 255)',
    },
  };
  return (
    <PaperProvider theme={colorScheme === 'dark' ? darkMode : lightMode}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

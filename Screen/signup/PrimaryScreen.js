import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const PrimaryScreen = ({ navigation }) => {
  const goToScreen1 = () => {
    navigation.navigate('Patient SignUp Screen');
  };
  const goToScreen2 = () => {
    navigation.navigate('Doctor SignUp Screen');
  };
  const goToScreen3 = () => {
    navigation.navigate('Pathologist SignUp Screen');
  };
  const goToScreen4 = () => {
    navigation.navigate('Medical Research Lab SignUp Screen');
  };
  const goToScreen5 = () => {
    navigation.navigate('Pharmacy company SignUp Screen');
  };

  return (
    <View style={styles.container}>
      <CustomButton onPress={goToScreen1} title="Patient" />
      <CustomButton onPress={goToScreen2} title="Doctor" />
      <CustomButton onPress={goToScreen3} title="Pathologist" />
      <CustomButton onPress={goToScreen4} title="Medical Research Lab" />
      <CustomButton onPress={goToScreen5} title="Pharmacy company" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgb(108, 99, 255)',
    height: windowHeight * 0.16, // 20% of window height
    width: windowWidth * 0.8, // 80% of window width
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PrimaryScreen;

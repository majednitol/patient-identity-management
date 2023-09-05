import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import { useContract, useContractWrite } from "@thirdweb-dev/react-native";
import { Button, TextInput } from "react-native-paper";
import FileUpload from "../../File/FileUpload";
import { contractAddress } from "../../../../constant";

const SentPrescription = () => {
  const { contract } = useContract(contractAddress);
  const { mutateAsync: transferDataByPatient, isLoading } = useContractWrite(
    contract,
    "transferDataByPatient"
  );

  const [userAddress, setUserAddress] = useState("");
  const [errors, setErrors] = useState({ userAddress: false });



  const handleInputChange = (name, value) => {
    if (name === "userAddress") {
      setUserAddress(value);

      // Reset errors state when input changes
      setErrors({ userAddress: false });
    }
  };

  return (
    <ScrollView style={{flex:1, justifyContent: 'center',
    alignItems: 'center'}}>
      <View >
        

        <TextInput
          style={{ marginVertical: 0,width:360,position:"absolute",top:130,right:-25}}
          mode="outlined"
          keyboardType="default"
          value={userAddress}
          error={errors.userAddress}
          onChangeText={(value) => handleInputChange("userAddress", value)}
          label="Enter  userAddress"
        />
        {errors.userAddress && <Text style={{ color: "red" }}>Field required</Text>}

        <FileUpload userAddress={userAddress} />
      </View>
    </ScrollView>
  );
};

export default SentPrescription;


import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useContract, useContractWrite } from "@thirdweb-dev/react-native";
import { Button, TextInput } from "react-native-paper";
import FileUpload from "../../File/FileUpload";
import { contractAddress } from "../../../../constant";

const SentTestReportToDoctor = () => {


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
    <View>
      <View style={{ marginHorizontal: 16 }}>
        <Text>Share Data</Text>

        <TextInput
          style={{ marginVertical: 10 }}
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
    </View>
  );
};

export default SentTestReportToDoctor;

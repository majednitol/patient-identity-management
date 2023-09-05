import React from "react";
import FileUpload from "../../File/FileUpload";

import { useAddress } from "@thirdweb-dev/react-native";
import { View } from "react-native";

const AddResearchLabReport = () => {
  const account = useAddress()
  return (
    <View style={{ flex:1 }}>
      <FileUpload userAddress={account} />
    </View>
  );
};

export default AddResearchLabReport;

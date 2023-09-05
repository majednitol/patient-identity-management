import React, { useContext } from "react";

import DisplayFile from "../../File/DisplayFile";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react-native";
import { View, Text } from "react-native";
import { contractAddress } from "../../../../constant";

const SharedDataFromPathologist = () => {
  const user = useAddress();
  const { contract } = useContract(contractAddress);
  const { data: doctorData, isLoading } = useContractRead(contract, "getDoctor", [user]);

  return (
    <View>
      {isLoading ? <Text>loading</Text> : <DisplayFile userData={doctorData} />}
    </View>
  );
};

export default SharedDataFromPathologist;



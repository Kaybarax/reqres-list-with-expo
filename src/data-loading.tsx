import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
const DataLoading: React.FC = () => {
  return (
    <ScrollView
      style={{
        backgroundColor: "cyan",
      }}
    >
      <View
        style={{
          width: "100%",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text>Loading Data</Text>
        <ActivityIndicator size="large" color="red" />
      </View>
    </ScrollView>
  );
};

export default DataLoading;

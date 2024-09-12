import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  containerStyles,
  handlePress,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`bg-secondary-200 rounded-xl min-h-[60px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } `}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles} `}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
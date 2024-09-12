import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  title,
  placeholder,
  handleChangeText,
  otherStyles,
  value,
  initialQuery,
  ...props
}) => {
  const [query, setQuery] = useState(initialQuery || '');

  const pathName = usePathname();

  return (
    <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
      <TextInput
        className="flex-1 text-white font-psemibold"
        placeholder="Search for a video topic"
        value={query}
        placeholderTextColor="#7b7b8b"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) return Alert.alert("Missing Required Fields");
          if (pathName.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image className="h-6 w-6" resizeMode="contain" source={icons.search} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

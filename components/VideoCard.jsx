import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator,avatar
  },
}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-7 ">
      <View className="flex-row items-start gap-3">
        <View className="flex-row items-center justify-center flex-1 ">
          <View
            className="w-[46px] h-[46px] border
           border-secondary-200 rounded-lg justify-center items-center p-0.5"
          >
            <Image
              className="w-full h-full rounded-lg"
              source={{ uri: avatar }}
              resizeMode="cover"
            />
          </View>
          <View className="ml-3 flex-1 justify-center">
            <Text
              className="text-xl text-yellow-50 font-psemibold"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>
        <View>
          <Image className="w-5 h-5" resizeMode="contain" source={icons.menu} />
        </View>
      </View>

      {play ? (
        <Text className="text-white">loading</Text>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          className="h-60 w-full justify-center items-center"
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            resizeMode="contain"
            className="mt-2 w-full h-full rounded-md"
          />
          <Image
            source={icons.play}
            className="h-12 w-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

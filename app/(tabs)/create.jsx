import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { icons } from "../../constants";
import { ResizeMode, Video } from "expo-av";
import CustomButton from "../../components/CustomButton";

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });


  const submit=()=>{

  }

  const uploading =()=>{

  }

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView className="mt-12 px-6">
        <Text className="text-2xl text-white font-psemibold  ">
          Upload Video
        </Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Put your video"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-5">
          <Text className="text-white text-base font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-[70px]"
                useNativeControls
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="bg-black-100 h-[170px] mt-4 rounded-lg flex items-center justify-center">
                <View className=" h-14 w-14 items-center border border-dashed border-secondary-100 ">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="h-10"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-5">
          <Text className="text-white text-base font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity className="pt-2 pb-2">
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="bg-black-100 h-20 mt-4 rounded-lg flex items-center justify-center">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="h-10"
                />
                <Text className="text-sm text-gray-100">Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-10"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="w-full mt-7 mb-10"
          isLoading={uploading }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

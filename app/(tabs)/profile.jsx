import { FlatList, Image, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { getSearchedResults, getUserPosts, signOut } from "../lib/appwrite";
import useAppwrite from "../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  console.log(":++", user);

  const { data: postData, refetch } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async() => {
    await signOut();
    setUser(null)
    setIsLoggedIn(false)
    router.replace('/sign-in')
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={postData}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        // Rendered at the bottom of all the items.
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-2 w-full justify-center items-center">
            <TouchableOpacity
              onPress={logout}
              className="items-end w-full mt-3"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6 "
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                resizeMode="cover"
                className="w-[90%] h-[90%]"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyle="mt-5"
              textStyles="text-lg"
            />

            <View className="mt-5 flex-row ">
              <InfoBox
                title={postData.length || 0}
                subtitle="Posts"
                containerStyle="mr-10"
                textStyles="text-xl"
              />
              <InfoBox title="2M" subtitle="Followers" textStyles="text-xl" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;

import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts } from "../lib/appwrite";
import useAppwrite from "../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { data:postData , refetch } = useAppwrite(getAllPosts);
  const {data:latestPosts} = useAppwrite(getLatestPosts)

  const {user} = useGlobalContext()
 

  const onRefreshing = async () => {
    setRefreshing(true);
    //  add data here future
    await refetch()
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={postData}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}

        // Rendered at the bottom of all the items.
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-2">
            <View className="items-start justify-between flex-row mb-6">
              <View>
                <Text className="text-gray-100 text-sm font-pmedium">
                  Welcome Back
                </Text>
                <Text className="text-white text-2xl ">{user && user.username}</Text>
              </View>
              <View>
                <Image
                  className="w-[50px] h-[50px]"
                  source={images.logoSmall}
                />
              </View>
            </View>
            <SearchInput />

            <View>
              <Text className=" w-full text-gray-100 text-lg font-pmedium pt-8 pb-5 flex-1 ">
                Trending Videos
              </Text>
              <Trending
                posts={latestPosts?? []}
                // posts={[]}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload"
          />
        )}
        // Set this true while waiting for new data from a refresh.
        refreshing={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshing} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;

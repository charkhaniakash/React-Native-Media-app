import { FlatList, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { getSearchedResults } from "../lib/appwrite";
import useAppwrite from "../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();

  const { data: postData, refetch } = useAppwrite(() =>
    getSearchedResults(query)
  );

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={postData}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        // Rendered at the bottom of all the items.
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-2">
            <Text className="text-gray-100 text-sm font-pmedium">
              Search Results
            </Text>
            <Text className="text-white text-2xl ">{query}</Text>
            <View className="mt-8 mb-8">
              <SearchInput initialQuery={query} />
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

export default Search;

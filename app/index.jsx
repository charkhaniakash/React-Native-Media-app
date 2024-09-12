import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";
export default function App() {

  const {isLoggedIn,isLoading } = useGlobalContext()

  if(isLoggedIn && !isLoading) {
    return <Redirect href="/home" />
  }

  return (
    // SafeAreaView:- It will ensure that content will visible in all device
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}> 
        <View className="w-full justify-center items-center h-full px-4 ">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="mt-[50px]">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              className="w-[130px] h-[15px] absolute -bottom-2 -right-8"
              source={images.path}
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm text-gray-100 text-center mt-7 ">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <CustomButton title="Contine with Email" handlePress={()=>{router.push("/sign-in")}}
          containerStyles={"w-full mt-7 "}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import {
  Alert,
  Image,
  
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setUser , setIsLoggedIn} = useGlobalContext()



  const onSubmit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Please fill in all the fields");
    }
    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = getCurrentUser()
      setUser(result)
      setIsLoggedIn(true)
      Alert.alert("Success", "User signed in successfully");
      router.replace("/home")
    } catch (error) {
      Alert.alert("Error", error.message);
      console.log("error.message" , error.message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView>
        <View className="w-full justify-center px-4 my-6 h-full">
          <Image
            className="w-[115px] h-[50px]"
            resizeMode="contain"
            source={images.logo}
          />

          <Text className="text-white font-bold text-xl mt-6 ">Sign in</Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="Enter your Email Address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder="Enter your password"
          />

          <CustomButton
            title="Login In"
            containerStyles="mt-7"
            handlePress={onSubmit}
            isLoading={isSubmitting}
          />

          <View className="justify-center flex-row pt-5 ">
            <Text className="text-white">Don’t have an account? </Text>
            <Link
              href="/sign-up"
              className="text-secondary-200 text-lg font-psemibold"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});

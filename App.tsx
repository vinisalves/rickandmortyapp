import React from "react";
import "react-native-gesture-handler";
import Drawer from "./src/components/Drawer"
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { StatusBar } from "react-native";


export default function App() {
  let [fontsLoaded] = useFonts({
    "rick-and-morty-font": require("./assets/fonts/get_schwifty.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <NavigationContainer>
        <Drawer />
      </NavigationContainer>
    </>
  );
}

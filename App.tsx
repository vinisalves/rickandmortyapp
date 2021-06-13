import React from "react";
import "react-native-gesture-handler";
import HomeRoutes from "./src/routes/Routes";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { StatusBar } from "react-native";

import { CharacterProvider } from "./src/providers/character";
export default function App() {
  let [fontsLoaded] = useFonts({
    "rick-and-morty-font": require("./assets/fonts/get_schwifty.ttf"),
  });
  console.log(fontsLoaded);
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar hidden />
      <NavigationContainer>
        <CharacterProvider>
          <HomeRoutes />
        </CharacterProvider>
      </NavigationContainer>
    </>
  );
}

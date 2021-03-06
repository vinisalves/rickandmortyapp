import React from "react";

import { enableScreens } from "react-native-screens"


import Home from "../screens/Home";
import CharacterDetail from "../screens/CharacterDetail";
import Episode from "../screens/Episode";
import AllCharacters from "../screens/AllCharacters";
import AllEpisodes from "../screens/AllEpisodes";

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Easing } from "react-native-reanimated";

enableScreens();

const Stack = createSharedElementStackNavigator();

export default function Routes() {


  return (
    <Stack.Navigator initialRouteName="Home">

      <Stack.Screen
        name="Home"
        component={Home}
        options={() => ({
          headerShown: false,
          transitionSpec: {
            open: { animation: "timing", config: { duration: 300, } },
            close: { animation: "timing", config: { duration: 300 } },
          },
          gestureEnabled: false,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress
              }
            }
          }
        })
        }
      />
      <Stack.Screen
        name="Detail"
        component={CharacterDetail}

        options={() => ({
          headerShown: false,
          transitionSpec: {
            open: { animation: "timing", config: { duration: 300, easing: Easing.inOut(Easing.ease) } },
            close: { animation: "timing", config: { duration: 300, easing: Easing.inOut(Easing.ease) } },
          },
          gestureEnabled: false,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress
              }
            }
          }
        })
        }
      />

      <Stack.Screen
        name="Episode"
        component={Episode}
        options={() => ({
          headerShown: false,
          transitionSpec: {
            open: { animation: "timing", config: { duration: 300, easing: Easing.inOut(Easing.ease) } },
            close: { animation: "timing", config: { duration: 300, easing: Easing.inOut(Easing.ease) } },
          },
          gestureEnabled: false,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress
              }
            }
          }
        })
        }
      />

      <Stack.Screen
        name="AllCharacters"
        component={AllCharacters}
        options={() => ({
          headerShown: false,
          transitionSpec: {
            open: { animation: "timing", config: { duration: 300, easing: Easing.inOut(Easing.ease) } },
            close: { animation: "timing", config: { duration: 300, easing: Easing.inOut(Easing.ease) } },
          },
          gestureEnabled: false,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress
              }
            }
          }
        })
        }
      />
      <Stack.Screen
        name="AllEpisodes"
        component={AllEpisodes}
        options={() => ({
          mode: "card",
          headerShown: false,

        })}
      />
    </Stack.Navigator>
  );
}

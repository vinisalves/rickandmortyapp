import React from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import {enableScreens} from "react-native-screens"


import Home from "../screens/Home";
import CharacterDetail from "../screens/CharacterDetail";
import Preload from "../screens/Preload";

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Easing } from "react-native-reanimated";

enableScreens();

const Stack = createSharedElementStackNavigator();

export default function Routes() {


  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Preload"
        component={Preload}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Detail"
        component={CharacterDetail}
        options={()=>({
          transitionSpec:{
            open:{animation:"timing", config:{duration: 300, easing: Easing.inOut(Easing.ease)}},
            close:{animation:"timing", config:{duration: 300, easing: Easing.inOut(Easing.ease)}},
          },
          gestureEnabled: false,
          cardStyleInterpolator:({current: {progress}}) => {
            return {
              cardStyle: {
                    opacity: progress 
              }
            }
          }
        })        
      }

        

       
      />

    
    </Stack.Navigator>
  );
}

import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

import Routes from "../../routes/Routes";

import DrawerContent from "./DrawerContent";


const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,

      }}
      drawerContent={props => <DrawerContent {...props} />}
      drawerStyle={{ width: '80%' }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="DrawerHome" component={Routes} />

    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
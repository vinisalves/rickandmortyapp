import React from "react";
import {
    DrawerContentComponentProps, DrawerContentScrollView,
} from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { MainContainer, HeaderImage, MenuItem, MenuTitle } from "./styles";
import { StyleSheet } from "react-native";
import { View } from "react-native";

const DrawerContent = (
    props: DrawerContentComponentProps,
): React.ReactElement => {
    const menuItems = [
        {
            label: 'Home',
            route: 'Home',
            icon: "home",
        },
        {
            label: 'All Characters',
            route: 'AllCharacters',
            icon: 'format-list-bulleted',
        },
        {
            label: 'All Episodes',
            route: 'AllEpisodes',
            icon: 'movie',
        }
    ];

    return (
        <DrawerContentScrollView
            style={{ backgroundColor: 'white', flex: 1 }}
        >
            <LinearGradient
                style={
                    [StyleSheet.absoluteFill]

                }
                colors={['#25CCF7', 'transparent']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
            <HeaderImage source={require('../../../assets/logo1.png')} />
            {
                menuItems.map((menuItem, index) => {
                    return (
                        <MenuItem key={`item-${index}`} onPress={() => {
                            props.navigation.navigate(menuItem.route);
                        }}>
                            <MaterialIcons name={menuItem.icon} size={24} color="black" style={{ marginRight: 10 }} />
                            <MenuTitle

                            >
                                {menuItem.label}
                            </MenuTitle>
                        </MenuItem>


                    )
                })
            }

        </DrawerContentScrollView>
    )

}

export default DrawerContent;
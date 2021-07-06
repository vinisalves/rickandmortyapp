import React from "react";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { NavigationScreenProp } from 'react-navigation';



const ArrowBack = ({ navigation, color }: any) => {
    console.log(navigation);
    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ elevation: 20 }}
        >
            <AntDesign name="arrowleft" size={35} color={color} />
        </TouchableOpacity>
    )
}

export default ArrowBack;
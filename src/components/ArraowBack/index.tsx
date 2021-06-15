import React from "react";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
const ArrowBack = (props: any) => {

    return (
        <TouchableOpacity
            style={{ elevation: 20 }}
        >
            <AntDesign name="arrowleft" size={35} color="white" />
        </TouchableOpacity>
    )
}

export default ArrowBack;
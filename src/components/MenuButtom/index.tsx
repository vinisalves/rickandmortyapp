import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { MenuButton } from "./styles";

const MenuButtom = ({ navigation, color }: any) => {
    return (
        <MenuButton onPress={() => navigation.openDrawer()}>
            <MaterialIcons name="menu" size={35} color={color} />
        </MenuButton>
    )
}

export default MenuButtom;
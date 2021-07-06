import styled from "styled-components/native";

export const MainContainer = styled.View`
    flex:1;
    overflow: hidden;
`

export const MenuItem = styled.TouchableOpacity`
    flex-direction: row;
    flex:1;
    align-items: center;
    width: 200px;
    height: 50px;
    margin-left: 30px;
`

export const MenuTitle = styled.Text`
    font-size: 15px;
    font-weight: 700;
    color: black;
    
`
export const HeaderImage = styled.Image`
        max-width: 100%;
        height: 100px;
        margin-bottom: 20px;
`
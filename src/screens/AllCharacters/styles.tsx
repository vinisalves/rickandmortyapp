import { Dimensions } from "react-native";
import styled from "styled-components/native";

const width = Dimensions.get('screen').width;
export const MainContainer = styled.View`
    flex:1;
    align-items: center;
 
`

export const SearchContainer = styled.View`
    flex-direction:row;
    justify-content: flex-end;
    align-items: center;
    margin: 150px 10px 15px 10px; 
    overflow: hidden;
    position: absolute;
    elevation: 12;    
     
`

export const SearchIconContainer = styled.TouchableOpacity`
    z-index: 10;
    elevation:2;
    height:50px;
    width: 50px;
    background-color: white;
    opacity: 0.3;
    border-radius: 60px;
    justify-content: center;
    align-items: center;
    position: absolute;
    opacity:1;    
`;


export const SearchInput = styled.TextInput`
    flex:1;
    background-color: black;
    color: white;
    height:60px;
    border-radius:10px;
    padding-left: 30px;
    margin: 0 10px;
    z-index: 10;
    elevation:2;
    opacity: 0.6;
    
    color: #97ce4c;
    font-size: 25px;
`


export const CharacterAvatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 60px;
  margin-right: 20px;
`

export const ItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    height:105px;
    width: ${width - 25}px;
    align-items: center;    
    background-color: #f8f8f8;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    elevation: 5;
`

export const CharacterName = styled.Text`
    font-size: 18px;
    font-weight: 700;
`

export const SpecieText = styled.Text`
    font-size: 16px;
    color: rgba(0,0,0,0.6);
`

export const ItemSeparator = styled.View`
   background-color: black;
`
export const DescriptionContainer = styled.View`
    
`
export const MenuButtonContainer = styled.View`
   position: absolute;
   top: 50px;
   left: 20px;   
   border-radius: 50px;
   
    
`
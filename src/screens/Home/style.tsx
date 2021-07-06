import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

export const MainContainer = styled.View`
  flex: 1;
  background-color: black;
  elevation: 0;
  z-index: 0;
  
`;

export const Header = styled.View`
  height: 140px;
  background-color: #f8f8f8;
  border-bottom-left-radius: 50px;
  elevation: 23;
  z-index: 23;

  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 15px;
`;

export const InputContainer = styled.View`
  width: ${width - 100}px;
  flex-direction: row;
  height: 50px;
  background-color: rgba(0,0,0,.1);
  border-radius: 15px;
  justify-content: center;
  align-items: flex-end;
  padding: 10px;
  position: relative;
`;


export const InputSearchCharacter = styled.TextInput`
   flex: 1;
`
export const SearchContainer = styled.View`
  flex:1;
  position: absolute;
  top: 90px;
  left: 90px;
  margin-top: 10px;
  flex-direction: column;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 20px;
  overflow: hidden;
`
export const SearchItem = styled.TouchableOpacity`
  flex:1;
  flex-direction: row;
  align-items: center;
  height: 80px;
  width: ${width - 100}px;
  background-color: red;
  z-index: 24;  
`
export const SearchSeparator = styled.View`
  flex:1;
  height: 1px;
  background-color: rgba(0,0,0,.6);
`
export const CharacterAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 40px;
`

export const SearchCharacterName = styled.Text`
 color: black;
 font-size: 18px;
 margin-left: 10px;
`
export const ItemContainer = styled.View`
  flex: 1;
  width: ${width}px;
  height: ${height + 150}px;
  align-items: center;
  opacity:1;
`;

export const Button = styled.TouchableOpacity`
  height: 30px;
  width: 60px;
  position: absolute;
  bottom: -10px;
  border-radius: 8px;
  background-color: #f8f8f8;
  elevation: 10;
  z-index: 10;
  justify-content: center;
  align-items: center;
`

export const TextButton = styled.Text`
  opacity: .6;
`
export const CardContainer = styled.TouchableOpacity`
  background-color: transparent;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  width: ${width * 0.9}px;
  height: ${height * 0.45}px;
  margin-top: 20px;
  margin-bottom: 10px;
  elevation: 20;
  z-index : 20;
`;

export const CardImage = styled.Image`
  width: ${width * 0.75}px;
  height: ${height * 0.35}px;
  border-radius: 2px;
  
`;

export const TitleName = styled.Text`
  font-size: 32px;
  color: #97ce4c;
  font-family: "rick-and-morty-font";
  
`;


export const Footer = styled.View`
  
  bottom:0;
  width: ${width}px;
  height: 120px;
  border-top-right-radius: 50px;
  background-color: #f8f8f8;
  elevation:11;
  overflow: hidden;
`

export const InfoContainer = styled.View`
 
  width: ${width}px;
  height: 120px;
  padding: 10px 0 0 10px;
`

export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TitleTextItem = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  opacity: 0.7;
  width: 100px;
`;

export const DescTextItem = styled.Text`
  font-size: 16px;
  color: #000;
  opacity: 0.7;
  padding-right: 5px;
`;



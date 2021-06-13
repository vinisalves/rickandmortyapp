import styled from "styled-components/native";
import { Dimensions, PixelRatio } from "react-native";

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
  position: absolute;
  top: 30px;
  margin-top: 10px;
  z-index: 32;
  elevation: 32;
  flex-direction: column;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 20px;
  overflow: hidden;
  
`
export const SearchItem = styled.TouchableOpacity`
  flex:1;
  flex-direction: row;
  align-items: center;
  height: 100px;
  width: ${width - 100}px;
  background-color: #f8f8f8;
  padding: 10px;
  
`
export const SearchCharacterName = styled.Text`
 color: black;
 font-size: 20px;
 font-weight: 700;
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

type InfoContainerProps = {
  translateY: string,
}
export const InfoContainer = styled.View<InfoContainerProps>`
  width: ${width}px;
  padding-top: 50px;
  padding-left: 20px;
  position: absolute;
  bottom: -170px;
  transform: translateY(${props => props.translateY + "px"});  
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


export const Footer = styled.View`
  position: absolute;
  bottom:0;
  width: ${width}px;
  height: 120px;
  border-top-right-radius: 50px;
  background-color: #f8f8f8;
  elevation: 10;
  z-index: 10;
`
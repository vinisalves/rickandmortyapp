import styled from "styled-components/native";

export const MainContainer = styled.View`
    flex:1;
    padding: 20px;
    padding-top: 100px;
 
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
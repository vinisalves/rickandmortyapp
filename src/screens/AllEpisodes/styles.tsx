import styled from "styled-components/native";
import Constants from 'expo-constants';
import { Dimensions } from "react-native";

const width = Dimensions.get('screen').width;

export const MainContainer = styled.View`
    flex: 1;
    padding-top: ${Constants.statusBarHeight + 20}px
    align-items: center;
    
`
export const Title = styled.Text`
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
`

export const EpisoteItemContainer = styled.TouchableOpacity`
    background-color: white;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    elevation: 10;
    width: ${width * 0.92}px;
`

export const EpisodeItemName = styled.Text`
    font-size: 18px;
    font-weight: bold;
`
export const EpisodeItemText = styled.Text`
  font-size: 15px;
`


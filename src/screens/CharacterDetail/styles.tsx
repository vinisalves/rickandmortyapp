import styled from "styled-components/native";

export const MainContainer = styled.View`
    flex: 1;
`

export const ImageContainer = styled.View`
    height: 290px;
     resizeMode: contain;


`
export const CharacterImage = styled.Image `
    flex:1;
    resizeMode: stretch;
`
type DetailContainerProps = {
    translateX: number
}
export const DetailContainer = styled.View<DetailContainerProps>`
    flex:1;
    padding: 20px;
    transform: translateX(${props=> props.translateX + "px"});
`
export const RowText = styled.View`
    flex-direction: row;
    align-items: center;
`

export const TitleDesc = styled.Text`
    font-size: 20px;
    font-weight: 700;
    opacity: 0.7;
    width: 100px;

    

`

export const Description =  styled.Text`
    font-size: 18px;
    font-weight:300;
    margin-right: 10px;
    

`
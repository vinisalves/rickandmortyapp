import styled from "styled-components/native";


export const Container = styled.View`
    flex:1;
    background-color: #000;
    justify-content: center;
    align-items: center;
`
type LogoProps = {
    rotate: string;
}
export const Logo = styled.Image<LogoProps>`
    height: 300px;
    width: 300px;
    transform: rotate(${props => props.rotate });
    
`

export const LoadingText = styled.Text`
    font-size: 18px;
    color: #fff;
    margin-top: 30px;
`
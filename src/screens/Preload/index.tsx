import React, { useEffect, useRef } from "react";
import {Animated, View} from "react-native";
import { Easing } from "react-native-reanimated";
import {Container, Logo,LoadingText} from "./styles";
const Preload: React.FC = ()=> {
    const ALogo = Animated.createAnimatedComponent(Logo);
    const rotate = useRef(new Animated.Value(0)).current;

    Animated.loop(
        Animated.timing(rotate, {toValue: 1, duration: 3000, useNativeDriver: true, easing: Easing.linear})
      ).start();   

    const spin = rotate.interpolate({
        inputRange:[0,1],
        outputRange:['0deg', '360deg'],

    })
    return (
        <Container>
            
            <Animated.Image
             style={{transform:[
                { rotate: spin}
             ],
            width: 280,
            height: 280
            }}
             source={require('../../../assets/logo.png')}
            />
            
            <LoadingText>Loading...</LoadingText>
        </Container>
        
    )
}

export default Preload;
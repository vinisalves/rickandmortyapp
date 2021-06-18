import React, { useState, useEffect } from "react";
import { Animated, FlatList, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { LinearGradient } from 'expo-linear-gradient';

import { CharacterName, MainContainer, ItemContainer, CharacterAvatar, ItemSeparator, DescriptionContainer, SpecieText } from "./styles";
import { CharacterProps, getCharacterByPagination } from "../../services/Character";
import Status from "../../components/Status";
import { useRef } from "react";

type Props = StackScreenProps<RootStackParamList, "AllCharacters">;

const AllCharacters = ({ navigation }: Props) => {
    const [characters, setCharacters] = useState<CharacterProps[]>([]);
    const [nextUrl, setNextUrl] = useState("");

    const scrollY = useRef(new Animated.Value(0)).current;

    const fetchMore = () => {
        getCharacterByPagination(nextUrl).then(response => {
            const { info, results } = response;

            if (info.next) setNextUrl(info.next);

            if (results.length > 0) {
                setCharacters((characters) => [...characters, ...results]);
            }
        })
    }
    useEffect(() => {
        getCharacterByPagination().then(response => {
            const { info, results } = response;
            setCharacters(results);
            if (info.next) setNextUrl(info.next);

        })
    }, [])

    return (
        <MainContainer>

            <LinearGradient
                style={
                    [StyleSheet.absoluteFill]
                }
                colors={['#25CCF7', 'transparent']}
                start={{ x: 2, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
            <Animated.FlatList
                data={characters}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={ItemSeparator}
                showsVerticalScrollIndicator={false}
                onEndReached={fetchMore}
                decelerationRate={0.997}
                onEndReachedThreshold={0.9}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                renderItem={({ item, index }) => {

                    const inputRange = [(index) * 100, 115 * index, 115 * (index + 1)];


                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 0],
                        extrapolate: "clamp"
                    })
                    const opacity = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 0],
                        extrapolate: "clamp"
                    })

                    return (

                        <Animated.View
                        // style={
                        //     {
                        //         transform: [{
                        //             scale: scale,
                        //         }],
                        //         opacity: opacity
                        //     }
                        // }
                        >
                            <ItemContainer>
                                <CharacterAvatar source={{ uri: item.image }} />
                                <DescriptionContainer>
                                    <CharacterName>{item.name}</CharacterName>
                                    <SpecieText>{item.species}</SpecieText>
                                    <SpecieText>{item.origin.name}</SpecieText>
                                    <SpecieText>{item.status} <Status status={item.status} /> </SpecieText>

                                </DescriptionContainer>

                            </ItemContainer>
                        </Animated.View>
                    )
                }}
            />
        </MainContainer>
    )

}


export default AllCharacters;
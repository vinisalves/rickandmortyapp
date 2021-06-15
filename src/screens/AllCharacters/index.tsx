import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { CharacterName, MainContainer, Title, ItemContainer, CharacterAvatar, ItemSeparator } from "./styles";
import { CharacterProps, getCharacterByPagination } from "../../services/Character";


type Props = StackScreenProps<RootStackParamList, "AllCharacters">;

const AllCharacters = ({ navigation }: Props) => {
    const [characters, setCharacters] = useState<CharacterProps[]>([]);
    const [nextUrl, setUrl] = useState("");

    const fetchMore = () => {
        getCharacterByPagination(nextUrl).then(response => {
            const { info, results } = response;

            if (info.next) setUrl(info.next);

            if (results.length > 0) {
                setCharacters((characters) => [...characters, ...results]);
            }
        })
    }
    useEffect(() => {
        getCharacterByPagination().then(response => {
            const { info, results } = response;
            console.log(response.info);
            setCharacters(results);
            if (info.next) setUrl(info.next);

        })
    }, [])

    return (
        <MainContainer>
            <Title>All Characters</Title>

            <FlatList
                data={characters}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={ItemSeparator}
                onEndReached={fetchMore}
                onEndReachedThreshold={0.9}
                renderItem={({ item }) => {
                    return (
                        <ItemContainer>
                            <CharacterAvatar source={{ uri: item.image }} />
                            <CharacterName>{item.name}</CharacterName>
                        </ItemContainer>
                    )
                }}
            />
        </MainContainer>
    )

}


export default AllCharacters;
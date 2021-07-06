import React, { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { SharedElement } from "react-navigation-shared-element";

import { MainContainer, EpisodItem, EpisodeName, EpisodAirDate, CharacterTitle, CharacterContainer } from "./styles";
import CharacterAvatar from "../../components/CharacterAvatar";
import { EpisodeProps, getEpisodeById } from "../../services/Episodes";
import { CharacterProps, getCharactersByMultipleIds } from "../../services/Character";
import { FlatList, View } from "react-native";
import ArrowBack from "../../components/ArrowBack";
type Props = StackScreenProps<RootStackParamList, "Episode">;

const Episode = ({ route, navigation }: Props) => {
    const { episodeId, episodeName, episodeAidDate, characterId, characterImage } = route.params;
    const [episode, setEpisode] = useState<EpisodeProps>();
    const [characters, setCharacters] = useState<CharacterProps[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            await getEpisodeById(episodeId)
                .then(async (episode) => {
                    setEpisode(episode);

                    const charactersId = episode.characters.map((character) => {
                        return character.replace(/[^0-9]+/g, "");
                    });

                    if (characterId) {
                        const index = charactersId.findIndex(obj => obj == characterId.toString());
                        if (index !== -1) {
                            charactersId.splice(index, 1)
                        }
                    }

                    await getCharactersByMultipleIds(charactersId)
                        .then(response => {
                            setCharacters(response);
                        })
                })
        }

        if (!episode) fetchData();
    }, []);


    return (
        <MainContainer>
            <View style={{ position: 'absolute', left: 10, top: 60, flex: 1, width: 30, height: 30, borderRadius: 30, zIndex: 2, elevation: 20 }}>
                <ArrowBack navigation={navigation} color={'black'} />
            </View>
            <EpisodItem >
                <EpisodeName >{episodeName}</EpisodeName>
                <EpisodAirDate>{episodeAidDate}</EpisodAirDate>
            </EpisodItem>

            {
                characterId !== undefined && characterImage !== undefined ?
                    (
                        <CharacterContainer
                            onPress={() => navigation.navigate('Detail',
                                {
                                    characterId: characterId,
                                    imageUrl: characterImage
                                })}>
                            <SharedElement id={`image-${characterId}`}>
                                <CharacterAvatar source={{ uri: characterImage }} />
                            </SharedElement>

                        </CharacterContainer>

                    ) : null
            }
            <CharacterTitle> {characterId ? 'More' : 'All'} characters in this Episode</CharacterTitle>
            <View style={{ flex: 1 }}>

                {
                    characters.length > 0 ?
                        (
                            <FlatList
                                data={characters}
                                numColumns={3}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => {
                                    return (
                                        <CharacterContainer onPress={() => navigation.push('Detail',
                                            {
                                                characterId: item.id,
                                                imageUrl: item.image
                                            })}>


                                            <SharedElement id={`image-${item.id}`}>
                                                <CharacterAvatar source={{ uri: item.image }} />
                                            </SharedElement>

                                        </CharacterContainer>
                                    )
                                }}
                            >

                            </FlatList>
                        ) :
                        null
                }
            </View>
        </MainContainer>
    )
}

Episode.sharedElements = (navigation: any) => {
    const item = navigation.params.characterId;
    return [`image-${item}`];
};


export default Episode;
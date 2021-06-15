import React, { useEffect, useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import { Animated, FlatList, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import {
  MainContainer,
  ImageContainer,
  CharacterImage,
  DetailContainer,
  RowText,
  TitleDesc,
  Description,
  EpisodItem,
  EpisodeName,
  EpisodAirDate
} from "./styles";
import Status from "../../components/Status";
import { CharacterProps, getCharactersById } from "../../services/Character";
import { getEpisodesByMultipleId, EpisodeProps } from "../../services/Episodes";
import ArrowBack from "../../components/ArraowBack";
type Props = StackScreenProps<RootStackParamList, "Detail">;

const CharacterDetail = ({ route, navigation }: Props) => {
  const [character, setCharacter] = useState<CharacterProps>();
  const [episodes, setEpisodes] = useState<EpisodeProps[]>();

  const translateX = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    const fetchCharacter = async () =>
      getCharactersById(route.params.characterId).then((characterResponse) => {
        setCharacter(characterResponse);

        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          delay: 300,
          useNativeDriver: false,
        }).start();
        const episodesId = characterResponse.episode.map((episode) => {
          return episode.replace(/[^0-9]+/g, "");
        });
        getEpisodesByMultipleId(episodesId).then((episodesResponse) => {
          if (!Array.isArray(episodesResponse)) {
            episodesResponse = [episodesResponse]
          }
          setEpisodes(episodesResponse);
        });
      });

    console.log("dentro useEFFFEEEEC");

    fetchCharacter();

  }, []);

  const ADetailContainer = Animated.createAnimatedComponent(DetailContainer);

  return (
    <MainContainer>

      <ImageContainer>
        <View style={{ position: 'absolute', left: 10, top: 20, flex: 1, width: 30, height: 30, borderRadius: 30, zIndex: 2 }}>
          <ArrowBack />
        </View>
        <SharedElement
          style={[{ flex: 1 }]}
          id={`image-${route.params.characterId}`}
        >
          <CharacterImage source={{ uri: route.params.imageUrl }} />

        </SharedElement>
      </ImageContainer>

      {character !== undefined ? (
        <ADetailContainer translateX={translateX}>
          <RowText>
            <TitleDesc>Name:</TitleDesc>
            <Description>{character.name}</Description>
          </RowText>
          <RowText>
            <TitleDesc>Status:</TitleDesc>
            <Description>{character.status}</Description>
            <Status status={character.status} />
          </RowText>
          <RowText>
            <TitleDesc>Specie:</TitleDesc>
            <Description>{character.species}</Description>
          </RowText>
          <RowText>
            <TitleDesc>Gender:</TitleDesc>
            <Description>{character.gender}</Description>
            {character.gender === "Male" ? (
              <MaterialCommunityIcons
                name="gender-male"
                size={25}
                color="gray"
              />
            ) : (
              <MaterialCommunityIcons
                name="gender-female"
                size={25}
                color="gray"
              />
            )}
          </RowText>
          <RowText>
            <TitleDesc>Origin:</TitleDesc>
            <Description>{character.origin.name}</Description>
          </RowText>
          <RowText>
            <TitleDesc>Last Seen:</TitleDesc>
            <Description>{character.location.name}</Description>
          </RowText>
          <RowText style={{ justifyContent: 'center', marginTop: 10 }}>
            <TitleDesc>Episodes</TitleDesc>

          </RowText>

          <FlatList
            data={episodes}
            keyExtractor={(item) => item.id.toString()}

            renderItem={({ item }) => {
              return (
                //TODO: data destructure route params
                <EpisodItem onPress={() => {
                  navigation.push('Episode', {
                    episodeId: item.id,
                    episodeName: item.name,
                    episodeAidDate: item.air_date,
                    characterId: route.params.characterId,
                    characterImage: route.params.imageUrl
                  })
                }}>
                  <EpisodeName >{item.name}</EpisodeName>
                  <EpisodAirDate>{item.air_date}</EpisodAirDate>

                </EpisodItem>

              )
            }}
          />
        </ADetailContainer>
      ) : null}


    </MainContainer>
  );
};

CharacterDetail.sharedElements = (navigation: any) => {
  const item = navigation.params.characterId;
  console.log("Shared detail");
  console.log(item);


  return [`image-${item}`];
};

export default CharacterDetail;

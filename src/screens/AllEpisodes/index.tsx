import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { EpisodeProps, getEpisodesByPagination } from "../../services/Episodes";
import { EpisodeItemText, EpisodeItemName, EpisoteItemContainer, MainContainer, Title } from "./styles";
import MenuButtom from "../../components/MenuButtom";
import { View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

type Props = DrawerScreenProps<RootStackParamList, "AllEpisodes">;
const AllEpisodes = ({ navigation }: Props) => {
    const [episodes, setEpisodes] = useState<EpisodeProps[]>([]);
    const [nextUrl, setNextUrl] = useState<string | null>("");

    const fetchMore = () => {
        if (!nextUrl) return;
        getEpisodesByPagination(nextUrl).then(response => {
            const { info, results } = response;

            if (info.next) {
                setNextUrl(info.next)
            } else {
                setNextUrl(null);
            }

            if (results.length > 0) {
                setEpisodes((episodes) => [...episodes, ...results]);
            }
        })
    }

    useEffect(() => {
        getEpisodesByPagination().then(response => {
            const { info, results } = response;
            setEpisodes(results);
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

            <View style={{ position: 'absolute', left: 10, top: 40, flex: 1, width: 30, height: 30, borderRadius: 30, zIndex: 2, }}>
                <MenuButtom navigation={navigation} color={'black'} />
            </View>
            <Title>All Episodes</Title>

            <FlatList
                style={{ flex: 1 }}
                data={episodes}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                onEndReached={fetchMore}
                renderItem={({ item }) => {
                    return (
                        <EpisoteItemContainer key={item.name}
                            onPress={() => {
                                navigation.navigate('Episode', {
                                    episodeId: item.id,
                                    episodeName: item.name,
                                    episodeAidDate: item.air_date,
                                })
                            }}
                        >
                            <EpisodeItemName>
                                {item.name}

                            </EpisodeItemName>
                            <EpisodeItemText>
                                {item.episode.slice(0, 2)} {item.episode.slice(2, 4)}
                            </EpisodeItemText>
                            <EpisodeItemText>
                                {item.air_date}
                            </EpisodeItemText>
                            <EpisodeItemText>
                                Total Characters: {item.characters.length}
                            </EpisodeItemText>
                        </EpisoteItemContainer>
                    )
                }}

            />


        </MainContainer>
    )
}

export default AllEpisodes;
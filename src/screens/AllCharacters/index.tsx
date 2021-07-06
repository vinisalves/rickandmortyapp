import React, { useState, useEffect } from "react";
import { Animated, FlatList, StyleSheet, TextInputProps } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

import {
    CharacterName,
    MainContainer,
    SearchContainer,
    ItemContainer,
    CharacterAvatar,
    ItemSeparator,
    DescriptionContainer,
    SpecieText,
    SearchIconContainer,
    SearchInput,
    MenuButtonContainer
} from "./styles";
import { CharacterProps, getCharacterByPagination, searchCharactersByName } from "../../services/Character";
import Status from "../../components/Status";
import { useRef } from "react";
import { SharedElement } from "react-navigation-shared-element";
import MenuButtom from "../../components/MenuButtom";

type Props = DrawerScreenProps<RootStackParamList, "AllCharacters">;

const AllCharacters = ({ navigation }: Props) => {
    const [characters, setCharacters] = useState<CharacterProps[]>([]);
    const [nextUrl, setNextUrl] = useState("");
    const [serchInputOpened, setSerchInputOpened] = useState(false);
    const [searchText, setSearchText] = useState('');
    const searchInputRef = useRef<TextInputProps>(null);

    const getAllCharacters = () => {
        getCharacterByPagination().then(response => {
            const { info, results } = response;
            setCharacters(results);
            if (info.next) setNextUrl(info.next);

        })
    }

    const fetchMore = () => {
        if (searchText.trim().length !== 0) return;
        getCharacterByPagination(nextUrl).then(response => {
            const { info, results } = response;

            if (info.next) setNextUrl(info.next);

            if (results.length > 0) {
                setCharacters((characters) => [...characters, ...results]);
            }
        })
    }

    const searchByName = (name: string) => {
        setSearchText(name);
        if (name.length > 0) {
            searchCharactersByName(name).then(response => {
                setCharacters(response);
            })
        } else {
            getAllCharacters();
        }



    }
    useEffect(() => {
        getAllCharacters();
    }, [])


    const translateX = useRef(new Animated.Value(400)).current;

    const showSearchInput = () => {


        Animated.timing(translateX,
            {
                toValue: serchInputOpened ? 400 : 0,
                duration: 550,
                useNativeDriver: false,
            }).start();

        setSerchInputOpened(!serchInputOpened);


        if (searchInputRef && searchInputRef.current) {
            if (!serchInputOpened) {
                searchInputRef.current.focus();
            } else {
                if (characters.length === 0) {
                    getAllCharacters();
                }

                searchInputRef.current.blur();
            }

        }



    }

    const ASearchInput = Animated.createAnimatedComponent(SearchInput);

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

            <FlatList
                data={characters}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={ItemSeparator}
                showsVerticalScrollIndicator={false}
                onEndReached={fetchMore}
                style={{ paddingTop: 50 }}
                renderItem={({ item, index }) => {

                    return (

                        <Animated.View

                        >
                            <ItemContainer onPress={() => navigation.navigate('Detail', {
                                characterId: item.id,
                                imageUrl: item.image
                            })}>
                                <SharedElement id={`image-${item.id}`}
                                >
                                    <CharacterAvatar source={{ uri: item.image }} />
                                </SharedElement>
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
            <MenuButtonContainer>
                <MenuButtom navigation={navigation} color={'black'} />
            </MenuButtonContainer>
            <SearchContainer>


                <Animated.View
                    style={{
                        flex: 1,
                        transform: [{ translateX }]
                    }}
                >
                    <SearchInput placeholder="Search Characters"
                        onChangeText={(text: string) => searchByName(text)}
                        defaultValue={searchText}
                        label="Search Characters"
                        onSubmitEditing={() => showSearchInput()}
                        ref={searchInputRef}
                    />
                </Animated.View>
                <SearchIconContainer onPress={() => showSearchInput()}>
                    {
                        serchInputOpened ? <MaterialIcons name="close" size={40} color="black" />
                            : <MaterialIcons name="search" size={40} style={{ elevation: 10 }} color="black" />
                    }


                </SearchIconContainer>

            </SearchContainer>
        </MainContainer>
    )

}


export default AllCharacters;
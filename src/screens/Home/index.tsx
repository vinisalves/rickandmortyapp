import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { SharedElement } from "react-navigation-shared-element";
import { TouchableOpacity } from "react-native-gesture-handler";

import Status from "../../components/Status";
import {
  MainContainer,
  CardImage,
  CardContainer,
  TitleName,
  Header,
  ItemContainer,
  TitleTextItem,
  DescTextItem,
  RowContainer,
  Footer,
  InfoContainer,
} from "./style";
import { getCharacters, CharacterProps } from "../../services/Character";
import MenuButtom from "../../components/MenuButtom";

type Props = DrawerScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: Props) => {
  const [characters, setCharacters] = useState<CharacterProps[]>([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);
  const charactersFlatlistRef = useRef<FlatList<any>>(null);
  const { width } = Dimensions.get("screen");

  useEffect(() => {

    if (characters.length === 0) {
      fetchData();
      console.log(navigation)
    }
  }, []);

  const fetchData = async () => {
    const characters = await getCharacters();

    setCharacters(characters);
  };

  const refreshData = async () => {
    await fetchData();
    charactersFlatlistRef.current?.scrollToIndex({ animated: true, index: 0 });
  }

  if (characters.length === 0) {
    return (
      <View>
        <AppLoading />
      </View>
    );
  }

  const arrayBGs = [
    "#222f3e",
    "#ffdd59",
    "#a4b0be",
    "#ff4757",
    "#B53471",
    "#1289A7",
    "#5758BB",
    "#EA2027",
    "#006266",
    "#576574",
  ];

  const BackGround = ({ scrollX }: { scrollX: Animated.Value }) => {
    const background = scrollX.interpolate({
      inputRange: characters.map((_, index) => index * width + 1),
      outputRange: characters.map((_, index) => arrayBGs[Math.floor(Math.random() * 10)]),
    });

    return (
      <Animated.View
        style={[StyleSheet.absoluteFillObject, { backgroundColor: background }]}
      ></Animated.View>
    );
  };

  const Indicator = ({ scrollX }: { scrollX: Animated.Value }) => {

    return (
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 150,
          justifyContent: "center",
          alignItems: 'center',
          alignSelf: 'center'
        }}
      >
        {
          characters.map((_, i) => {
            const scale = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [0.8, 1.9, 0.8],
              extrapolate: "clamp",
            });

            const borderRadius = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [10, 4, 10],
              extrapolate: "clamp",
            });

            const widthAnim = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [10, 20, 10],
              extrapolate: "clamp",
            });

            const heightAnim = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [10, 3, 10],
              extrapolate: "clamp",
            });

            return <Animated.View
              key={`indicator-${i}`}
              style={{
                margin: 10,
                width: widthAnim,
                height: heightAnim,

                borderRadius,
                backgroundColor: "#fff",
                transform: [
                  {
                    scale,
                  },
                ],
              }}
            />
          })
        }
      </View>
    )
  }

  type RenderItemProps = {
    item: CharacterProps;
    index: number
  }
  const renderItem = ({ item, index }: RenderItemProps) => {

    return (
      <ItemContainer>
        <CardContainer onPress={() => navigation.navigate('Detail',
          {
            characterId: item.id,
            imageUrl: item.image
          })}>
          <SharedElement id={`image-${item.id}`}
            style={{
              flex: 1,
              alignSelf: "center",
              justifyContent: "center"
            }}>
            <CardImage
              source={{ uri: item.image }}
              key={item.id.toString() + ""}
            />
          </SharedElement>

        </CardContainer>
        <TitleName numberOfLines={1}>
          {item.name}
        </TitleName>

      </ItemContainer>
    );
  };

  const ContainerInfo = ({ scrollX }: { scrollX: Animated.Value }) => {
    const translateY = scrollX.interpolate({
      inputRange: characters.map((_, index) => index * width + 1),
      outputRange: characters.map((_, index) => index * -120),
    });

    return <Animated.View
      style={{
        transform: [
          {
            translateY
          },

        ]
      }}
    >
      {
        characters.map(character => {

          return (
            <InfoContainer key={character.id} >
              <RowContainer>
                <TitleTextItem>Status:</TitleTextItem>
                <DescTextItem>{character.status}</DescTextItem>
                <Status status={character.status} />
              </RowContainer>
              <RowContainer>
                <TitleTextItem>Specie:</TitleTextItem>
                <DescTextItem>{character.species}</DescTextItem>
              </RowContainer>
              <RowContainer>
                <TitleTextItem>Origin:</TitleTextItem>
                <DescTextItem>{character.origin.name}</DescTextItem>
              </RowContainer>
              <RowContainer>
                <TitleTextItem>Gender:</TitleTextItem>
                <DescTextItem>{character.gender}</DescTextItem>
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
              </RowContainer>
            </InfoContainer>
          )
        })
      }
    </Animated.View>
  }

  return (
    <MainContainer>
      <BackGround scrollX={scrollX} />
      <Header>
        <MenuButtom navigation={navigation} color={'black'} />


        <TitleName numberOfLines={1}>Rick and Morty App</TitleName>
        <TouchableOpacity
          onPress={() => navigation.navigate("AllCharacters")}
        >
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
      </Header>
      <Indicator scrollX={scrollX} />
      <Animated.FlatList
        ref={charactersFlatlistRef}
        data={characters}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => renderItem({ item, index })}
        style={{
          zIndex: 21,
          elevation: 21,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        refreshing={refreshing}
        onRefresh={refreshData}
      ></Animated.FlatList>

      <Footer>
        <ContainerInfo scrollX={scrollX} />
      </Footer>
    </MainContainer>
  );
}

export default Home;
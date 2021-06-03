import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  Animated,
  Image,
  Dimensions,
  View,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppLoading from "expo-app-loading";

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";

import {SharedElement} from "react-navigation-shared-element";

 import Status from "../../components/Status";
import {
  MainContainer,
  CardImage,
  CardContainer,
  TitleName,
  Header,
  ItemContainer,
  InputContainer,
  TitleTextItem,
  DescTextItem,
  RowContainer,
  Footer,
  InfoContainer,
} from "./style";
import { getCharacters, CharacterProps } from "../../services/Character";


type NavigationType = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
};


const Home = ({ navigation }: NavigationType) => {
  const [data, setData] = useState<CharacterProps[]>([]);
  const scrollX = useRef(new Animated.Value(0)).current;

  const { height, width } = Dimensions.get("screen");

  

  useEffect(() => {
    const fetchData = async () => {
      const characters = await getCharacters();

      setData(characters);
    };
    if (data.length === 0) {
      fetchData();
      
    }
  }, []);

  if (data.length === 0) {
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
      inputRange: data.map((_, index) => index * width + 1),
      outputRange: data.map((_, index) => arrayBGs[Math.floor(Math.random() * 10)]),
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
        flexDirection:'row',
        position: 'absolute',
        top: 150,
        justifyContent: "center",
        alignItems: 'center',
        alignSelf:'center'
      }}
      >

        {
          data.map((_, i)=>{
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
  const renderItem = ({
    item,
    index,
  }: {
    item: CharacterProps;
    index: number;
  }) => {
    const translateY = scrollX.interpolate({
      inputRange: [(index - 1) * width, index * width, (index + 1) * width],
      outputRange: [height + 150, 0, 0],
      extrapolate: "clamp",
    });

    const AInfoContainer = Animated.createAnimatedComponent(InfoContainer);
    return (
      <ItemContainer>
        <CardContainer onPress={()=> navigation.navigate('Detail',
        {
          characterId: item.id,
          imageUrl: item.image
        })}>
          <SharedElement id={`image-${item.id}`}
          style={{
            flex:1,
            alignSelf: "center",
            justifyContent: "center"
           
            
          }}>
          <CardImage
            source={{ uri: item.image }}
            key={item.id.toString() + ""}
          />
          </SharedElement>
         
          
        </CardContainer>
        <TitleName  numberOfLines={1}>
          {item.name}
        </TitleName>
        <Animated.View
          style={{
            alignSelf: "flex-start",
          }}
        >
          <AInfoContainer translateY={translateY}>
            <RowContainer>
              <TitleTextItem>Status:</TitleTextItem>
              <DescTextItem>{item.status}</DescTextItem>
              <Status status={item.status} />
            </RowContainer>
            <RowContainer>
              <TitleTextItem>Specie:</TitleTextItem>
              <DescTextItem>{item.species}</DescTextItem>
            </RowContainer>
            <RowContainer>
              <TitleTextItem>Origin:</TitleTextItem>
              <DescTextItem>{item.origin.name}</DescTextItem>
            </RowContainer>
            <RowContainer>
              <TitleTextItem>Gender:</TitleTextItem>
              <DescTextItem>{item.gender}</DescTextItem>
              {item.gender === "Male" ? (
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
          </AInfoContainer>
        </Animated.View>
      </ItemContainer>
    );
  };

  return (
    <MainContainer>
      <BackGround scrollX={scrollX} />
      <Header>
        <MaterialIcons name="menu" size={35} color="black" />
        <InputContainer>
          <FontAwesome name="search" size={24} color="black" />
        </InputContainer>
      </Header>
      <Animated.FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => renderItem({ item, index })}
        style={{
          zIndex: 11,
          elevation: 11,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      ></Animated.FlatList>
      <Indicator scrollX={scrollX} />
      <Footer />
    </MainContainer>
  );
}



export default Home;
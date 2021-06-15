type RootStackParamList = {
  Home: undefined;
  Preload: undefined;
  Detail: {
    characterId: number,
    imageUrl: string
  };
  Episode: {
    episodeId: number,
    episodeName: string,
    episodeAidDate: string,
    characterId?: number,
    characterImage?: string,
  };
  AllCharacters: undefined,
  AllEpisodes: undefined

};

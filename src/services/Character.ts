import API from "../plugins/axios";

export type CharacterProps = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

const tenRandomNumbers = (): Array<number> => {
  const numbers = [];
  for (let i = 0; i < 9; i++) {
    numbers.push(Math.floor(1 + Math.random() * 671));
  }
  return numbers;
};

export const getCharacters = async (): Promise<CharacterProps[]> => {
  return API.get(`character/${tenRandomNumbers()}`).then((response) => {
    return response.data;
  });
};

export const getCharactersById = async (
  id: number
): Promise<CharacterProps> => {
  return API.get(`character/${id}`).then((response) => {
    return response.data;
  });
};

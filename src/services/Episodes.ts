import API from "../plugins/axios";

export type EpisodeProps = {
    id: number;
    air_date: string;
    episode: string;
    characaters: string[];
    url: string;
    name: string;
    created: string;

}



export const getEpisodesByMultipleId = async (ids: string[]): Promise<EpisodeProps[]> => {
    console.log(ids);
   return API.get(`episode/${ids}`)
    .then(response => {
        console.log(response.data)
        return response.data;

    })

}
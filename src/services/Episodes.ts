import API from "../plugins/axios";

export type CharacterServiceProps = {
    info: {
        count: number,
        pages: number,
        next: string | null,
        prev: string | null
    },
    results: EpisodeProps[]
}


export type EpisodeProps = {
    id: number;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    name: string;
    created: string;

}

export const getEpisodesByMultipleId = async (ids: string[]): Promise<EpisodeProps[]> => {

    return API.get(`episode/${ids}`)
        .then(response => {
            return response.data;

        })
}

export const getEpisodeById = async (id: number): Promise<EpisodeProps> => {
    return API.get(`episode/${id}`)
        .then(response => {
            return response.data;
        })
}


export const getEpisodesByPagination = (url = "episode"): Promise<CharacterServiceProps> => {
    return API.get(url).then(response => response.data);
}

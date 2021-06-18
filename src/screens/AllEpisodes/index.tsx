import React, { useState } from "react";
import { useEffect } from "react";
import { EpisodeProps, getEpisodesByPagination } from "../../services/Episodes";
import { MainContainer } from "./styles";
const AllEpisodes = () => {
    const [episodes, setEpisodes] = useState<EpisodeProps[]>([]);
    const [nextUrl, setNextUrl] = useState("");

    const fetchMore = () => {
        getEpisodesByPagination(nextUrl).then(response => {
            const { info, results } = response;

            if (info.next) setNextUrl(info.next);

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

        </MainContainer>
    )
}

export default AllEpisodes;
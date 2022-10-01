import { useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import { useAxiosGenres } from "../helper/useAxios"
import Highlight from "../components/L.components/Highlight";
import ListDistributor from "../components/lists/ListDistributor";
import TiledList from "../components/lists/TiledList";
import Loading from "../components/Loading";

type CustomGenreProps = {
    viewMode: "full" | "tiles",
    filter: {
        filterType: "general" | "language",
        sortOption: 0 | 1 | 2 | 3,
        genreOption: string,
        isMovie: boolean,
        // languageType?: "original" | "dubbing" | "subtitles",
        languageOption: string
    },
}

function CustomGenre(props: CustomGenreProps) {
    let { genreId } = useParams();
    let loc = useLocation();
    const { loading, genresData } = useAxiosGenres(loc.pathname.includes("tv") ? "tv" : "movie", genreId ? Number(genreId) : 0)
    const [pageLoaded, setPageLoaded] = useState(false);

    const updatePageLoaded = () => setPageLoaded(true);

    return (
        <>
            {!pageLoaded &&
                <Loading />
            }

            {props.viewMode == "full" && genresData[0] !== undefined &&
                <>
                    <Highlight highlight={genresData.length > 0 ? genresData[4] : {}} />
                    <ListDistributor showList={genresData} type="genre" updatePageLoaded={updatePageLoaded} />
                </>
            }

            {props.viewMode == "tiles" &&
                <TiledList filterType={props.filter.filterType} genreFilter={props.filter.genreOption} sort={props.filter.sortOption} isMovies={props.filter.isMovie} languageType={null} language={props.filter.languageOption} />
            }

        </>

    )
}

export default CustomGenre


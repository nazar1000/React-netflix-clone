import { useState } from "react";
import { Outlet } from "react-router-dom";
import Highlight from "../components/L.components/Highlight";
import NamedLists from "../components/lists/NamedListDistributor";
import TiledList from "../components/lists/TiledList";
import Loading from "../components/Loading";

type MovieProps = {
    viewMode: "full" | "tiles",
    showsData: any[],
    filter: {
        filterType: "general" | "language",
        sortOption: 0 | 1 | 2 | 3,
        genreOption: string,
        isMovie: boolean,
        // languageType?: "original" | "dubbing" | "subtitles",
        languageOption: string
    },
}

const Movies = (props: MovieProps) => {
    const [pageLoaded, setPageLoaded] = useState(false);

    const updatePageLoaded = () => setPageLoaded(true);

    return (
        <>

            {!pageLoaded &&
                <Loading />
            }

            {props.showsData.length > 0 &&
                <>
                    {props.viewMode == "full" &&
                        <>
                            <Highlight highlight={props.showsData[3][0][16]} />
                            <NamedLists showList={props.showsData} type="movies" updatePageLoaded={updatePageLoaded} />
                        </>
                    }

                    {props.viewMode == "tiles" &&
                        <>
                            <TiledList filterType={props.filter.filterType} genreFilter={props.filter.genreOption} sort={props.filter.sortOption} isMovies={props.filter.isMovie} languageType={null} language={props.filter.languageOption} />
                            {() => updatePageLoaded()}
                        </>
                    }
                </>
            }
            <Outlet />
        </>
    )
}

export default Movies;
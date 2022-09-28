import { useState } from "react";
import { Outlet } from "react-router-dom";
import Highlight from "../components/L.components/Highlight";
import NamedLists from "../components/lists/NamedListDistributor";
import TiledList from "../components/lists/TiledList";
import Loading from "../components/Loading";


type Tv_ShowsProps = {
    showsData: any[];
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


export const Tv_Shows = (props: Tv_ShowsProps) => {
    // const { loading, data } = useAxios("tv")
    const [pageLoaded, setPageLoaded] = useState(false);

    const updatePageLoaded = () => {
        setPageLoaded(true);
    }

    return (
        <>

            {!pageLoaded && <Loading />}

            {props.showsData.length > 0 &&
                <>
                    {props.viewMode == "full" &&
                        <>
                            <Highlight highlight={props.showsData[2][0][9]} />
                            <NamedLists showList={props.showsData} type="tv" updatePageLoaded={updatePageLoaded} />
                        </>
                    }

                    {props.viewMode == "tiles" &&
                        <TiledList filterType={props.filter.filterType} genreFilter={props.filter.genreOption} sort={props.filter.sortOption} isMovies={props.filter.isMovie} languageType={null} language={props.filter.languageOption} />
                    }
                </>
            }
            <Outlet />
        </>
    )
}


export default Tv_Shows;
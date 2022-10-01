import "./tiledList.scss"
import { useAxiosFilter } from "../../helper/useAxios";
import Tile from "../Tile";

type TiledListProps = {
    genreFilter: false | string,
    sort: 0 | 1 | 2 | 3;
    isMovies: boolean,
    filterType: "general" | "language";
    languageType?: null | "original" | "dubbing" | "subtitles",
    language?: null | string,
}

function TiledList(props: TiledListProps) {
    const { loading, filteredResults } = useAxiosFilter(props.filterType, props.sort, props.genreFilter, props.isMovies, props.language)

    return (
        <div className="tiled-list">
            {!loading && filteredResults.map((show: any) => {
                return (
                    <Tile key={show.id}
                        data={show} />
                )
            })
            }
        </div>
    )
}

export default TiledList
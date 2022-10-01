// uses global stylesheet
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Tile from "../components/Tile"

type SearchPageProps = {
    allData: any[];
}

const SearchPage = (props: SearchPageProps) => {
    let { query } = useParams();
    const [results, setResults] = useState<any[]>([])

    useEffect(() => {

        let filteredShows = props.allData.filter((show: any) => {
            let showName = show?.name ? show.name.toLowerCase() : show.title.toLowerCase();
            if (showName.includes(query?.toLowerCase())) return show;
        })

        for (let i = 0; i < filteredShows.length; i++) {
            for (let z = i + 1; z < filteredShows.length; z++) {

                if (filteredShows[i].id == filteredShows[z].id) {
                    filteredShows.splice(z, 1);
                    z--;
                }
            }
        }

        // console.log(filteredShows);
        setResults(filteredShows);
    }, [query])

    return (
        <div className="search-list">
            {results.map((show, index) => {
                if (index > 30) return;
                return <Tile key={index}
                    data={show} />
            })}
        </div>
    )
}

export default SearchPage;
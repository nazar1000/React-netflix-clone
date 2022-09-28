import TiledList from "../components/lists/TiledList";

type BrowseByLanguageProps = {
    filter: {
        filterType: "general" | "language",
        sortOption: 0 | 1 | 2 | 3,
        genreOption: string,
        isMovie: boolean,
        // languageType?: "original" | "dubbing" | "subtitles",
        languageOption: string
    },
}

const Browse_By_Language = (props: BrowseByLanguageProps) => {
    return (
        <TiledList filterType={props.filter.filterType} sort={props.filter.sortOption} isMovies={props.filter.isMovie} languageType={null} language={props.filter.languageOption} genreFilter={""} />
    )
}

export default Browse_By_Language;

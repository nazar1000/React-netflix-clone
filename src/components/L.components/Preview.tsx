import "./preview.scss"
import EpisodeTile from "../EpisodeTile";
import RecommendationTile from "../RecommendationTile";
import Button from "../Button";

import { useEffect, useState } from "react";
import { useAxiosDetails } from "../../helper/useAxios";

type PreviewProps = {
    data: any | null,
    isShowing: boolean, // Preview showing status
    closePreview: Function //Closes preview,
    playThis: Function,
    addToList: Function,
    updateLike: Function,
}

function Preview(props: PreviewProps) {
    const [isShowing, setIsShowing] = useState(false);
    const isMovie = props?.data.first_air_date == undefined ? "movie" : "tv"; //Show type
    const previewMargin = window.scrollY;

    const { loading, showDetails } = useAxiosDetails(isMovie, props.data.id) //Gets details of the show as {details, cast, similar}

    const [isSeasonDropdown, setSeasonDropdown] = useState(false); // Dropdown for choosing season
    const [seasonButtonIndex, setSeasonButtonIndex] = useState(0); //active season selected

    useEffect(() => {
        setIsShowing(props.isShowing); //local status, allows for a delay so that showDetails can properly load/change

        //locks html overflow
        if (props.isShowing) {
            document.getElementsByTagName("html")[0].style.overflow = "hidden";
            document.getElementsByTagName("html")[0].style.overflow = "calc(100% - 30px)";
        } else document.getElementsByTagName("html")[0].style.overflow = "auto";
    }, [props.isShowing])

    const getDurationInfo = () => {
        //Movie time info
        if (isMovie == "movie") {
            let runtimeHr = Math.floor(Number(showDetails.details.runtime) / 60) + "h";
            let runtimeMin = Math.round((Number(showDetails.details.runtime) / 60) % 1 * 60) + "m";
            let year = new Date(showDetails.details.release_date).getFullYear();
            let returnValue = year + " " + runtimeHr + " " + runtimeMin;
            return <span>{returnValue}</span>
        }
    }

    return (
        <>
            {isShowing &&
                <div className="preview-outer" style={{ marginTop: previewMargin }} onClick={() => props.closePreview()}>
                    <div className="preview-inner" onClick={(e) => e.stopPropagation()} >
                        {!loading &&
                            <>
                                <div className="bg-image">
                                    <img src={"https://image.tmdb.org/t/p/original" + (showDetails.details.backdrop_path ? showDetails.details.backdrop_path : showDetails.details.poster_path)}></img>
                                    <div className="close-button" onClick={() => props.closePreview()}></div>
                                    <div className="bg__buttons">
                                        <h1>{isMovie == "movie" ? showDetails.details.original_title : showDetails.details.original_name}</h1>
                                        <div className="preview-options">
                                            <Button type="play" shape="text" data={props.data} text="Play" />
                                            <Button type="add" shape="round" data={props.data} />
                                            <Button type="like" shape="round" data={props.data} />
                                        </div>
                                    </div>
                                </div>

                                <div className="preview-content">

                                    <div className="preview-info">
                                        {/* <div className="show-features"> */}
                                        <div className="show-info">
                                            {getDurationInfo()}
                                            <p>{showDetails.details.overview}</p>
                                        </div>
                                        <div className="show-extra-info">

                                            <div className="separator">
                                                <span className="label-grey">Cast:</span>

                                                {!loading && showDetails.cast.cast.map((person: any, index: number) => {
                                                    if (index > 10) return; //Limiting cast info to 10
                                                    return <span key={index}> {person.name}, </span>
                                                })}
                                            </div>

                                            <div className="separator">
                                                <span className="label-grey">Genres:</span>
                                                {!loading && showDetails.details.genres.map((genre: { name: string }) => <span key={genre.name}> {genre.name},</span>)}

                                                {/* <span className="label-grey">The movie is:</span> */}
                                            </div>
                                        </div>
                                        {/* </div> */}
                                    </div>

                                    {isMovie == "tv" &&
                                        <>
                                            {console.log(isMovie, showDetails, seasonButtonIndex)}
                                            <div className="episodes-container">
                                                <div className="legend">
                                                    <h2>Episodes </h2>
                                                    <button onClick={() => setSeasonDropdown(!isSeasonDropdown)}>{showDetails.details.seasons[seasonButtonIndex].name}
                                                        {isSeasonDropdown && <div className="seasons-dropdown">
                                                            <ul>
                                                                {showDetails.details.seasons.map((season: any, index: number) => {
                                                                    return <li key={index} onClick={() => setSeasonButtonIndex(index)}>{season.name + " (" + season.episode_count + " Episodes)"}</li>
                                                                })}

                                                            </ul>
                                                        </div>}
                                                    </button>
                                                </div>
                                                <div className="episode-list">
                                                    {Array(showDetails.details.seasons[seasonButtonIndex].episode_count).fill(1).map((season: any, index: number) => {
                                                        if (index >= 5) return;
                                                        return <EpisodeTile key={index} index={index + 1} img={"https://image.tmdb.org/t/p/w300" + showDetails.details.backdrop_path} title={"Episode: " + (seasonButtonIndex * 5 + index + 1)} duration={"" + (20 + (Math.round(Math.random() * 30)))} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id diam interdum, cursus sapien vel, molestie felis. Vivamus a sem."} />
                                                    })}
                                                </div>
                                            </div>

                                            <div className="collections-container">
                                                {/* Other movies/shows like this */}
                                                {/* <RecommendationTile></RecommendationTile> */}
                                            </div>
                                        </>
                                    }

                                    <div className="recommendation-container">
                                        <h2>More Like This</h2>
                                        <div className="recommendation-list">

                                            {showDetails.similar.map((show: any) => {
                                                return (

                                                    <RecommendationTile key={show.id}
                                                        img={"https://image.tmdb.org/t/p/w200" + show.backdrop_path ? show.backdrop_path : show.poster_path}
                                                        // yearReleased={isMovie ? new Date(show.release_date).getFullYear() : show.first_air_date.slice(0,4)}
                                                        yearReleased={isMovie == "movie" ? show.release_date.slice(0, 4) : show.first_air_date.slice(0, 4)}
                                                        description={show.overview} data={show} onClick={props.playThis(show)}
                                                    />
                                                )

                                            })}

                                        </div>
                                    </div>

                                    <div className="credits">
                                        <h2>About {showDetails.details.title}</h2>
                                        {/* <span>Creators:</span> */}
                                        <div className="separator">
                                            <span className="label-grey">Crew:</span>
                                            {showDetails.cast.crew.map((person: any, index: number) => {
                                                if (index > 10) return;
                                                return <span key={index}> {person.name}, </span>
                                            })}
                                        </div>

                                        <div className="separator">
                                            <span className="label-grey">Cast:</span>
                                            {showDetails.cast.cast.map((person: any, index: number) => {
                                                if (index > 10) return;
                                                return <span key={index}> {person.name}, </span>
                                            })}
                                        </div>

                                        <div className="separator">
                                            <span className="label-grey">Genres:</span>
                                            {showDetails.details.genres.map((genre: any, index: number) => {
                                                if (index > 10) return;
                                                return <span key={index}> {genre.name}, </span>
                                            })}
                                        </div>

                                        {/* <span>This show is:</span> */}
                                        {/* <span>Maturity rating:</span> */}
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div >
            }
        </>
    )
}

export default Preview
import React, { useState, useEffect } from "react"
import { AxiosResponse } from "axios";
import './highlight.scss';
import { } from "../helper_function/helper";

type highlighProps = {
    tvShows: Array<any>
    movies: Array<any>
    highlight: any | undefined
}

function Highlight(props: highlighProps) {
    const [showInfo, setShowInfo] = useState<any>([])


    useEffect(() => {
        // setTimeout(() => randomID(), 2000);
    }, [props.movies, props.tvShows])


    const getImage = (): string => {
        let url = "https://image.tmdb.org/t/p/w500";
        let imgUrl;
        if (props.highlight.backdrop_path) imgUrl = props.highlight.backdrop_path;
        else if (props.highlight.poster_path) imgUrl = props.highlight.poster_path;
        else return "";

        return url + imgUrl;
    }


    const test = () => {
        // console.log(showInfo);
        // console.log(props.movies)
        // getImage();
        console.log(props.highlight)
    }

    return (
        <div className="highlight-div">
            <div className="highlight-div__bg-div">
                <img src={props.highlight ? getImage() : "false"}></img>
            </div>

            <div className="highlight__info-div">

                <div className="info-div__title-div">
                    <img></img>
                    {props.highlight && <h1>{props.highlight.original_title ? props.highlight.original_title : props.highlight.original_name}</h1>}

                </div>

                <div className="info-div__intro-div">
                    <p>{props.highlight?.overview}</p>
                </div>


                <button>Play</button>
                <button>More Info</button>
                <button onClick={() => { test() }}>Debug Highlight</button>

            </div>
        </div>
    )
}

export default Highlight
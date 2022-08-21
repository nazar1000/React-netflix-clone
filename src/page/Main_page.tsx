import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import axios, { AxiosResponse } from "axios";
import Highlight from "../components_large/Highlight"
import NamedLists from "../components_large/NamedLists";
import { api_key, getRandomID, timer } from "../helper_function/helper";



type mainPageProps = {
    activePage: string
}

type highlight = {
    home: AxiosResponse<any, any>
    movie: AxiosResponse<any, any>
    tv: AxiosResponse<any, any>
}

function Main_page(props: mainPageProps) {
    const [pageInfo, setPageInfo] = useState();

    //Highlight pages
    const [movies, setMovies] = useState<Array<any>>([])
    const [tvShows, setTvShows] = useState<Array<any>>([])
    const [highlightPages, setHighlightPages] = useState<highlight>({} as highlight)

    //namedLists
    const [namedLists, setNamedLists] = useState<{}>([]);

    // const api_key = "872ece6f49b1fd7eebe81f916bcf1fdb"
    const requests: any = {
        movies: "https://api.themoviedb.org/3/discover/movie",
        tv: "https://api.themoviedb.org/3/discover/tv",
    }

    const getLists = (request: string, setState: Function): void => {
        axios.get(requests[request] + api_key, {

        }).then((res) => {
            setState(res.data.results);
        })
    }

    useEffect(() => {
        getLists("movies", setMovies);
        getLists("tv", setTvShows);
        getNamedLists();
    }, [])

    useEffect(() => {
        if (movies.length > 0 && tvShows.length > 0) getStartingHighlights();
    }, [movies, tvShows])


    const getStartingHighlights = (): void => {
        let req = "https://api.themoviedb.org/3/";

        let random1 = Math.round(Math.random());
        let id1 = getRandomID(random1 == 0 ? movies : tvShows);
        let type1 = random1 == 0 ? "movie/" : "tv/";

        let id2 = getRandomID(movies);
        let id3 = getRandomID(tvShows);

        let req1 = req + type1 + id1 + api_key;
        let req2 = req + "movie/" + id2 + api_key;
        let req3 = req + "tv/" + id3 + api_key;

        let request1 = axios.get(req1);
        let request2 = axios.get(req2);
        let request3 = axios.get(req3);

        // console.log("Sending requests");
        axios.all([request1, request2, request3])
            .then(axios.spread((...responses) => {
                const response1 = responses[0].data;
                const response2 = responses[1].data;
                const response3 = responses[2].data;

                setHighlightPages({
                    home: response1,
                    movie: response2,
                    tv: response3

                })

            })).catch(errors => {
                console.log("Error", errors)
            })
    }

    const getNamedLists = (): void => {
        let req = "https://api.themoviedb.org/3/",

            req1 = req + "genre/movie/list" + api_key,
            req2 = req + "genre/tv/list" + api_key,

            req3 = req + "trending/all/day" + api_key,
            req4 = req + "trending/all/week" + api_key,

            req5 = req + "discover/movie" + api_key + "&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2022",
            req6 = req + "discover/tv" + api_key + "&sort_by=popularity.desc&first_air-date_year=2022&page=1&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0",

            req7 = req + "tv/top_rated" + api_key,
            req8 = req + "movie/top_rated" + api_key,

            req9 = req + "movie/popular" + api_key,
            req10 = req + "tv/popular" + api_key;

        console.log(req9);

        let request1 = axios.get(req1);
        let request2 = axios.get(req2);
        let request3 = axios.get(req3);
        let request4 = axios.get(req4);
        let request5 = axios.get(req5);
        let request6 = axios.get(req6);
        let request7 = axios.get(req7);
        let request8 = axios.get(req8);
        let request9 = axios.get(req9);
        let request10 = axios.get(req10);

        axios.all([request1, request2, request3,
            request4, request5, request6,
            request7, request8, request9, request10

        ])
            .then(axios.spread((...responses) => {
                // console.log(responses[0]);
                setNamedLists({
                    movieGenres: responses[0].data.genres,
                    tvGenres: responses[1].data.genres,
                    trendingToday: responses[2].data.results,
                    trendingThisWeek: responses[3].data.results,
                    releasedThisYearMovies: responses[4].data.results,
                    releasedThisYearTv: responses[5].data.results,
                    topRatedMovies: responses[6].data.results,
                    topRatedTv: responses[7].data.results,
                    popularMovies: responses[8].data.results,
                    popularTv: responses[9].data.results

                })

            })).catch(errors => {
                console.log("Error", errors)
            })
    }


    const test = () => {
        console.log(highlightPages);
        // if (!highlightPages?.home) getStartingHighlights();
        console.log(namedLists)
    }







    return (
        <div className="main-page-container" >

            {props.activePage == "home" &&
                <>
                    <Highlight highlight={highlightPages.home} movies={movies} tvShows={tvShows} />
                    <NamedLists type={"both"} showList={namedLists} />
                </>
            }

            {/* {props.activePage == "tv shows" &&
                <>
                    <Highlight highlight={highlightPages.tv} movies={movies} tvShows={tvShows} />
                    <NamedLists type={"tv"} showList={namedLists} />
                </>
            }

            {props.activePage == "movies" &&
                <>
                    <Highlight highlight={highlightPages.movie} movies={movies} tvShows={tvShows} />
                    <NamedLists type={"movies"} showList={namedLists} />
                </>

            } */}

            {/* {props.activePage == "new & popular" &&
            
            
            }

            {props.activePage == "my list" &&
            
            
            }

            {props.activePage == "browse by language" &&
            
            
        }  */}



            <button onClick={() => test()} >Movies</button>


        </div>
    )

}

export default Main_page;

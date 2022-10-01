import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react"
import languages_list from "./language_list";



export const api_key = "?api_key=";



const mainUrl = "https://api.themoviedb.org/3/";
const urlList = {
    movieGenres: mainUrl + "genre/movie/list" + api_key,
    tvGenres: mainUrl + "genre/tv/list" + api_key,

    trendingToday: mainUrl + "trending/all/day" + api_key,
    trendingWeek: mainUrl + "trending/all/week" + api_key,

    randomMovies: mainUrl + "discover/movie" + api_key + "&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2022",
    randomTvShows: mainUrl + "discover/tv" + api_key + "&sort_by=popularity.desc&first_air-date_year=2022&page=1&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0",
    topRatedTv: mainUrl + "tv/top_rated" + api_key,
    topRatedMovie: mainUrl + "movie/top_rated" + api_key,
    popularMovies: mainUrl + "movie/popular" + api_key,
    popularTv: mainUrl + "tv/popular" + api_key,
}



export const useAxios = (
    type: "home" | "tv" | "movie" | "new" | "browse" | "custom" | "genre" | "all",
    url?: string
) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>({})

    const getData = async () => {
        let requestArr: (Promise<AxiosResponse<any, any>> | undefined)[] = [];
        let responseName: string[];

        //home
        switch (type) {
            case "all": {
                const request1 = axios.get(urlList.trendingToday)
                const request2 = axios.get(urlList.trendingWeek)

                const request3 = axios.get(urlList.movieGenres)
                const request4 = axios.get(urlList.randomMovies)
                const request5 = axios.get(urlList.topRatedMovie)
                const request6 = axios.get(urlList.popularMovies)

                const request7 = axios.get(urlList.tvGenres)
                const request8 = axios.get(urlList.randomTvShows)
                const request9 = axios.get(urlList.topRatedTv)
                const request10 = axios.get(urlList.popularTv)


                requestArr = [request1, request2, request3, request4, request5, request6, request7, request8, request9, request10];
                responseName = ["trendingToday", "trendingWeek", "movieGenres", "randomMovies", "topRatedMovie", "popularMovies", "tvGenres", "randomTvShows", "topRatedTv", "popularTv"]
                break;
            } case "home": {
                const request1 = axios.get(urlList.popularMovies); //movies genres
                const request2 = axios.get(urlList.popularTv); //tv list
                const request3 = axios.get(urlList.randomMovies); //tv list
                const request4 = axios.get(urlList.randomTvShows); //tv list
                const request5 = axios.get(urlList.trendingToday); // trending day
                const request6 = axios.get(urlList.trendingWeek); // trending week

                requestArr = [request1, request2, request3, request4, request5, request6];
                responseName = ["popularMovies", "popularTv", "randomMovies", "randomTvShows", "trendingToday", "trendingWeek"]
                break;
                //tv shows
            } case "tv": {
                const request1 = axios.get(urlList.tvGenres); //tv list
                const request2 = axios.get(urlList.randomTvShows); // discover tv (random tv show)
                const request3 = axios.get(urlList.topRatedTv); //top rated tv
                const request4 = axios.get(urlList.popularTv); //popular tv

                requestArr = [request1, request2, request3, request4];
                responseName = ["tvGenres", "randomTvShows", "topRatedTv", "popularTv"];

                break;
                //movies
            } case "movie": {
                const request1 = axios.get(urlList.movieGenres); //movies list
                const request2 = axios.get(urlList.randomMovies); // discover tv (random movie)
                const request3 = axios.get(urlList.topRatedMovie);// top rated movies
                const request4 = axios.get(urlList.popularMovies); // popular movies

                requestArr = [request1, request2, request3, request4];
                responseName = ["movieGenres", "randomMovies", "topRatedMovie", "popularMovies"];
                break;
                //new And popular
            } case "new": {
                break;
            } case "browse": {
                break;
            } case "custom": {
                const request1 = url ? axios.get(url) : axios.get(mainUrl);
                requestArr = [request1]
                break;
            } case "genre": {
                const request1 = axios.get(urlList.movieGenres); //movies list
                const request2 = axios.get(urlList.tvGenres); //tv list
                requestArr = [request1, request2];
                responseName = ["movieGenres", "tvGenres"];
                break;
            } default: {
                requestArr = []
            }
        }

        await axios.all(requestArr)
            .then(axios.spread((...responses) => {
                //Creates object 

                if (type != "all") {
                    let newData = responses.reduce((acc, cur, index) => ({ ...acc, [responseName[index]]: (cur?.data.results ? cur.data.results : cur?.data.genres) }), {})
                    // console.log(newData);
                    setData(newData);

                } else {
                    let home = {
                        [responseName[0]]: responses[0]?.data.results,
                        [responseName[1]]: responses[1]?.data.results,
                    }

                    let movies = {
                        [responseName[2]]: responses[2]?.data.genres,
                        [responseName[3]]: responses[3]?.data.results,
                        [responseName[4]]: responses[4]?.data.results,
                        [responseName[5]]: responses[5]?.data.results,
                    }

                    let tv = {
                        [responseName[6]]: responses[6]?.data.genres,
                        [responseName[7]]: responses[7]?.data.results,
                        [responseName[8]]: responses[8]?.data.results,
                        [responseName[9]]: responses[9]?.data.results,
                    }

                    setData({ home, movies, tv });
                }




                setLoading(false);

            })).catch(errors => {
                // console.log("Error", errors)
            })

    }

    useEffect(() => {
        getData();
    }, [])


    return { loading, data };
}

//Used for getting list of specific genre (for tv and movie pages)
export const useAxiosGenres = (
    type: "tv" | "movie",
    genreId?: number
) => {
    const [loading, setLoading] = useState(true);
    const [genresData, setGenresData] = useState<any>({})

    const getData = async () => {
        let requestArr: (Promise<AxiosResponse<any, any>> | undefined)[] = [];
        let responseName: string[];

        if (genreId == 0) return;

        const url = mainUrl + `discover/${type}${api_key}&sort_by=popularity.desc&page=1&with_genres=${genreId}`

        switch (type) {
            case "tv": {
                const request1 = axios.get(url)
                requestArr = [request1];
                break;

            } case "movie": {
                const request1 = axios.get(url); //movies genres
                requestArr = [request1];
                break;

            } default: {
                requestArr = []
            }
        }

        // console.log("Type", type);

        await axios.all(requestArr)
            .then(axios.spread((...responses) => {
                // console.log(responseName, responses);

                setGenresData(responses[0]?.data.results);
                setLoading(false);

            })).catch(errors => {
                // console.log("Error", errors)
            })
    }

    useEffect(() => {
        getData();
    }, [])


    return { loading, genresData };
}


//Used for getting list of cast, details , and similar shows for specific movie/tv
export const useAxiosDetails = (
    type: "tv" | "movie",
    showID: number
) => {
    const [loading, setLoading] = useState(true);
    const [showDetails, setShowDetails] = useState<any>({})

    const getData = async () => {
        let requestArr: (Promise<AxiosResponse<any, any>> | undefined)[] = [];
        let responseName: string[];

        if (showID == 0) return;

        const tvDetails = mainUrl + `${type}/${showID}${api_key}`;
        const tvCast = mainUrl + `${type}/${showID}/credits${api_key}`;
        const tvSimilar = mainUrl + `${type}/${showID}/similar${api_key}`;

        const movieDetails = mainUrl + `${type}/${showID}${api_key}`;
        const movieCast = mainUrl + `${type}/${showID}/credits${api_key}`;
        const movieSimilar = mainUrl + `${type}/${showID}/similar${api_key}`;

        https://api.themoviedb.org/3/movie/610150?api_key=872ece6f49b1fd7eebe81f916bcf1fdb
        // 

        switch (type) {
            case "tv": {
                const request1 = axios.get(tvDetails)
                const request2 = axios.get(tvCast)
                const request3 = axios.get(tvSimilar)
                requestArr = [request1, request2, request3];
                responseName = ["details", "cast", "similar"]
                break;


            } case "movie": {
                const request1 = axios.get(movieDetails)
                const request2 = axios.get(movieCast)
                const request3 = axios.get(movieSimilar)
                requestArr = [request1, request2, request3];
                responseName = ["details", "cast", "similar"]
                break;

            } default: {
                requestArr = []
            }
        }

        // console.log("Type", type);

        await axios.all(requestArr)
            .then(axios.spread((...responses) => {
                // console.log(responseName, responses);
                setShowDetails({
                    "details": responses[0]?.data,
                    "cast": responses[1]?.data,
                    "similar": responses[2]?.data.results,
                });

                setLoading(false);

            })).catch(errors => {
                // console.log("Error", errors)
            })
    }

    useEffect(() => {
        getData();
        setLoading(true);
        // console.log(type)
    }, [showID])

    return { loading, showDetails };
}


const sortTypesMovie = {
    0: "popularity.desc",
    1: "release_date.desc",
    2: "original_title.desc",
    3: "original_title.asc"
}

const sortTypesTv = {
    0: "popularity.desc",
    1: "first_air_date.desc",
    2: "vote_average.desc",
    3: "vote_average.asc"
}

export const useAxiosFilter = (
    filterType: "general" | "language",
    sort: 0 | 1 | 2 | 3,
    genre: false | string,
    isMovie: boolean,
    // languageType?: "original" | "dubbing" | "subtitles",
    language?: null | string,

) => {
    const [loading, setLoading] = useState(true);
    const [filteredResults, setFilteredResults] = useState<any>({})




    const getData = async () => {
        let requestArr: (Promise<AxiosResponse<any, any>> | undefined)[] = [];
        let responseName: string[];

        //general sort
        let sorting = `&sort_by=${isMovie ? sortTypesMovie[sort] : sortTypesTv[sort]}`
        let genreFilter = `&with_genres=${genre}`
        // console.log(sort);

        //Language sort
        let lang = languages_list.filter((lang) => lang.name == language);
        let languageOption = `&language=${lang[0].code}`
        // let languageTypeOption; //No search criteria

        let type = isMovie ? "discover/movie" : "discover/tv"
        let page = "&page=" + (Math.floor(Math.random() * 5) + 1)
        let url = mainUrl + type + api_key + sorting + (genre === false ? "" : genreFilter) + languageOption + page;//Here I was
        console.log(url);

        // https://api.themoviedb.org/3/movie/610150?api_key=872ece6f49b1fd7eebe81f916bcf1fdb


        const request1 = axios.get(url)
        requestArr = [request1];
        responseName = ["data"]

        // console.log("Type", type);

        await axios.all(requestArr)
            .then(axios.spread((...responses) => {
                // console.log(responseName, responses);
                setFilteredResults(
                    responses[0]?.data.results,
                );

                setLoading(false);

            })).catch(errors => {
                // console.log("Error", errors)
            })
    }

    useEffect(() => {
        // console.log("reload")
        getData();
        setLoading(true);
    }, [filterType, sort, genre, isMovie, language])

    return { loading, filteredResults };
}













const urlMainMovieGenres = `discover/movie${api_key}&with_genres=`;
const urlMainTvGenre = `discover/tv${api_key}&with_genres=`
// const mainUrl = "https://api.themoviedb.org/3/";

//movies
const movieGenres = {
    Action: mainUrl + urlMainMovieGenres + 28,
    Adventure: mainUrl + urlMainMovieGenres + 12,
    Animation: mainUrl + urlMainMovieGenres + 16,
    Comedy: mainUrl + urlMainMovieGenres + 35,
    Crime: mainUrl + urlMainMovieGenres + 80,
    Documentary: mainUrl + urlMainMovieGenres + 99,
    Drama: mainUrl + urlMainMovieGenres + 18,
    Family: mainUrl + urlMainMovieGenres + 10751,
    Fantasy: mainUrl + urlMainMovieGenres + 14,
    History: mainUrl + urlMainMovieGenres + 36,
    Horror: mainUrl + urlMainMovieGenres + 27,
    Music: mainUrl + urlMainMovieGenres + 10402,
    Mystery: mainUrl + urlMainMovieGenres + 9648,
    Romance: mainUrl + urlMainMovieGenres + 10749,
    "Science Fiction": mainUrl + urlMainMovieGenres + 878,
    "TV Movie": mainUrl + urlMainMovieGenres + 10770,
    Thriller: mainUrl + urlMainMovieGenres + 53,
    War: mainUrl + urlMainMovieGenres + 10752,
    Western: mainUrl + urlMainMovieGenres + 37,
}

//tv
const tvGenres = {
    "Action & Adventure": mainUrl + urlMainTvGenre + 10759,
    "Animation": mainUrl + urlMainTvGenre + 16,
    Comedy: mainUrl + urlMainTvGenre + 35,
    Crime: mainUrl + urlMainTvGenre + 80,
    Documentary: mainUrl + urlMainTvGenre + 99,
    Drama: mainUrl + urlMainTvGenre + 18,
    Family: mainUrl + urlMainTvGenre + 10751,
    Kids: mainUrl + urlMainTvGenre + 10762,
    Mystery: mainUrl + urlMainTvGenre + 9648,
    News: mainUrl + urlMainTvGenre + 10763,
    Reality: mainUrl + urlMainTvGenre + 10764,
    "Sci-Fi & Fantasy": mainUrl + urlMainTvGenre + 10765,
    Soap: mainUrl + urlMainTvGenre + 10766,
    Talk: mainUrl + urlMainTvGenre + 10767,
    "War & Politics": mainUrl + urlMainTvGenre + 10768,
    Western: mainUrl + urlMainTvGenre + 37,
}

const url = {
    movies: {
        movieGenres,
        upcoming: mainUrl + "movie/upcoming" + api_key,
        top_rated: mainUrl + "movie/top_rated" + api_key,
        popular: mainUrl + "movie/popular" + api_key,
        now_playing: mainUrl + "movie/now_playing" + api_key,
        latest: mainUrl + "movie/latest" + api_key,
        trendingToday: mainUrl + "trending/movie/day" + api_key,
        trendingWeek: mainUrl + "trending/movie/week" + api_key,
        new_this_year: mainUrl + "discover/movie" + api_key + "&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2022",

    },


    tv: {
        tvGenres,
        airing_today: mainUrl + "tv/airing_today" + api_key,
        top_rated: mainUrl + "tv/top_rated" + api_key,
        popular: mainUrl + "tv/popular" + api_key,
        on_the_air: mainUrl + "tv/on_the_air" + api_key,
        Latest: mainUrl + "tv/latest" + api_key,
        trendingToday: mainUrl + "trending/tv/day" + api_key,
        trendingWeek: mainUrl + "trending/tv/week" + api_key,
        new_this_year: mainUrl + "discover/tv" + api_key + "&sort_by=popularity.desc&first_air-date_year=2022&page=1&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0",

    },

    genres: {
        movieGenres: mainUrl + "genre/movie/list" + api_key,
        tvGenres: mainUrl + "genre/tv/list" + api_key,
    }
}


export const useAxiosGetAll = () => {
    const [load, setLoading] = useState(true);
    const [allData, setAllData] = useState<any>({})

    const getData = async () => {
        // let requestArr: (Promise<AxiosResponse<any, any>> | undefined)[] = [];


        //movie genres
        const reqArr = [
            axios.get(url.movies.movieGenres.Action),
            axios.get(url.movies.movieGenres.Adventure),
            axios.get(url.movies.movieGenres.Animation),
            axios.get(url.movies.movieGenres.Comedy),
            axios.get(url.movies.movieGenres.Crime),
            axios.get(url.movies.movieGenres.Documentary),
            axios.get(url.movies.movieGenres.Drama),
            axios.get(url.movies.movieGenres.Family),
            axios.get(url.movies.movieGenres.Fantasy),
            axios.get(url.movies.movieGenres.History),
            axios.get(url.movies.movieGenres.Horror),
            axios.get(url.movies.movieGenres.Music),
            axios.get(url.movies.movieGenres.Mystery),
            axios.get(url.movies.movieGenres.Romance),
            axios.get(url.movies.movieGenres["Science Fiction"]),
            axios.get(url.movies.movieGenres["TV Movie"]),
            axios.get(url.movies.movieGenres.Thriller),
            axios.get(url.movies.movieGenres.War),
            axios.get(url.movies.movieGenres.Western),
            //movies
            axios.get(url.movies.upcoming),
            axios.get(url.movies.top_rated),
            axios.get(url.movies.popular),
            axios.get(url.movies.now_playing),
            axios.get(url.movies.latest),
            axios.get(url.movies.trendingToday),
            axios.get(url.movies.trendingWeek),
            axios.get(url.movies.new_this_year),


            //tv genres
            axios.get(url.tv.tvGenres["Action & Adventure"]),
            axios.get(url.tv.tvGenres["Animation"]),
            axios.get(url.tv.tvGenres.Comedy),
            axios.get(url.tv.tvGenres.Crime),
            axios.get(url.tv.tvGenres.Documentary),
            axios.get(url.tv.tvGenres.Drama),
            axios.get(url.tv.tvGenres.Family),
            axios.get(url.tv.tvGenres.Kids),
            axios.get(url.tv.tvGenres.Mystery),
            axios.get(url.tv.tvGenres.News),
            axios.get(url.tv.tvGenres.Reality),
            axios.get(url.tv.tvGenres["Sci-Fi & Fantasy"]),
            axios.get(url.tv.tvGenres.Soap),
            axios.get(url.tv.tvGenres.Talk),
            axios.get(url.tv.tvGenres["War & Politics"]),
            axios.get(url.tv.tvGenres.Western),

            // tv
            axios.get(url.tv.airing_today),
            axios.get(url.tv.top_rated),
            axios.get(url.tv.popular),
            axios.get(url.tv.on_the_air),
            axios.get(url.tv.Latest),
            axios.get(url.tv.trendingToday),
            axios.get(url.tv.trendingWeek),
            axios.get(url.tv.new_this_year),

            //genres categories
            axios.get(url.genres.movieGenres),
            axios.get(url.genres.tvGenres)
        ]

        // const reqArr = [req0,req1,req2,req3,req4,req5,req6,req7,req8,req9,req10,
        //     req11,req12,req13,req14,req15,req16,req17,req18,req19,req20,
        //     req21,req22,req23,req24,req25,req26,req27,req28,req29,req30,
        //     req31,req32,req33,req34,req35,req36,req37,req38,req39,req40,
        //     req41,req42,req43,req44,req45,req46,req47,req48,req49,req50,
        //     req51,req52];

        const responseName = [
            //movie genres
            "action", "adventure", "animation", "comedy", "crime", "documentary", "drama",
            "family", "fantasy", "history", "horror", "music", "mystery", "romance", "scienceFiction"
            , "tvMovie", "thriller", "war", "western",
            //movies 
            "upcoming", "topRated", "popular", "nowPlaying", "latest", "trendingToday", "trendingWeek",
            "newThisYear",

            //tv genres
            "actionAndAdventure", "animation", "comedy", "crime", "documentary", "drama",
            "family", "kids", "mystery", "news", "reality", "sciFiAndFantasy", "soap",
            "talk", "warAndPolitics", "western",
            // tv 
            "airingToday", "topRated", "popular", "onTheAir", "latest", "trendingToday",
            "trendingWeek", "newThisYear",

            //genre categories
            "movieGenres", "tvGenres",
        ]

        await axios.all(reqArr)
            .then(axios.spread((...res) => {
                //Creates object 

                let movies = {
                    movieGenres: [
                       /* [responseName[0]]:*/ res[0]?.data.results,/* [responseName[1]]:*/ res[1]?.data.results,
                       /* [responseName[2]]:*/ res[2]?.data.results,/* [responseName[3]]:*/ res[3]?.data.results,
                       /* [responseName[4]]:*/ res[4]?.data.results,/* [responseName[5]]:*/ res[5]?.data.results,
                       /* [responseName[6]]:*/ res[6]?.data.results,/* [responseName[7]]:*/ res[7]?.data.results,
                       /* [responseName[8]]:*/ res[8]?.data.results,/* [responseName[9]]:*/ res[9]?.data.results,
                        /*[responseName[10]]:*/ res[10]?.data.results, /*[responseName[11]]:*/ res[11]?.data.results,
                        /*[responseName[12]]:*/ res[12]?.data.results, /*[responseName[13]]:*/ res[13]?.data.results,
                        /*[responseName[14]]:*/ res[14]?.data.results, /*[responseName[15]]:*/ res[15]?.data.results,
                        /*[responseName[16]]:*/ res[16]?.data.results, /*[responseName[17]]:*/ res[17]?.data.results,
                        /*[responseName[18]]:*/ res[18]?.data.results,
                    ],
                    [responseName[19]]: res[19]?.data.results, [responseName[20]]: res[20]?.data.results,
                    [responseName[21]]: res[21]?.data.results, [responseName[22]]: res[22]?.data.results,
                    [responseName[23]]: res[23]?.data.results, [responseName[24]]: res[24]?.data.results,
                    [responseName[25]]: res[25]?.data.results, [responseName[26]]: res[26]?.data.results,
                }

                let tv = {
                    tvGenres: [
                        /* [responseName[27]]:*/ res[27]?.data.results, /* [responseName[28]]:*/ res[28]?.data.results,
                        /* [responseName[29]]:*/ res[29]?.data.results, /* [responseName[30]]:*/ res[30]?.data.results,
                        /* [responseName[31]]:*/ res[31]?.data.results, /* [responseName[32]]:*/ res[32]?.data.results,
                        /* [responseName[33]]:*/ res[33]?.data.results, /* [responseName[34]]:*/ res[34]?.data.results,
                        /* [responseName[35]]:*/ res[35]?.data.results, /* [responseName[36]]:*/ res[36]?.data.results,
                        /* [responseName[37]]:*/ res[37]?.data.results, /* [responseName[38]]:*/ res[38]?.data.results,
                        /* [responseName[39]]:*/ res[39]?.data.results, /* [responseName[40]]:*/ res[40]?.data.results,
                        /* [responseName[41]]:*/ res[41]?.data.results, /* [responseName[42]]:*/ res[42]?.data.results,
                    ],
                    [responseName[43]]: res[43]?.data.results, [responseName[44]]: res[44]?.data.results,
                    [responseName[45]]: res[45]?.data.results, [responseName[46]]: res[46]?.data.results,
                    [responseName[47]]: res[47]?.data.results, [responseName[48]]: res[48]?.data.results,
                    [responseName[49]]: res[49]?.data.results, [responseName[50]]: res[50]?.data.results,
                }
                let genreLabels = {
                    [responseName[51]]: res[51]?.data.genres,
                    [responseName[52]]: res[52]?.data.genres,
                }

                console.log({ movies, tv, genreLabels });
                // console.log(res);
                setAllData({ movies, tv, genreLabels });
                setLoading(false);

            })).catch(errors => {
                // console.log("Error", errors)
            })

    }

    useEffect(() => {
        getData();
    }, [])

    return { load, allData };
}









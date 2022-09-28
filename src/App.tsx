import { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAxiosGetAll } from './helper_function/useAxios';

import Nav from './components/L.components/Nav';
import Home from './pages/Home';
import TvShows from "./pages/TvShows";
import Movies from "./pages/Movies"
import NewPopular from "./pages/NewAndPopular";
import MyList from "./pages/MyList"
import BrowseByLanguage from "./pages/BrowseByLanguage";
import CustomGenre from "./pages/CustomGenre";
import Preview from './components/L.components/Preview';
import Footer from './components/Footer';
import FrontPage from './pages/FrontPage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import ExploreAllList from './components/L.components/ExploreAllList';

//Types
type data = {
  homePageData: any[],
  tvPageData: any[],
  moviePageData: any[]
  popularPageData: any[]
  searchList: any[]
}

type Filter = {
  filterType: "general" | "language",
  sortOption: 0 | 1 | 2 | 3,
  genreOption: string,
  // genreOption: false | string,
  isMovie: boolean,
  // languageType?: "original" | "dubbing" | "subtitles",
  languageOption: string,
}

type likedShowsType = { type: "tv" | "movie", id: number, like: number, inList: boolean }[];

export const ContextFilter = createContext({
  updateFilter: Function(),
  filter: { filterType: "", genreOption: "", sortOption: 0, isMovie: false, languageOption: "" },
  updateViewMode: Function(), viewMode: ""
});

export const ContextGlobal = createContext({
  addToList: Function(),  //My list
  updatePreview: Function(), //Updates preview show
  updateLike: Function(), likedShows: [{ type: "tv", id: 434, like: 0, inList: false }], //Remembers liked, and added to my list shows
  playThis: Function(), //Plays the show - not implemented
  updateIsTileActive: Function(), isTileActive: false, //Whether a user has activated tile with mouse (or is active*). 
});

function App() {
  const { load, allData } = useAxiosGetAll(); // data.movies, data.tv, data.home
  const [sortedData, setSortedData] = useState<data | undefined>()

  const [myList, setMyList] = useState<any[]>([]); // MyList global access
  const [likedShows, setLikedShows] = useState<likedShowsType | []>([]) //array of liked shows global access

  const [preview, setPreview] = useState<[] | null>(null); //current preview global access
  const [isPreviewShowing, setPreviewShowing] = useState(false); //Preview toggle

  const [viewMode, setViewMode] = useState<"full" | "tiles">("full");
  const [filter, setFilter] = useState<Filter>({
    filterType: "general", genreOption: "",
    sortOption: 0, isMovie: false, languageOption: "English"
    // languageType: null,
  })
  const [isTileActive, setIsTileActive] = useState(false);

  const error = (e: ErrorEvent) => { console.log("We have an error", e) };

  //img errors 
  useEffect(() => {
    document.addEventListener("error", error)
    return () => document.removeEventListener("error", error)
  }, [])


  //Sorts data
  useEffect(() => {
    if (allData.tv) {
      let homePageData = [

        [allData.tv.popular, "Popular Tv Shows"],
        [allData.movies.popular, "Popular Movies"],
        [allData.tv.topRated, "Top Rated Tv"],
        [allData.tv.trendingToday, "Trending Today Tv"],
        [allData.tv.onTheAir, "On the air"],
        // allData.movies.trendingToday
        [allData.movies.nowPlaying, "Playing now "],
        [allData.movies.topRated, "Top Rated Movies"],
        [allData.tv.airingToday, "Playing Today TV"],
      ]

      let tvPageData = [
        [allData.tv.popular, "Popular"],
        [allData.tv.topRated, "Top Rated"],
        [allData.tv.trendingWeek, "Trending This Week"],
        [allData.tv.onTheAir, "On The Air"],

        //genres
        // allData.tv.tvGenres
        [allData.tv.tvGenres[0], "Action & Adventure"],
        [allData.tv.tvGenres[1], "Animation"],
        [allData.tv.tvGenres[2], "Comedy"],
        [allData.tv.tvGenres[3], "Crime"],
        [allData.tv.tvGenres[4], "Documentary"],
        [allData.tv.tvGenres[5], "Drama"],
        [allData.tv.tvGenres[6], "Family"],
        [allData.tv.tvGenres[7], "Kids"],
        // [allData.tv.tvGenres[8], "Mystery"],
        // [allData.tv.tvGenres[9], "News"],
        // [allData.tv.tvGenres[10], "Reality"],
        [allData.tv.tvGenres[11], "Sci-Fi & Fantasy"],
        // [allData.tv.tvGenres[12], "Soap"],
        // [allData.tv.tvGenres[13], "Talk"],
        // [allData.tv.tvGenres[14], "War & Politics"],
        [allData.tv.tvGenres[15], "Western"],
      ]


      let moviePageData = [
        [allData.movies.newThisYear, "New This Year"],
        [allData.movies.topRated, "Top Rated"],
        [allData.movies.nowPlaying, "Now Playing"],
        [allData.movies.trendingWeek, "Trending This Week"],

        //genres
        // allData.movies.movieGenres, 
        [allData.movies.movieGenres[0], "Action"],
        [allData.movies.movieGenres[1], "Adventure"],
        [allData.movies.movieGenres[2], "Animation"],
        // [allData.movies.movieGenres[3], "Comedy"],
        // [allData.movies.movieGenres[4], "Crime"],
        // [allData.movies.movieGenres[5], "Documentary"],
        // [allData.movies.movieGenres[6], "Drama"],
        [allData.movies.movieGenres[7], "Family"],
        [allData.movies.movieGenres[8], "Fantasy"],
        // [allData.movies.movieGenres[9], "History"],
        [allData.movies.movieGenres[10], "Horror"],
        // [allData.movies.movieGenres[11], "Music"],
        [allData.movies.movieGenres[12], "Mystery"],
        // [allData.movies.movieGenres[13], "Romance"],
        [allData.movies.movieGenres[14], "Science Fiction"],
        // [allData.movies.movieGenres[15], "TV Movie"],
        // [allData.movies.movieGenres[16], "Thriller"],
        [allData.movies.movieGenres[17], "War"],
        // [allData.movies.movieGenres[18], "Western"],

      ]

      let popularPageData = [
        [allData.movies.upcoming, "Up Coming Movies"],
        [allData.movies.popular, "Popular Movies"],
        [allData.movies.trendingWeek, "Trending This Week Movies"],
        [allData.tv.popular, "New This Year Movies"],
        [allData.tv.trendingWeek, "Popular Tv"],
        [allData.tv.newThisYear, "Trending This Week Tv"],
        [allData.movies.newThisYear, "New This Year Tv"],
      ]


      let searchList: any[] = [];
      for (var key in allData.movies) {
        if (allData.movies.hasOwnProperty(key)) {
          if (key == "latest" || key == "movieGenres" || key == "tvGenres") continue;
          else {
            //  searchList.push(allData.movies[key]);
            allData.movies[key].forEach((show: any) => searchList.push(show));
          }
        }
      }

      for (var key in allData.tv) {
        if (allData.tv.hasOwnProperty(key)) {
          if (key == "latest" || key == "movieGenres" || key == "tvGenres") continue;
          else {
            //  searchList.push(allData.tv[key]);
            allData.tv[key].forEach((show: any) => searchList.push(show));

          }
        }
      }

      // console.log(searchList)
      setSortedData({ homePageData, tvPageData, moviePageData, popularPageData, searchList })
    }

  }, [allData])

  const updateIsTileActive = (isActive: boolean) => setIsTileActive(isActive); //Toggle active tile
  const handlePreviewShowing = () => setPreviewShowing(false); //Toggle preview
  const playThis = (id: number, type: "tv" | "movie") => { } //Play this
  const updateViewMode = (mode: "full" | "tiles") => setViewMode(mode);   //View mode

  //Preview
  const updatePreview = (showData: []) => {
    console.log("Updating preview")
    setPreview(showData);
    setPreviewShowing(true);
  }

  //buttons
  const addToList = (data: any) => {
    let sameID = myList.find((show: { id: number }) => show.id == data.id);
    //Adding
    if (sameID === undefined) setMyList((myList: any) => [...myList, data])

    else if (sameID) {
      //removing
      let filteredList = myList.filter(show => {
        if (show.id !== data.id) return show;
      })
      setMyList(filteredList);
      setIsTileActive(false); //Resets global tile active indicator
    }
  }

  //updating like/add list status
  const updateLike = (id: number, type: "tv" | "movie", like: number, isInList: boolean) => {
    if (like === 0 && !isInList) {
      // console.log("removing");
      // console.log(like, isInList)

      //removing liked show
      const updatedShowList = likedShows.filter((show) => {
        if (!(show.id == id && show.type == type)) return show;
      })

      setLikedShows(updatedShowList);

    } else if (likedShows.find(show => (show.id == id && show.type == type))) {
      //changing liked show
      // console.log("exist")
      setLikedShows(current =>
        current.map(obj => {
          if (obj.id === id && obj.type === type) {
            return { ...obj, like: like, inList: isInList };
          }
          return obj;
        }),
      );



    } else {
      //Adding liked show to list
      // console.log("adding");
      setLikedShows(current => [
        ...current, { type: type, id: id, like: like, inList: isInList }
      ])
    }

  }

  const updateFilter = (
    filterName: "genreOption" | "sortOption" | "isMovie" | "filterType" | "languageTypeOption" | "languageOption",
    value: any) => {
    // console.log(filterName, value)
    setFilter({
      ...filter,
      [filterName]: value
    })
  }


  return (
    <>
      <div className='content-wrap'>
        {preview !== null &&
          <ContextGlobal.Provider value={{ updatePreview, addToList, updateLike, likedShows, playThis, updateIsTileActive, isTileActive }}>
            <Preview
              data={preview}
              isShowing={isPreviewShowing}
              closePreview={handlePreviewShowing}
              // updatePreview={updatePreview}
              playThis={playThis}
              addToList={addToList}
              updateLike={updateLike} />
          </ContextGlobal.Provider>
        }

        <BrowserRouter>
          <Routes>

            <Route index element={
              <FrontPage />
            } />

            <Route path='/login' element={
              <LoginPage />
            } />

            <Route path="/" element={
              <ContextFilter.Provider value={{ updateFilter, filter, updateViewMode, viewMode }}>
                <Nav tvGenres={allData.genreLabels?.tvGenres} movieGenres={allData.genreLabels?.movieGenres} updateFilter={updateFilter} updateViewMode={updateViewMode} />
              </ContextFilter.Provider>
            }>

              <Route path="browse" element={
                <ContextGlobal.Provider value={{ updatePreview, addToList, updateLike, likedShows, playThis, updateIsTileActive, isTileActive }}>
                  <Home showsData={sortedData?.homePageData ? sortedData.homePageData : []} />
                </ContextGlobal.Provider>}>

                <Route path='list/:listname' element={<ExploreAllList allData={sortedData} />} />
              </Route>


              <Route path="tv" element={
                <ContextGlobal.Provider value={{ updatePreview, addToList, updateLike, likedShows, playThis, updateIsTileActive, isTileActive }}>
                  <TvShows showsData={sortedData?.tvPageData ? sortedData.tvPageData : []} viewMode={viewMode} filter={filter} />
                </ContextGlobal.Provider>}>

                <Route path='list/:listname' element={<ExploreAllList allData={sortedData} />} />
              </Route>

              <Route path="tv/genres/:genreId" element={
                <ContextGlobal.Provider value={{ updatePreview, addToList, updateLike, likedShows, playThis, updateIsTileActive, isTileActive }}>
                  <CustomGenre viewMode={viewMode} filter={filter} />
                </ContextGlobal.Provider>
              } />

              <Route path="movies" element={
                <ContextGlobal.Provider value={{ updatePreview, addToList, updateLike, likedShows, playThis, updateIsTileActive, isTileActive }}>
                  <Movies
                    showsData={sortedData?.moviePageData ? sortedData.moviePageData : []} viewMode={viewMode} filter={filter} />
                </ContextGlobal.Provider>}>

                <Route path='list/:listname' element={<ExploreAllList allData={sortedData} />} />
              </Route>

              <Route path="movies/genres/:genreId" element={
                <ContextGlobal.Provider value={{ updatePreview, addToList, updateLike, likedShows, playThis, updateIsTileActive, isTileActive }}>
                  <CustomGenre viewMode={viewMode} filter={filter} />
                </ContextGlobal.Provider>
              } />


              <Route path="new-popular" element={
                <ContextGlobal.Provider value={{ updatePreview, addToList, updateLike, likedShows, playThis, updateIsTileActive, isTileActive }}>
                  <NewPopular showsData={sortedData?.popularPageData ? sortedData.popularPageData : []} />
                </ContextGlobal.Provider>
              } />

              <Route path="my-list" element={
                <ContextGlobal.Provider value={{ updatePreview, addToList, updateLike, likedShows, playThis, updateIsTileActive, isTileActive }}>
                  <MyList myList={myList} />
                </ContextGlobal.Provider>
              } />

              <Route path="browse-by-language" element={
                <ContextGlobal.Provider value={{ updatePreview, addToList, updateLike, likedShows, playThis, updateIsTileActive, isTileActive }}>
                  <BrowseByLanguage filter={filter} />
                </ContextGlobal.Provider>
              } />

              <Route path="search/:query" element={
                <ContextGlobal.Provider value={{ updatePreview, addToList, updateLike, likedShows, playThis, updateIsTileActive, isTileActive }}>
                  <SearchPage allData={sortedData?.searchList ? sortedData.searchList : []} />
                </ContextGlobal.Provider>
              } />

            </Route>
          </Routes>
        </BrowserRouter>

      </div>
      <Footer />
    </>
  );
}

export default App;
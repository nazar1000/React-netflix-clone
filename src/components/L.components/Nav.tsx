import './nav.scss'
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import netflix_logo from '../../icons/netflixLogo.png'
import bell from '../../icons/bell.png'
import left_alight from '../../icons/left_alight.png'
import pen from '../../icons/pen.png'
import plus from '../../icons/plus.png'
import question from '../../icons/question.png'
import search from '../../icons/search.png'
import user from '../../icons/user.png'
import GenreFilter from './NavSub';


type NavProps = {
    movieGenres: any
    tvGenres: any
    updateFilter: Function
    updateViewMode: Function
}

function Nav(props: NavProps) {
    const [scrolled, setScrolled] = useState(false);
    const [headerPosition, setHeaderPosition] = useState({});

    const [isSearchActive, setSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [lastLocation, setLastLocation] = useState("");

    const navigate = useNavigate();
    let location = useLocation();

    const updateSearchValue = (value: string) => {
        setSearchValue(value);
    }

    useEffect(() => {
        let search = document.getElementById("search-input");
        search?.focus();
        const blur = () => { if (!location.pathname.includes("search") && searchValue === "") setSearchActive(false) };
        if (search !== null) search.addEventListener("blur", blur);

        return () => search?.removeEventListener("blur", blur);
    }, [isSearchActive, location.pathname])

    useEffect(() => {
        {/* <Link to={`/genres/${genre.id}`}>{genre.name}</Link> */ }

        if (searchValue !== "") {
            navigate(`/search/${searchValue}`);
            if (!location.pathname.includes("search")) setLastLocation(location.pathname)
        }

        else if (searchValue === "" && lastLocation !== "") {
            navigate(lastLocation);
        }

        // console.log(location)
    }, [searchValue])

    //Change status used to change bg of nav bar whenever user scrolls.
    useEffect(() => {
        //Setting navigation position based on the page]
        if (location.pathname == "/tv" || location.pathname == "/movie") {
            setHeaderPosition({ position: "absolute" })
        } else setHeaderPosition({ position: "fixed" })

        const handleScroll = () => {
            // console.log(location);

            if (window.scrollY > 5) {
                //     //settingBackground
                setScrolled(true);

                if (location.pathname == "/tv" || location.pathname == "/movies") {
                    // console.log("In");
                    if (window.scrollY >= 70) {
                        setHeaderPosition({ position: "fixed", top: "-70px" })
                    } else setHeaderPosition({ position: "absolute" });
                } else setHeaderPosition({ position: "fixed" });
            } else setScrolled(false);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    useEffect(() => {
        props.updateViewMode("full");
    }, [location.pathname])


    const searchDivActiveStyle = {
        border: "1px solid white",
        backgroundColor: "rgba(0, 0, 0, 0.767)",
    }

    const searchDivOffStyle = {
        border: "none",
        backgroundColor: "transparent",
    }

    const searchInputActiveStyle = {
        width: "150px",
        transition: "width 1s",

    }

    const searchInputOffStyle = {
        width: "0",
        transition: "width 0s",

    }


    return (
        <>
            <div className="pinned-header" style={headerPosition}>
                <div className='pinned-header-container'>
                    <div className={scrolled ? 'menu-navigation nav-bg' : 'menu-navigation'}>

                        <div className='logo'>
                            <img src={netflix_logo}></img>
                        </div>

                        <ul className="primary-navigation">
                            <li className='mobile-menu-container'>
                                <button className='mobile-menu-button'>Browse
                                    <div className='mobile-menu-dropdown'>
                                        <ul>
                                            <li className={location.pathname == "/browse" ? "mobile-nav-tab bold" : "mobile-nav-tab"}><Link to="/browse">Home</Link></li>
                                            <li className={location.pathname == "/tv" ? "mobile-nav-tab bold" : "mobile-nav-tab"} onClick={() => props.updateFilter("isMovies", false)}><Link to="/tv">Tv shows</Link></li>
                                            <li className={location.pathname == "/movies" ? "mobile-nav-tab bold" : "mobile-nav-tab"} onClick={() => props.updateFilter("isMovies", true)}><Link to="/movies">Movies</Link></li>
                                            <li className={location.pathname == "/new-popular" ? "mobile-nav-tab bold" : "mobile-nav-tab"}><Link to="/new-popular">New & Popular</Link></li>
                                            <li className={location.pathname == "/my-list" ? "mobile-nav-tab bold" : "mobile-nav-tab"}><Link to="/my-list">My List</Link></li>
                                            <li className={location.pathname == "/browse-by-language" ? "mobile-nav-tab bold" : "mobile-nav-tab"}><Link to="/browse-by-language">Browse By Language</Link></li>

                                        </ul>
                                    </div>
                                </button>

                            </li>

                            <li className={location.pathname == "/browse" ? "nav-tab bold" : "nav-tab"}><Link to="/browse">Home</Link></li>
                            <li className={location.pathname == "/tv" ? "nav-tab bold" : "nav-tab"} onClick={() => props.updateFilter("isMovies", false)}><Link to="/tv">Tv shows</Link></li>
                            <li className={location.pathname == "/movies" ? "nav-tab bold" : "nav-tab"} onClick={() => props.updateFilter("isMovies", true)}><Link to="/movies">Movies</Link></li>
                            <li className={location.pathname == "/new-popular" ? "nav-tab bold" : "nav-tab"}><Link to="/new-popular">New & Popular</Link></li>
                            <li className={location.pathname == "/my-list" ? "nav-tab bold" : "nav-tab"}><Link to="/my-list">My List</Link></li>
                            <li className={location.pathname == "/browse-by-language" ? "nav-tab bold" : "nav-tab"}><Link to="/browse-by-language">Browse By Language</Link></li>
                        </ul>

                        <div className="secondary-navigation">
                            <div className='secondary-tab'>
                                <div className="global-search" style={isSearchActive ? searchDivActiveStyle : searchDivOffStyle}>
                                    <img src={search} alt="Search" onClick={() => setSearchActive(!isSearchActive)}></img>
                                    <input id='search-input' type="text" style={isSearchActive ? searchInputActiveStyle : searchInputOffStyle} onChange={(e) => updateSearchValue(e.target.value)} value={searchValue} />
                                </div>
                            </div>
                            <div className="secondary-tab">
                                <a id='kids-link' href="#">Kids</a>
                            </div>
                            <div className="secondary-tab">
                                <div className="notifications">
                                    <img src={bell} alt="Notifications"></img>
                                    <div className="notifications__dropdown"> </div>
                                </div>
                            </div>
                            <div className="secondary-tab">
                                <div className="account-settings">
                                    <button className="account-settings-button">
                                        <img src={user} alt="Accounts settings"></img>

                                        <div className="account-settings-dropdown">
                                            <ul className="account-settings__list">
                                                {/* Map users */}
                                                <li>
                                                    <div className="tab">
                                                        <img src={user} alt="Profile image"></img>
                                                        <a>Naz</a>
                                                    </div>
                                                </li>

                                            </ul>
                                            <ul className="account-settings__list">

                                                <li>
                                                    <div className="tab">
                                                        <img src={pen} alt="Manage profiles"></img>
                                                        <a>Manage profiles</a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="tab">
                                                        <img src={user} alt="Account"></img>
                                                        <a>Account</a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="tab">
                                                        <img src={question} alt="Help Center"></img>
                                                        <a>Help Center</a>
                                                    </div>
                                                </li>
                                            </ul>

                                            <ul className="account-settings__list">
                                                <li>
                                                    <div className="tab">

                                                        <a id='sign-out-button'>Sign out of Netflix</a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {(location.pathname.includes("/tv") ||
                        location.pathname.includes("/movies") ||
                        location.pathname.includes("/my-list") ||
                        location.pathname.includes("/browse-by-language")
                    ) &&
                        <GenreFilter movieGenres={props.movieGenres} tvGenres={props.tvGenres} isScrolled={scrolled} />
                    }


                    {/* {location.pathname == "/tv" && <h1>This is TV</h1>} */}
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Nav;
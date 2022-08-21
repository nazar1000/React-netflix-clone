import React, { useEffect, useState } from 'react';
import './nav.scss'

function Nav(props: { activePage: string, updateActivePage: (newPageName: string) => void }) {
    const [pagesList, setPagesList] = useState([
        "Home", "Tv Shows", "Movies", "New & Popular", "My List", "Browse by Language"])
    const [scrolled, setScrolled] = useState(false);
    // "build": "react-scripts build",


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) setScrolled(true);
            else setScrolled(false);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div className="pinned-header">
            <div className='pinned-header-container'>
                <div className={scrolled ? 'menu-navigation nav-bg' : 'menu-navigation'}>

                    <div className='logo'>
                        <img src={require('../icons/Netflix_Logo.png')}></img>
                    </div>

                    <ul className="primary-navigation">
                        <li className='mobile-menu-container'>
                            <button className='mobile-menu-button'>Browse
                                <div className='mobile-menu-dropdown'>

                                    <ul>
                                        {pagesList.map((pageName) => {
                                            return (
                                                <li key={pageName} className='mobile-nav-tab'>
                                                    <a className={props.activePage === pageName.toLocaleLowerCase() ? "active-nav" : ""}
                                                        onClick={() => props.updateActivePage(pageName)}
                                                    >{pageName}</a>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </button>

                        </li>
                        {pagesList.map((pageName) => {

                            return (
                                <li key={pageName} className='nav-tab'>
                                    <a className={props.activePage === pageName.toLocaleLowerCase() ? "active-nav" : ""}
                                        onClick={() => props.updateActivePage(pageName)}
                                    >{pageName}</a>
                                </li>
                            )
                        })}
                    </ul>

                    <div className="secondary-navigation">
                        <div className='secondary-tab'>
                            <div className="global-search">
                                <img src={require('../icons/search.png')} alt="Search"></img>
                            </div>
                        </div>
                        <div className="secondary-tab">
                            <a id='kids-link' href="#">Kids</a>
                        </div>
                        <div className="secondary-tab">
                            <div className="notifications">
                                <img src={require('../icons/bell.png')} alt="Notifications"></img>
                                <div className="notifications__dropdown"> </div>
                            </div>
                        </div>

                        <div className="secondary-tab">
                            <div className="account-settings">
                                <button className="account-settings-button">
                                    <img src={require('../icons/user.png')} alt="Accounts settings"></img>

                                    <div className="account-settings-dropdown">
                                        <ul className="account-settings__list">
                                            {/* Map users */}
                                            <li>
                                                <div className="tab">
                                                    <img src={require('../icons/user.png')} alt="Profile image"></img>
                                                    <a>Naz</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="tab">
                                                    <img src={require('../icons/pen.png')} alt="Manage profiles"></img>
                                                    <a>Manage profiles</a>
                                                </div>
                                            </li>
                                        </ul>
                                        <ul className="account-settings__list">
                                            <li>
                                                <div className="tab">
                                                    <img src={require('../icons/user.png')} alt="Account"></img>
                                                    <a>Account</a>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="tab">
                                                    <img src={require('../icons/question.png')} alt="Help Center"></img>
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
            </div>


        </div>

    )
}

export default Nav;
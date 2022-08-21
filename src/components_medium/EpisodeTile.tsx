import React from "react"

function EpisodeTile(props: []) {

    //Needs episode no, img, name, episode desc, duration


    return (
        <div className="episode-tile">
            <h2>No 1</h2>
            <div className="episode-image">
                <img></img>
            </div>
            <div className="episode-description">
                <div className="episode-name">
                    <h2>Name of episode</h2>
                    <h2>24m</h2>
                </div>
            </div>
        </div>
    )
}

export default EpisodeTile
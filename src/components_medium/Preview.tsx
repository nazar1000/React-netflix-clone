import { useState } from "react";
import React from "react"
import EpisodeTile from "./EpisodeTile";
import RecommendationTile from "./RecommendationTile";


function Preview(props: []) {
    const [collections, setCollections] = useState();
    const [similar, setSimilar] = useState();



    return (
        <div className="preview-container">
            <div className="bg-image">
                <img></img>
                <div className="preview-options">
                    <button>Play</button>
                    <button>Add</button>
                    <button>Like</button>
                </div>
            </div>

            <div className="preview-info">
                <div className="show-features">
                    <label>96% Match ect, PG 32</label>
                    <div className="show-info">info</div>
                    <div className="show-extra-info">
                        <label>Case, Genres, rating?</label>
                    </div>
                </div>

                <div className="Episode-list">
                    <div className="legend">
                        <h2>Episodes</h2>
                        <button>Season change</button>
                    </div>

                    {/* <EpisodeTile></EpisodeTile> */}
                </div>
                <div className="collections-container">
                    {/* Other movies/shows like this */}
                    <RecommendationTile></RecommendationTile>
                </div>
                <div className="similar-container">
                    <h1>More Like This</h1>
                    {/* Other movies/shows like this */}
                    <RecommendationTile></RecommendationTile>
                </div>

                <div className="about">
                    <h3>Creators:</h3>
                    <h3>Cast:</h3>
                    <h3>Genres:</h3>
                    <h3>This show is:</h3>
                    <h3>Maturity rating:</h3>
                </div>
            </div>



        </div>


    )
}
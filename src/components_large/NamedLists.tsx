import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import List from "../components_medium/List"

import "../components_medium/list.scss"


type namedListsProps = {
    type: "movies" | "tv" | "both"
    showList: any
}

function NamedLists(props: namedListsProps) {

    return (

        <div className="named-list-div">
            {props.type == "both" &&
                <>
                    <List listName="Trending Today" showList={props.showList.trendingToday} />
                    <List listName="Trending Today" showList={props.showList.trendingThisWeek} />
                    <List listName="Trending Today" showList={props.showList.releasedThisYearMovies} />
                    <List listName="Trending Today" showList={props.showList.releasedThisYearTv} />
                </>
            }

            {props.type == "movies" &&
                <>
                    <List listName="Trending Today" showList={props.showList.popularMovies} />
                    <List listName="Trending Today" showList={props.showList.topRatedMovies} />
                    <List listName="Trending Today" showList={props.showList.releasedThisYearMovies} />
                </>
            }

            {props.type == "tv" &&
                <>
                    <List listName="Trending Today" showList={props.showList.popularTv} />
                    <List listName="Trending Today" showList={props.showList.topRatedTv} />
                    <List listName="Trending Today" showList={props.showList.releasedThisYearTv} />
                </>
            }


        </div>





    )

}

export default NamedLists;
import "./button.scss"
import { useContext, useEffect, useState } from "react";
import { ContextGlobal } from "../App";
import add from "../icons/add.png";
import info from "../icons/info.png";
import like from "../icons/like.png";
import like_fill from "../icons/like-filled.png";
import dislike from "../icons/dislike.png";
import dislike_fill from "../icons/dislike-filled.png";
import likePlus from "../icons/likeplus.png";
import likePlus_fill from "../icons/likeplus-filled.png";
import play from "../icons/play.png";
import tick from "../icons/tick.png";

type ButtonProps = {
    type: "play" | "info" | "add" | "like" // type of button
    shape: "round" | "text", //shape of button
    text?: "Play" | "More Info", //button text
    data: any, //button data
}

function Button(props: ButtonProps) {
    const { addToList, updatePreview, playThis, updateLike, likedShows } = useContext(ContextGlobal);

    const showType = props.data?.seasons ? "tv" : "movie";
    const [likeStatus, setLikeStatus] = useState(0); //Local like status
    const [isInMyList, setIsInMyList] = useState(false); //Local "my list" status

    useEffect(() => {
        //Checking if show was liked
        let entryFound = likedShows.filter((show) => {
            if (show.type == showType && show.id == props.data.id) return show;
        })

        if (entryFound.length === 0) setLikeStatus(0);
        else {
            setLikeStatus(entryFound[0].like);
            setIsInMyList(entryFound[0].inList);
        }

    }, [likedShows])

    const handleClick = () => {
        if (props.type === "play") {
            // playThis()

        } else if (props.type === "info") {
            updatePreview(props.data);

        } else if (props.type === "add") {
            addToList(props.data);
            handleLikeChange(likeStatus, !isInMyList)
            setIsInMyList(!isInMyList)
        }
    }

    //Button styles
    const getNewButtonClass = () => {
        let styleClass = ""

        if (props.type == "play" && props.shape == "text") {
            styleClass = "play-button--text";
        } else if (props.type == "info" && props.shape == "text") {
            styleClass = "info-button--text";

        } else if (props.type == "play" && props.shape == "round") {
            styleClass = "play-button--round";
        } else if (props.type == "info" && props.shape == "round") {
            styleClass = "info-button--round";
        } else if (props.type == "add" && props.shape == "round") {
            styleClass = "add-button--round";
        } else if (props.type == "like" && props.shape == "round") {
            styleClass = "like-button--round";
        }

        return styleClass;
    }

    const handleLikeChange = (like: number, inList: boolean) => {
        if (props.data && props.data.id) {

            if (likeStatus === like && inList === isInMyList) {
                updateLike(props.data.id, showType, 0, inList) //default 
                setLikeStatus(0);

            } else {
                updateLike(props.data.id, showType, like, inList) //default
                setLikeStatus(like);
            }
        }
    }

    return (
        <>
            <button className={getNewButtonClass()} onClick={() => handleClick()}>
                {props.type != "like" &&
                    <>
                        {/* button img */}
                        <div className="button-image" >
                            {props.type == "play" && <img src={play}></img>}
                            {props.type == "info" && props.shape == "text" && <img src={info}></img>}
                            {props.type == "add" && <img src={isInMyList ? tick : add}></img>}
                            {props.type == "info" && props.shape == "round" && <span className="arrow-down"></span>}
                        </div>

                        {/* button extras */}
                        {props.shape == "text" ? <h1>{props.text}</h1> : ""}
                        {props.type == "add" &&
                            <>
                                {isInMyList && <span className="tool-tip-text">Remove From List</span>}
                                {!isInMyList && <span className="tool-tip-text">Add to My List</span>}
                            </>
                        }
                        {props.type == "info" && props.shape == "round" && <span className="tool-tip-text">Show more</span>}

                    </>
                }

                {/* Like button with dropdown*/}
                {props.type == "like" &&
                    <>
                        <div className="button-image">
                            {/* Like status */}
                            {likeStatus === 0 && <img src={like}></img>}
                            {likeStatus === 1 && <img src={dislike_fill}></img>}
                            {likeStatus === 2 && <img src={like_fill}></img>}
                            {likeStatus === 3 && <img src={likePlus_fill}></img>}

                        </div>

                        {/* button dropdown*/}
                        <div className="like-dropdown">
                            <div className="like-buttons" onClick={() => handleLikeChange(1, isInMyList)}>
                                <div className="button-image" >
                                    <img src={likeStatus === 1 ? dislike_fill : dislike} />
                                </div>
                                <span className="tool-tip-text">Not for me</span>
                            </div>
                            <div className="like-buttons" onClick={() => handleLikeChange(2, isInMyList)}>
                                <div className="button-image" >
                                    <img src={likeStatus === 2 ? like_fill : like} />
                                </div>
                                <span className="tool-tip-text">I like this</span>
                            </div>
                            <div className="like-buttons" onClick={() => handleLikeChange(3, isInMyList)}>
                                <div className="button-image">
                                    <img src={likeStatus === 3 ? likePlus_fill : likePlus} />
                                </div>
                                <span className="tool-tip-text">Love this!</span>
                            </div>
                        </div>
                    </>
                }


            </button>


        </>
    )
}

export default Button
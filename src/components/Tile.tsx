import "./tile.scss"
import { CSSProperties, useContext, useEffect, useState } from "react";
import { ContextGlobal } from "../App";
import { getGenreName } from "../helper_function/helper";
import Button from "./Button";

type TileProps = {
    customStyle?: {},
    data: any
}

function Tile(props: TileProps) {
    const { isTileActive, updateIsTileActive } = useContext(ContextGlobal); //Global tile settings, only one tile should play at the time
    const type = props.data?.name ? "tv" : "movie";
    const [hoverAnimation, setHoverAnimation] = useState<CSSProperties>({}) //animation style
    const [isOpen, setIsOpen] = useState(false); //tile preview is fully open
    const [animationName, setAnimationName] = useState(""); //name of animation used

    const [isAnimating, setIsAnimating] = useState(false); //tile preview opening is in progress
    const [shouldClose, setShouldClose] = useState(false); // tile preview should close
    const [isNext, setIsNext] = useState<React.MouseEvent<HTMLDivElement, MouseEvent> | undefined>();


    //Sets this tile to animate 
    useEffect(() => {
        if (isNext && !isTileActive) {
            // openPreview("enter", isNext);
            startAnimation("enter", isNext);
            setIsNext(undefined);
        }

    }, [isNext, isTileActive])

    //When opening animation, delay and status change
    useEffect(() => {
        let animationOpenTimer: ReturnType<typeof setTimeout>;

        if (isAnimating) {
            animationOpenTimer = setTimeout(() => { //animation starts
                setIsAnimating(false); //animation is off
                setIsOpen(true); //tile preview is fully open
            }, 500)
        }

        return () => clearTimeout(animationOpenTimer);
    }, [isAnimating])

    //When closing animation, delay and status change
    useEffect(() => {
        let animationCloseTimer: ReturnType<typeof setTimeout>;

        if (shouldClose && isOpen) {
            startClosingAnimation();
            animationCloseTimer = setTimeout(() => { //animation starts
                setShouldClose(false);
                setIsOpen(false);
                updateIsTileActive(false);
                setHoverAnimation({
                    display: "none"
                });

            }, 250)
        }
        return () => clearTimeout(animationCloseTimer);
    }, [isOpen, shouldClose])

    const startAnimation = (type: "enter" | "exit", event: any): void => {
        if (type === "exit" && (isAnimating || isOpen)) setShouldClose(true); // If on mouse out trigger
        if (type === "enter" && !isOpen && !shouldClose && !isTileActive) {

            //Target tile, checks location of the tile in relation to margins of the site, and picks the right animation
            let element = event.target.getBoundingClientRect();
            let isLeft = element.x < 100;
            let isRight = window.innerWidth - (element.x + element.width) < 100

            let newAnimationName: string;
            if (isLeft) newAnimationName = "tile-expand-left";
            else if (isRight) newAnimationName = "tile-expand-right";
            else newAnimationName = "tile-expand-center"
            setAnimationName(newAnimationName) // for the purpose of reverse animation

            //animation delay
            setTimeout(() => {
                setHoverAnimation({
                    animationName: type == "enter" ? newAnimationName : (newAnimationName + "-reverse"),
                    // animationDelay: ".1s",
                    display: "block"
                })

            }, 300);
            setIsAnimating(true);
            updateIsTileActive(true);
        }
    }

    const startClosingAnimation = () => {
        setHoverAnimation({
            animationName: (animationName + "-reverse"),
            animationFillMode: "forwards",
            animationDirection: "normal",
            display: "block"
        })
    }

    return (
        <div className="card" style={props?.customStyle}
            onMouseOver={(e) => { startAnimation("enter", e) }}
            onMouseEnter={(e) => { if (isTileActive) setIsNext(e) }}
            onMouseLeave={(e) => { if (isNext) setIsNext(undefined); if (isAnimating) startAnimation("exit", e) }}>

            <div className="card__image">
                <img src={"https://image.tmdb.org/t/p/w300" + (props.data.backdrop_path ? props.data.backdrop_path : props.data.poster_path)} alt="" />
                <h1>{type == "movie" ? props.data.title : props.data.name}</h1>
            </div>

            <div className="card__preview" style={hoverAnimation} onMouseLeave={(e) => startAnimation("exit", e)}>
                <img src={"https://image.tmdb.org/t/p/w500" + (props.data.backdrop_path ? props.data.backdrop_path : props.data.poster_path)} alt="" />

                <div className="card__preview__info">
                    <div className="tile-buttons">
                        <div>
                            <Button type="play" shape="round" data={props.data} />
                            <Button type="add" shape="round" data={props.data} />
                            <Button type="like" shape="round" data={props.data} />
                        </div>
                        <Button type="info" shape="round" data={props.data} />
                    </div>
                    <div>
                        <div>Show infos</div>
                        <div>
                            {props?.data.genre_ids && props.data.genre_ids.map((genre: any, index: number) => {

                                return <span key={index}>{getGenreName(genre, type)} <span style={{ color: "grey" }}>&bull;</span> </span>
                            })
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Tile;

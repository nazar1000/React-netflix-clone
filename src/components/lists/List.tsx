import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Tile from "../Tile";

type ListProps = {
    listName: string,
    showList: any;
    id: number;
    loadID: number;
    exploreAllLink?: number;
}

const List = (props: ListProps) => {
    const [pageNo, setPageNo] = useState(0);
    const [imgWidth, setImgWidth] = useState({ "width": 100, "height": 0, "margin": 10 })
    const [sliderPosition, setSliderPosition] = useState({ "marginLeft": 0 })

    const [arrowsOffset, setArrowsOffset] = useState(0);
    const [windowWidth, setWindowWidth] = useState((window.innerWidth - 17) - window.innerWidth * 0.05); //window is 80%
    const imgMargin = 5;

    const navigate = useNavigate();

    useEffect(() => {
        setSlider();
    }, [])

    useEffect(() => {
        window.addEventListener("resize", () => {
            setSlider()
            console.log("resizing")
        })
        return window.removeEventListener('resize', setSlider)
    }, [])

    //Adjust image slide based on screen
    const setSlider = () => {
        let windowWidth = (window.innerWidth - 17) - window.innerWidth * 0.05; //window is 95%
        let margin = Math.floor(window.innerWidth * 0.05) / 2;

        setArrowsOffset(-margin) // Margin for negative absolute position
        setWindowWidth(windowWidth)

        let imgNo;
        if (windowWidth < 400) imgNo = 2;
        else if (windowWidth < 800) imgNo = 3;
        else if (windowWidth < 1100) imgNo = 4;
        else if (windowWidth < 1400) imgNo = 5;
        else imgNo = 6;

        let itemWidth = (windowWidth / imgNo) - imgMargin * 2;
        let itemHeight = itemWidth / 1.7;  //aspect-ratio: 3/1.7; CSS hardcoded ratio

        setImgWidth({ "width": itemWidth, "height": itemHeight, "margin": imgMargin });
        setPageNo(0); //Resetting positions
    }

    const slideForward = () => {
        let sliderLength = (imgWidth.width + imgMargin * 2) * 12 //props.showList.length; //How many images
        let newMarginLeft;

        if ((pageNo + 1) * windowWidth >= sliderLength) {
            newMarginLeft = 0 // go back to 0
            setPageNo(0);
        } else {
            setPageNo(pageNo + 1)
            newMarginLeft = (pageNo + 1) * windowWidth;
        }

        setSliderPosition({ "marginLeft": -newMarginLeft })
    }

    const slideBack = () => {
        let sliderLength = (imgWidth.width + imgMargin * 2) * props.showList.length;
        let newMarginLeft;

        if ((pageNo - 1) < 0) {
            newMarginLeft = Math.floor(sliderLength / windowWidth) * windowWidth;
            setPageNo(Math.floor(sliderLength / windowWidth));
        } else {
            setPageNo(pageNo - 1)
            newMarginLeft = (pageNo - 1) * windowWidth;
        }

        setSliderPosition({ "marginLeft": -newMarginLeft })
    }

    return (
        <div className="list" style={{ width: windowWidth }}>
            {props.loadID > props.id &&
                <>
                    <div className="list__header">
                        <div className="header__title">
                            <h1 onClick={() => { if (props.exploreAllLink !== undefined) navigate(`list/${props.exploreAllLink}`) }}>{props.listName}</h1>

                            {props.exploreAllLink !== undefined &&
                                <div className="expanding-link" onClick={() => navigate(`list/${props.exploreAllLink}`)}>
                                    <a>Explore All</a>
                                    <div id="title-arrow" className="title-arrow"></div>
                                </div>
                            }
                            <div className="slider-indicator">
                            </div>
                        </div>
                    </div>

                    <div className="list__content">
                        <div className="content-inner" style={sliderPosition}>

                            <div className="left-arrow-div arrow-toggle" style={{ height: imgWidth.height, left: arrowsOffset }} onClick={() => slideBack()}>
                                <div className="arrow"></div>
                            </div>
                            <div className="right-arrow-div arrow-toggle" style={{ height: imgWidth.height, right: arrowsOffset }} onClick={() => slideForward()}>
                                <div className="arrow"></div>
                            </div>


                            {props.showList != undefined && props.loadID >= props.id && props.showList.map((show: any, index: number) => {
                                if (index > 12) return;
                                return (
                                    <Tile key={show.id}
                                        customStyle={imgWidth}
                                        data={show} />
                                )
                            })}

                        </div>
                    </div>
                </>
            }
        </div>

    )
}

export default List
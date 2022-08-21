import React, { useEffect, useState } from "react"

type ListProps = {
    listName: string,
    showList: any;
}

const List = (props: ListProps) => {
    const [pageNo, setPageNo] = useState(0);
    const [imgWidth, setImgWidth] = useState({ "width": 100, "height": 0, "margin": 10 })
    const [sliderPosition, setSliderPosition] = useState({ "marginLeft": 0 })
    const [imgHeight, setImgHeight] = useState(0)

    const imgMargin = 5;
    const windowWidth = window.innerWidth - 17;

    useEffect(() => {
        setSlider();
    }, [])

    useEffect(() => {
        // window.addEventListener("resize", () => setSlider())
        // return window.removeEventListener('resize', setSlider)
    })


    //Adjust image slide based on screen
    const setSlider = () => {
        let imgNo;

        if (windowWidth < 500) imgNo = 2;
        else if (windowWidth < 800) imgNo = 3;
        else if (windowWidth < 1100) imgNo = 4;
        else if (windowWidth < 1400) imgNo = 5;
        else imgNo = 6;

        let itemWidth = (windowWidth / imgNo) - imgMargin * 2;
        // itemWidth = itemWidth - (itemWidth + imgMargin * 2) % imgNo;

        //aspect-ratio: 3/1.7; CSS hardcoded ratio
        let itemHeight = itemWidth / 1.7;
        setImgWidth({ "width": itemWidth, "height": itemHeight, "margin": imgMargin });
        console.log(windowWidth)

        //Resetting positions
        setPageNo(0);


    }

    const slideForward = () => {
        let sliderLength = (imgWidth.width + imgMargin * 2) * props.showList.length;
        let newMarginLeft;

        if ((pageNo + 1) * windowWidth >= sliderLength) {
            newMarginLeft = 0 // go back to 0
            setPageNo(0);
        }
        else {
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
        }
        else {
            setPageNo(pageNo - 1)
            newMarginLeft = (pageNo - 1) * windowWidth;
        }

        setSliderPosition({ "marginLeft": -newMarginLeft })
    }


    return (
        <div className="list-div">
            {/* <button onClick={() => setSlider()}>Resize</button> */}
            {/* <button onClick={() => slideForward()}>Go forward</button>
            <button onClick={() => slideBack()}>Go back</button> */}
            <div className="list-div__header-div">
                <h1>{props.listName}</h1>
                <div className="slider-indicator">
                </div>
            </div>

            <div className="list-div__show-list-div">
                <div className="show-list-div__internal-div" style={sliderPosition}>


                    <div className="left-arrow-div arrow-toggle" style={{ height: imgWidth.height }} onClick={() => slideBack()}>
                        <div className="arrow"></div>
                    </div>
                    <div className="right-arrow-div arrow-toggle" style={{ height: imgWidth.height }} onClick={() => slideForward()}>
                        <div className="arrow"></div>
                    </div>


                    {/* Episodes here */}

                    {props.showList != undefined && props.showList.map((show: any) => {
                        return (
                            <div key={show.id} className="item" style={imgWidth}>
                                <div className="item-image">
                                    <img
                                        src={"https://image.tmdb.org/t/p/w500" + (show.backdrop_path ? show.backdrop_path : show.poster_path)}

                                        alt="" />
                                    <h1>{show.name}</h1>
                                </div>

                                <div className="preview">
                                    <button className="play-button">Play</button>
                                    <button className="play-button">add</button>
                                    <button className="play-button">like</button>
                                    <button className="play-button" onClick={() => console.log(show)} >More</button>

                                    <div>Show infos</div>
                                    <div>Genres info</div>
                                </div>





                            </div>


                        )
                    })}
                </div>
            </div>



        </div>

    )
}

export default List
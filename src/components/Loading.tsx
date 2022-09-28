import { useEffect, useState } from "react";

function Loading() {
    const totalBoxes = 5; //no of boxed in loading
    const boxes = new Array(totalBoxes).fill(1);
    const [currentOrder, setCurrentOrder] = useState(-9);

    const min = 0;
    const max = 5;
    const speed = 600 //ms
    const highestOpacity = 0.4;
    const opacityChange = 0.1; //opacity change based on current order in relation to main box

    useEffect(() => {
        window.scrollTo(0, 0); //resets scroll
        document.getElementsByTagName("html")[0].style.overflow = "hidden"; //locking scrolling

        //animation starts
        const timer = setInterval(() => {
            setCurrentOrder((prevOrder) => {
                if (prevOrder + 1 >= max) return min;
                else return prevOrder + 1;
            })
        }, speed)

        return () => {
            clearInterval(timer)
            document.getElementsByTagName("html")[0].style.overflow = "auto";
        }
    }, []);

    const calcOpacity = (index: number) => {
        let order = Math.abs(index - currentOrder)
        let position = 4; //position of current box
        if (order > 2) {
            if (index == currentOrder) position = 0;
            else if (currentOrder < index) position = max - index + currentOrder;
            else position = max - currentOrder + index;
        } else position = order;

        const opacity = highestOpacity - Math.abs(position) * opacityChange;
        return { opacity: opacity }
    }


    return (
        <div className="loading-bg">
            <div className="loading-content">
                <div className="loading-text" style={calcOpacity(0)}></div>
                <div className="page-loading">
                    {boxes.map((item, index) => {
                        return <div key={index} className="loading-box" style={calcOpacity(index)}></div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Loading;
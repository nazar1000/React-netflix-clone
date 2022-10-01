import "./listdistributor.scss"
import "./list.scss"
import { useEffect } from "react";
import { useState } from "react";
import List from "./List"


type ListDistributorProps = {
    type: "movies" | "tv" | "home" | "new & popular" | "my list" | "browser by language" | "genre"
    showList: any,
    updatePageLoaded: Function
}

function ListDistributor(props: ListDistributorProps) {
    const [idCounter, setIdCounter] = useState(0);

    //Delay for images url request to prevent error
    useEffect(() => {
        setIdCounter(0);
        const updateCounter = () => {
            setIdCounter(prevCount => {
                if (prevCount == 15) clearInterval(interval);
                return prevCount + 1;
            })
        }
        const interval = setInterval(updateCounter, 1000);
        return () => clearInterval(interval);
    }, [props.type])


    useEffect(() => {
        if (idCounter == 4) props.updatePageLoaded(); //loading time 4 = 4s
    }, [idCounter])

    return (
        <div className={props.type != "new & popular" ? "named-list__with-highlight" : "named-list__without-highlight"}>
            {props.type == "home" && props.showList && props.showList.map((show: any, index: number) => {
                return <List key={index} listName={props?.showList[index][1]} showList={show[0]} id={index} loadID={idCounter} exploreAllLink={index} />
            })}

            {props.type == "tv" && props.showList && props.showList.map((show: any, index: number) => {
                return <List key={index} listName={props?.showList[index][1]} showList={show[0]} id={index} loadID={idCounter} exploreAllLink={index} />
            })}

            {props.type == "movies" && props.showList && props.showList.map((show: any, index: number) => {
                return <List key={index} listName={props?.showList[index][1]} showList={show[0]} id={index} loadID={idCounter} exploreAllLink={index} />
            })}

            {props.type == "genre" && props.showList &&
                <List listName={"Popular In Genre"} showList={props.showList} id={1} loadID={idCounter} />
            }

            {props.type == "new & popular" && props.showList && props.showList.map((show: any, index: number) => {
                return <List key={index} listName={props?.showList[index][1]} showList={show[0]} id={index} loadID={idCounter} />
            })}

        </div>
    )
}

export default ListDistributor;
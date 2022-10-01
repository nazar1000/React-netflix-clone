import { useState } from "react";
import Button from "../components/Button";
import Highlight from "../components/L.components/Highlight";
import ListDistributor from "../components/lists/ListDistributor";
import Preview from "../components/L.components/Preview";
import { useContext } from "react";
import Loading from "../components/Loading";
import "../components/loading.scss"
import { Outlet } from "react-router-dom";

type HomeProps = {
    showsData: any[];
}

const Home = (props: HomeProps) => {
    const [pageLoaded, setPageLoaded] = useState(false);

    // console.log(props)
    const updatePageLoaded = () => {
        setPageLoaded(true);
    }

    return (
        <>
            {!pageLoaded &&
                <Loading />
            }

            {props.showsData.length > 0 &&
                <>
                    <Highlight highlight={props.showsData[5][0][4]} />
                    <ListDistributor showList={props.showsData} type="home" updatePageLoaded={updatePageLoaded} />
                </>
            }

            <Outlet />
        </>
    )
}

export default Home;


import { useState } from "react";
import ListDistributor from "../components/lists/ListDistributor";
import Loading from "../components/Loading";

type NewPopularProps = {
    showsData: any[],
}

const New_And_Popular = (props: NewPopularProps) => {
    const [pageLoaded, setPageLoaded] = useState(false);

    const updatePageLoaded = () => setPageLoaded(true);


    return (
        <>
            {!pageLoaded && <Loading />}
            <ListDistributor type="new & popular" showList={props.showsData} updatePageLoaded={updatePageLoaded} />

        </>
    )
}

export default New_And_Popular;
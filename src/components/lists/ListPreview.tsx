
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ContextGlobal } from "../../App";
import Tile from "../Tile";
import "./listpreview.scss";


type listPreviewProps = {
    allData: any

}

function ListPreview(props: listPreviewProps) {
    const [list, setList] = useState<any[]>([])
    const [margin, setMargin] = useState({ marginTop: "0px" });
    const { updateIsTileActive } = useContext(ContextGlobal)

    const { listname } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let loc = "";
        if (location.pathname.includes("browse")) loc = "homePageData";
        else if (location.pathname.includes("tv")) loc = "tvPageData";
        else if (location.pathname.includes("movies")) loc = "moviePageData";
        else return;

        // console.log(props.allData[loc][Number(listname)])
        setList(props.allData[loc][Number(listname)]);
    }, [props.allData])


    useEffect(() => {
        handleClick(true);
    }, [])

    const handleClick = (isOpen: boolean) => {
        //locks html overflow

        console.log("hellow wtf " + isOpen)
        if (isOpen) {

            document.getElementsByTagName("html")[0].style.overflow = "hidden";
            document.getElementsByTagName("html")[0].style.overflow = "calc(100% - 30px)";
            setMargin({ marginTop: window.scrollY + "px" })
        } else {
            document.getElementsByTagName("html")[0].style.overflow = "auto";
            updateIsTileActive(false);
            navigate(-1);
        }

    }

    return (
        <div className="link-list-div" style={margin} onClick={() => handleClick(false)}>
            <div className="link-list__inner" onClick={(e) => e.stopPropagation()}>
                <div className="padding-div">
                    <div className="close-button" onClick={(e) => { e.stopPropagation(); handleClick(false); }}></div>
                    <h1>{list[1]}</h1>

                    <div className="list">
                        {list[0] && list[0].map((show: any, index: number) => {
                            return <Tile key={index} data={show} />
                        })}

                    </div>
                </div>


            </div>
        </div>
    )
}

export default ListPreview;
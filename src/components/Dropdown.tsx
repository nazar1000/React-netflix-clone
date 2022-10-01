import "./dropdown.scss";
import { useContext, useState } from "react";
import { ContextFilter } from "../App";
import languages_list from "../helper/language_list";
import tileIcon from "../icons/tile.png";
import paragraphIcon from "../icons/left-align.png";

const originalLanguage = [
    "Original Language",
    "Dubbing",
    "Subtitles"
];

const sortMovies = [
    "Suggestions for you",
    "Year Released",
    "A-Z",
    "Z-A",
];

const sortTv = [
    "Suggestions for you",
    "Year Released",
    "Votes desc",
    "Votes asc",
];

const filterName = [
    "Suggestions for you",
    "Year Released",
    "A-Z",
    "Votes desc",
    "Z-A",
    "Votes asc",

]

type filterType = "genreOption" | "sortOption" | "isMovie" | "filterType" | "languageTypeOption" | "languageOption";
type DropdownProps = {
    dropDownType: "original language" | "language" | "sort" | "viewMode",
    pageName?: string;
}

function Dropdown(props: DropdownProps) {
    const { updateFilter, filter, updateViewMode, viewMode } = useContext(ContextFilter);
    const [isDropdown, setDropdown] = useState(false);

    const handleUpdate = (type: filterType, selection: number | string) => {
        updateFilter(type, selection);
        setDropdown(false);
    }

    const getDropdownSelection = () => {
        let selection = "";

        if (props.dropDownType == "original language") selection = filter.languageOption;
        else if (props.dropDownType == "language") selection = filter.languageOption;
        else if (props.dropDownType == "sort" || props.dropDownType == "viewMode") {
            if (!filter.isMovie && (filter.sortOption == 2 || filter.sortOption == 3)) {
                selection = filterName[Number(filter.sortOption) + 1];
            } else selection = filterName[Number(filter.sortOption)];

        }
        return selection;
    }



    return (
        <div className="dropdown-container">

            {/* View Mode*/}
            {props.dropDownType == "viewMode" &&
                <div className='view-toggle'>
                    <div className="view-mode-button" style={viewMode == "full" ? { border: "1px solid white" } : {}} onClick={() => updateViewMode("full")}>
                        <img src={paragraphIcon} ></img>
                    </div >

                    <div className="tiles-over-container" style={viewMode == "tiles" ? { border: "1px solid white", backgroundColor: "rgb(0, 0, 0)" } : {}}>
                        <div className="view-mode-button" onClick={() => { updateViewMode("tiles"); handleUpdate("genreOption", props?.pageName ? props.pageName : ""); }}>
                            <img src={tileIcon} ></img>
                        </div>

                        {viewMode == "tiles" &&
                            <>
                                <div className="tiles-container">
                                    <div className='flex dropdown-name' onClick={() => setDropdown(!isDropdown)}>
                                        <h3 >{getDropdownSelection()}</h3>
                                        <span className='arrowDown'></span>
                                    </div>

                                    {isDropdown &&
                                        <div className='dropdown-list'>
                                            <ul>
                                                {filter.isMovie && sortMovies.map((sort: any, index: number) => {
                                                    return <li key={sort} onClick={() => handleUpdate("sortOption", index)}><a>{sort}</a></li>
                                                })}

                                                {!filter.isMovie && sortTv.map((sort: any, index: number) => {
                                                    return <li key={sort} onClick={() => handleUpdate("sortOption", index)}><a>{sort}</a></li>
                                                })}
                                            </ul>
                                        </div>
                                    }
                                </div>
                            </>
                        }
                    </div>

                </div>

            }


            {/* Label */}
            {props.dropDownType == "original language" && <span className="dropdown-label">Select Your preferences</span>}
            {props.dropDownType == "sort" && <span className="dropdown-label">Sort by</span>}

            {props.dropDownType != "viewMode" &&
                <div className='dropdown'>
                    <div className="dropdown-name" onClick={() => setDropdown(!isDropdown)}>
                        <h2>{getDropdownSelection()}</h2>
                        <span className="arrow"></span>
                    </div>

                    {isDropdown && <div className="dropdown-list">
                        <ul>
                            {props.dropDownType == "language" && languages_list.map((lang: any) => {
                                return <li key={lang.code} onClick={() => handleUpdate("languageOption", lang.name)}><a>{lang.name}</a></li>
                            })}

                            {props.dropDownType == "sort" && sortTv.map((sort: any, index: number) => {
                                return <li key={sort} onClick={() => handleUpdate("sortOption", index)}><a>{sort}</a></li>
                            })}

                            {props.dropDownType == "original language" && originalLanguage.map((lang: any) => {
                                return <li key={lang} onClick={() => handleUpdate("languageTypeOption", lang)}><a >{lang}</a></li>
                            })}

                        </ul>
                    </div>
                    }
                </div>
            }
        </div>




    )


}

export default Dropdown
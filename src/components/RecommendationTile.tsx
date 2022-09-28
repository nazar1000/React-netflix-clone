import "./recommendationTile.scss"
import Button from "./Button"


type RecommendationTileProps = {
    img: string,
    yearReleased: number,
    description: string,
    data: {},
    onClick: Function //play this
}

function RecommendationTile(props: RecommendationTileProps) {
    // Needs img, date released, description, add to my list
    return (
        <div className="recommendation-tile" onClick={() => props.onClick}>
            <div className="img-container">
                <img src={"https://image.tmdb.org/t/p/w300" + props.img}></img>
                <h3></h3>
            </div>
            <div className="recommendation-content">
                <div className="legend">
                    {/* <img></img> */}
                    <h3>{props.yearReleased}</h3>
                    <Button type={"add"} shape={"round"} data={props.data} />
                </div>
                <div className="tile-description">
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    )
}

export default RecommendationTile
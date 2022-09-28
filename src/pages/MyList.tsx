import Tile from "../components/Tile";

type My_listProps = {
    myList: any[]
}

const My_List = (props: My_listProps) => {

    const tileStyle = {
        width: "clamp(200px, 16vw ,300px)",
        float: "left"
    }

    return (
        <div className="my-list">
            {props.myList.map((show: any) => {
                return (
                    <Tile key={show.id}
                        customStyle={tileStyle}
                        data={show} />
                )
            })}
        </div>
    )
}

export default My_List;
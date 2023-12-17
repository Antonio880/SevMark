import Card from "./Card"
import data from "./data"
export default function ListCard(){
    return(
        <div>
            {console.log(data)}
            {
                data.map((data) => (
                    <Card data={data} />
                ))
            }
        </div>
    )
}
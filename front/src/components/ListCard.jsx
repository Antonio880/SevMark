
import Card from "./Card"
export default function ListCard({ locationData }){
    
    return(
        <div className="overflow-y-auto pb-20">
            {
                locationData.length > 0 && locationData.map((data) => (
                    <Card key={data.id} data={data} />
                ))
            }
        </div>
    )
}
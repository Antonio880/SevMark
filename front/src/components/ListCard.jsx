import axios from "axios";
import Card from "./Card"
export default function ListCard({ locationData, setLocals }){

    const handleRemoveLocal = async (idLocalToRemove) => {
        console.log(idLocalToRemove);
        axios.delete(`http://localhost:3001/locals/${idLocalToRemove}`)
        const updatedList = locationData.filter(local => local.id !== idLocalToRemove);
        setLocals(updatedList);
      };
    
    return(
        <div className="overflow-y-auto pb-20">
            {
                locationData.length > 0 && locationData.map((data) => (
                    <Card key={data.id} data={data} onRemove={handleRemoveLocal} />
                ))
            }
        </div>
    )
}
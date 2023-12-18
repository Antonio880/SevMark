import Card from "./Card"
import { useUserContext } from "./ContextUser"
export default function ListCard(){
    
    const { user } = useUserContext();

    return(
        <div>
            {console.log(user.locationData)}
            {
                user && user.locationData && user.locationData.map((data) => (
                    <Card data={data} />
                ))
            }
        </div>
    )
}
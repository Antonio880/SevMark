import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card"
import { useUserContext } from "./ContextUser";

export default function ListCard(){
    
    const { user } = useUserContext();
    const [ locationData, setLocationData ] = useState([]);
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get("http://localhost:3001/locals");
            setLocationData(response.data.result);
          } catch (error) {
            // Trate os erros, se necessário
            console.error("Erro ao buscar dados:", error);
          }
        }
      
        fetchData();
    }, []);

    return(
        <div className="overflow-y-auto">
            {
                locationData && locationData.map((data) => (
                    <Card key={data.id} data={data} />
                ))
            }
        </div>
    )
}
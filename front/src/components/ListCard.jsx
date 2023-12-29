import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card"
import { useUserContext } from "./ContextUser";

export default function ListCard({ locationData }){
    
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
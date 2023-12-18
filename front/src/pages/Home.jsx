import { useUserContext } from "../components/ContextUser"
import SearchBar from "../components/SearchBar";
import ListCard from "../components/ListCard";
import SelectSports from "../components/SelectSports";
import CreateLocationData from "../components/CreateLocationData";
import { useState } from "react";
import AddButton from "../components/AddButton";

export default function Home(){
    
    const { user, setUser } = useUserContext();

    return(
        <div>
            <div>
                <div className="flex justify-center">
                    <SearchBar />
                </div>
                <div className="flex justify-center">
                    <SelectSports />
                </div>
                <div className="flex justify-center">
                    <ListCard />
                </div>
            </div>
            {
                user.typeUser === "dono" && (
                    <AddButton />
                )
            }
        </div>
    )
}
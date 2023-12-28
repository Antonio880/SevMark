import { useUserContext } from "../components/ContextUser"
import SearchBar from "../components/SearchBar";
import ListCard from "../components/ListCard";
import SelectSports from "../components/SelectSports";
import { useForm } from "react-hook-form";
import AddButton from "../components/AddButton";
import { useState } from "react";

export default function Home(){
    
    const { user, setUser } = useUserContext();
    const [ selectedSport, setSelectedSport ] = useState([]);
    const { register } = useForm();

    // const handleSelectSports = (event) => {
    //     const selectedSportId = event.target.value;
    
    //     if (!selectedSports.includes(selectedSportId)) {
    //       setSelectedSports([...selectedSports, selectedSportId]);
    //     }
    //   };

    // const handleRemoveSport = (sportId) => {
    //     const updatedSports = selectedSports.filter((id) => id !== sportId);
    //     setSelectedSports(updatedSports);
    //   };

    const handleSelectSports = (event) => {
        const selectedSport = event.target.value;
        setSelectedSport(selectedSport);
    };

    const handleRemoveSport = () => {
        setSelectedSport("");
    };

    return(
        <div>
            <div>
                <div className="flex justify-center">
                    <SearchBar />
                </div>
                <div className="flex justify-center">
                    <SelectSports selectedSport={selectedSport} handleSelectSports={handleSelectSports} handleRemoveSport={handleRemoveSport} />
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
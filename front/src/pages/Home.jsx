import { useUserContext } from "../components/ContextUser"
import SearchBar from "../components/SearchBar";
import ListCard from "../components/ListCard";
import SelectSports from "../components/SelectSports";
import { useForm } from "react-hook-form";
import AddButton from "../components/AddButton";

export default function Home(){
    
    const { user, setUser } = useUserContext();
    const { register } = useForm();
    return(
        <div>
            <div>
                <div className="flex justify-center">
                    <SearchBar />
                </div>
                <div className="flex justify-center">
                    <SelectSports register={register} />
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
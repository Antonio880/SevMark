import { useUserContext } from "../components/ContextUser"
import SearchBar from "../components/SearchBar";
import ListCard from "../components/ListCard";
import SelectSports from "../components/SelectSports";
import CreateLocationData from "../components/CreateLocationData";

export default function Home(){
    
    const { user, setUser } = useUserContext();

    return(
        <div>
            {
                user.typeUser === "cliente" ? (
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
                ) : (
                    <div className="">
                        <CreateLocationData />
                    </div>
                )
            }
        </div>
    )
}
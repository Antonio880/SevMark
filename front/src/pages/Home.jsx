import { useUserContext } from "../components/ContextUser";
import { useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ListCard from "../components/ListCard";
import SelectSports from "../components/SelectSports";
import { useForm } from "react-hook-form";
import AddButton from "../components/AddButton";
import { useState } from "react";
import Loading from "../components/Loading";

export default function Home() {
  const { user, setUser } = useUserContext();
  const [selectedSport, setSelectedSport] = useState([]);
  const { register } = useForm();
  const [locationData, setLocationData] = useState([]);

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
    setSelectedSport("" + selectedSport);
    axios
      .get(`http://localhost:3001/locals/sportName?name=${selectedSport}`)
      .then((response) => setLocationData(response.data))
      .catch((err) => console.log(err));
  };

  const handleRemoveSport = () => {
    setSelectedSport("");
    axios
      .get("http://localhost:3001/locals")
      .then((response) => setLocationData(response.data))
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <div>
      <div>
        <div className="flex justify-center">
          <SearchBar />
        </div>
        <div className="flex justify-center">
          <SelectSports
            selectedSport={selectedSport}
            handleSelectSports={handleSelectSports}
            handleRemoveSport={handleRemoveSport}
          />
        </div>
        {locationData ? (
          <div className="flex justify-center">
            <ListCard locationData={locationData} />
          </div>
        ) : (
          <Loading />
        )}
      </div>
      {user.typeUser === "dono" && <AddButton />}
    </div>
  );
}

import { useUserContext } from "../Context/ContextUser";
import { useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ListCard from "../components/ListCard";
import SelectSports from "../components/SelectSports";
import { useForm } from "react-hook-form";
import AddButton from "../components/AddButton";
import { useState } from "react";
import Loading from "../components/Loading";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useLocalContext } from "../Context/ContextLocation";
import MarkedCalendarClient from "../components/MarkedCalendar";

export default function Home() {
  const { user, setUser } = useUserContext();
  const { locals, setLocals } = useLocalContext();
  const [selectedSport, setSelectedSport] = useState([]);
  const [showCalendar, setShowCalendar] = useState("home");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3001/locals");
        setLocals(response.data.result);
      } catch (error) {
        // Trate os erros, se necessário
        console.error("Erro ao buscar dados:", error);
      }
    }
    
    fetchData();
  }, []);

  const handleSelectSports = (event) => {
    const selectedSport = event.target.value;
    setSelectedSport("" + selectedSport);
    const fetchSelectedSport = async () => {
      await axios
        .get(`http://localhost:3001/locals/sportName?name=${selectedSport}`)
        .then((response) => {
          setLocals(response.data);
        })
        .catch((err) => console.log(err));
    };

    fetchSelectedSport();
  };

  const handleRemoveSport = () => {
    setSelectedSport("");
    axios
      .get("http://localhost:3001/locals")
      .then((response) => {
        setLocals(response.data.result);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const handleClick = (text) => {
    setShowCalendar(text);
  };

  return (
    <div>
      <div className="flex justify-center items-center h-[65px] pt-3">
        <ButtonGroup variant="text" aria-label="text button group" sx={{ width: "100px", height: "50px" }}>
          <Button
            sx={{
              backgroundColor: showCalendar === "home" && "rgb(255, 124, 28)",
              color: showCalendar === "home" ? "white" : "rgb(255, 124, 28)",
              "&:hover": {
                backgroundColor: "rgb(255, 124, 28)",
                color: "white", // Se desejar mudar a cor do texto no hover
              },
            }}
            onClick={() => handleClick("home")}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Button>
          <Button
            sx={{
              backgroundColor:
                showCalendar === "calendar" && "rgb(255, 124, 28)",
              color:
                showCalendar === "calendar" ? "white" : "rgb(255, 124, 28)",
              "&:hover": {
                backgroundColor: "rgb(255, 124, 28)",
                color: "white", // Se desejar mudar a cor do texto no hover
              },
            }}
            onClick={() => handleClick("calendar")}
          >
            <div className="w-10">
              <img src="calendar-bg.png" className="" alt="" />
            </div>
          </Button>
        </ButtonGroup>
      </div>
      {showCalendar === "home" ? (
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
          {locals ? (
            <div className="flex justify-center">
              <ListCard locationData={locals} setLocals={setLocals} />
            </div>
          ) : (
            <div className="flex justify-center items-center h-[200px]">
              <Loading />
            </div>
          )}
        </div>
      ) : (
        <MarkedCalendarClient />
      )}
      {user.typeUser === "dono" && <AddButton />}
    </div>
  );
}

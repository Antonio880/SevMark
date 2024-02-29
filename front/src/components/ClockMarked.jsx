import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../Context/ContextUser";
export default function ClockMark ({ time, clockForDay, markedClockUser }) {
  const [clicked, setClicked] = useState(false);
  const isAvailable = clockForDay.some(item => item.hour === time);
  const hourMarked = clockForDay.find(item => item.hour === time);
  const [ localForUserMarked, setLocalForUserMarked] = useState([]);
  const { user } = useUserContext();
  
  useEffect(() => {
    if(user.typeUser === "cliente"){
      const fetchLocalUser = async () => {
        if(isAvailable) {
          await axios.get(`http://localhost:3001/locals/${hourMarked.local_id}`)
            .then(response => setLocalForUserMarked(response.data))
            .catch(err => console.log(err));
          }
      }
      
      fetchLocalUser();
    }
  }, []);

  const handleClick = () => {
    setClicked(!clicked);
  };

  useEffect(() => {

  }, [localForUserMarked])

  return (
    <div
      key={time}
      className={`py-5 w-[380px] sm:w-[775px] text-xl border-x-2 flex justify-center hover:bg-slate-200 ${clicked ? "bg-slate-200" : ""} `}
      onClick={handleClick} 
    >
      {time} 
      {
        localForUserMarked.locationName && (
          <p>&nbsp; - {localForUserMarked.locationName}</p>
        )
      }
      {
        markedClockUser && (
          <p>&nbsp; - {markedClockUser.username}</p>
        )
      }
    </div>
  );
};

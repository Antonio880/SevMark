// ClockMark.js

import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "./ContextUser";
export default function ClockMark ({ time, clockForDay }) {
  const [clicked, setClicked] = useState(false);
  const isAvailable = clockForDay.some(item => item.hour === time);
  const hourMarked = clockForDay.find(item => item.hour === time);
  const [ localForUserMarked, setLocalForUserMarked] = useState(null)
  const { user } = useUserContext();
  
  useEffect(() => {
    const fetchLocalUser = async () => {
      if(isAvailable) {
        await axios.get(`http://localhost:3001/locals/${hourMarked.local_id}`)
          .then(response => setLocalForUserMarked(response.data))
          .catch(err => console.log(err));
          console.log("1")
        
      }
    }
    
    fetchLocalUser();
  }, []);

  useEffect(() => {
    console.log(localForUserMarked)
  }, [localForUserMarked])

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div
      key={time}
      className={`py-5 w-[560px] border-x-2 flex justify-center hover:bg-slate-200 ${clicked ? "bg-slate-200" : ""} `}
      onClick={handleClick} 
    >
      {time} 
      {
        localForUserMarked && (
          <p> - {localForUserMarked.locationName}</p>
        )
      }
    </div>
  );
};

// ClockMark.js

import { useEffect, useState } from "react";

export default function ClockMark ({ time }) {
  const [clicked, setClicked] = useState(false);
  const [ selectedClockDay, setSelectedClockDay ] = useState([]);
  
  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div
      key={time}
      className={`py-5 w-[560px] border-x-2 flex justify-center hover:bg-slate-200 ${clicked ? "bg-slate-200" : ""}`}
      onClick={handleClick} 
    >
      {time}
    </div>
  );
};

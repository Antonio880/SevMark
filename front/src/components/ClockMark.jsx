import { useState } from "react";

export default function ClockMark({ time, setSelectedClock }) {
  const [ clicked, setCliked ] = useState(false);
  
    return (
    <div
      key={time}
      className={`py-5 pl-4 relative cursor-pointer hover:bg-slate-200 ${clicked ? "bg-slate-200" : ""}`}
      onClick={() => {
        setCliked(!clicked)
        setSelectedClock(time)
      }}
    >
      {time}
      <div className="absolute top-6 left-[750px] cursor w-3">
        <img src="seta.png" alt="img seta" />
      </div>
    </div>
  );
}

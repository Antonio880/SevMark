// ClockMark.js

import { useEffect, useState } from "react";

const ClockMark = ({ time, setSelectedClock, selectedClock, selectedClockDay }) => {
  const [clicked, setClicked] = useState(false);
  const isAvailable = !selectedClockDay.includes(time);
  const handleClick = () => {
    if (isAvailable) {
      setClicked(!clicked);
      if(!selectedClock.find((timeSelected) => timeSelected === time)){
        setSelectedClock([...selectedClock, time]);
      }else{
        const updateSelectedClock = selectedClock.filter((time) => time !== time);
        setSelectedClock(updateSelectedClock);
      }
    }
  };

  return (
    <div
      key={time}
      className={`py-6 pl-4 md:pl-6 lg:pl-9 md:text-lg font-semibold lg:text-xl relative cursor-pointer ${
        isAvailable ? "hover:bg-slate-200" : "opacity-50"
      } ${clicked ? "bg-slate-200" : ""}`}
      onClick={handleClick}
    >
      {time}
      {isAvailable && (
        <div className="absolute top-7 left-[360px] sm:left-[600px] md:left-[760px] lg:left-[960px] cursor w-4">
          <img src="seta.png" alt="img seta" />
        </div>
      )}
    </div>
  );
};

export default ClockMark;

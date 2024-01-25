// ClockMark.js

import { useEffect, useState } from "react";

const ClockMark = ({ time, setSelectedClock, selectedClock, selectedClockDay }) => {
  const [clicked, setClicked] = useState(false);
  const isAvailable = !selectedClockDay.includes(time);
  const handleClick = () => {
    if (isAvailable) {
      setClicked(!clicked);
      setSelectedClock([...selectedClock, time]);
    }
  };

  return (
    <div
      key={time}
      className={`py-5 pl-4 relative cursor-pointer ${
        isAvailable ? "hover:bg-slate-200" : "opacity-50"
      } ${clicked ? "bg-slate-200" : ""}`}
      onClick={handleClick}
    >
      {time}
      {isAvailable && (
        <div className="absolute top-6 left-[365px] sm:left-[550px] md:left-[660px] lg:left-[750px] cursor w-3">
          <img src="seta.png" alt="img seta" />
        </div>
      )}
    </div>
  );
};

export default ClockMark;

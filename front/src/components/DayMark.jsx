

const DayMark = ({ day, handleDayClick, selectedDay, setClicked, clicked }) => {
  

  return (
    <button
      onClick={() => {
        handleDayClick(day);
        setClicked(day.shortDay);
      }}
      className={`mx-1 p-2 sm:mx-2 md:mx-3 lg:mx-5 mt-2 sm:p-1 md:p-2 border-[1px] rounded-md text-orange-500 hover:text-white hover:bg-orange-500 duration-300 shadow-sm ${
        clicked === day.shortDay ? "bg-orange-500 text-white outline outline-orange-300 sm:outline-[3px] md:outline-[5px]" : "bg-slate-100 "
      } ${selectedDay === null ? "" : ""}`}
    >
      <div className={`${clicked === day.shortDay ? "text-white" : ""}`}>{day.shortDay}</div>
      <div className={`${clicked === day.shortDay ? "text-white" : ""}`}>{day.dayOfMonth}</div>
      <div className={`${clicked === day.shortDay ? "text-white" : ""} text-xs hidden sm:flex`}>{day.monthYear}</div>
    </button>
  );
};

export default DayMark;

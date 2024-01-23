

const DayMark = ({ day, handleDayClick, selectedDay, setClicked, clicked }) => {
  

  return (
    <button
      onClick={() => {
        handleDayClick(day);
        setClicked(day.shortDay);
      }}
      className={`mx-6 mt-2 p-2 border-[1px] rounded-md text-orange-500 hover:text-white hover:bg-orange-500 duration-300 shadow-sm ${
        clicked === day.shortDay ? "bg-orange-500 text-white outline outline-orange-300  outline-[5px]" : "bg-slate-100 text-orange-500"
      } ${selectedDay === null ? "" : ""}`}
    >
      <div>{day.shortDay}</div>
      <div>{day.dayOfMonth}</div>
      <div className="text-xs">{day.monthYear}</div>
    </button>
  );
};

export default DayMark;

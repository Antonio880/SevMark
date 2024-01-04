import React, { useState } from "react";
import moment from "moment";
import ClockMark from "./ClockMark";
import DayMark from "./DayMark";

const SchedulePicker = ({ setShowDisplayMark }) => {
  const [ selectedDay, setSelectedDay ] = useState(null);
  const [ selectedClock, setSelectedClock ] = useState(null);

  const getNextSevenDays = () => {
    const days = [];

    let currentDay = moment();
    for (let i = 0; i < 7; i++) {
      days.push({
        shortDay: currentDay.format("ddd"), // Obtém as três primeiras letras do dia
        dayOfMonth: currentDay.format("D"), // Obtém o dia do mês
        monthYear: currentDay.format("MMM/YYYY"), // Obtém mês/ano
      });
      currentDay = currentDay.add(1, "day");
    }

    return days;
  };

  const handleSaveDayHour = () => {
    const data = {
      dayOfMonth: selectedDay.dayOfMonth,
      monthYear: selectedDay.monthYear,
      shortDay: selectedDay.shortDay,
      hour: selectedClock
    }

    console.log(data);
  }

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const renderTimeSlots = () => {
    const timeSlots = [];
    const startTime = moment().startOf("day").hour(7); // hora inicial
    const endTime = moment().startOf("day").hour(24); // hora final

    let currentTime = startTime.clone();

    while (currentTime.isBefore(endTime)) {
      timeSlots.push(currentTime.format("HH:mm"));
      currentTime = currentTime.add(1, "hour");
    }

    return timeSlots.map((time) => <ClockMark time={time} setSelectedClock={setSelectedClock} />);
  };

  return (
    <div className="">
      <div className="day-buttons">
        {getNextSevenDays().map((day) => (
          <DayMark day={day} handleDayClick={handleDayClick} />
        ))}
      </div>
      {selectedDay && (
        <div>
          <div className="py-2">
            {/* <h3 className='flex justify-center'>{selectedDay}</h3> */}
            <div className="h-72 overflow-y-auto grid grid-cols-1 divide-y">
              {renderTimeSlots()}
            </div>
          </div>
          <div className="flex  justify-between items-center mx-3">
            <button
              className="flex items-center text-sm m-2 font-semibold leading-6 transition ease-in-out duration-300 hover:shadow-sm  delay-150 text-gray-900 hover:bg-slate-300 rounded-md p-2"
              onClick={() => setShowDisplayMark(false)}
            >
              Cancel
            </button>
            <button onSubmit={handleSaveDayHour()} className="flex justify-center rounded-md px-3 py-1.5 text-sm text-black font-semibold leading-6 transition ease-in-out delay-150 hover:text-white hover:bg-orange-400 duration-300 hover:shadow-sm">
              Reservar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePicker;

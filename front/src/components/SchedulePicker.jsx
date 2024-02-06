// SchedulePicker.js

import React, { useDebugValue, useEffect, useState } from "react";
import moment from "moment";
import DayMark from "./DayMark";
import ClockMark from "./ClockMark";
import { useUserContext } from "./ContextUser";
import axios from "axios";

export default function SchedulePicker({ setShowDisplayMark, id, phone }){
  const { user } = useUserContext();
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedClock, setSelectedClock] = useState([]);
  const [selectedClockDay, setSelectedClockDay] = useState([]);
  const [timeSelected, setTimeSelected] = useState([]);
  const [clicked, setClicked] = useState("");

  useEffect(() => {
    const fetchMarksSelecteds = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/marks/buscaLocalId?localId=${id}`
        );
        const timesSelected = response.data.map((item) => ({
          time: item.hour,
          day: item.dayOfMonth,
          monthYear: item.monthYear,
        }));
        setTimeSelected(timesSelected);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMarksSelecteds();
  }, [id]);

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

  const handleSaveDayHour = async () => {
    
    try {
      const reservedHours = [];

      for (let i = 0; i < selectedClock.length; i++) {
        const data = {
          dayOfMonth: selectedDay.dayOfMonth,
          monthYear: selectedDay.monthYear,
          shortDay: selectedDay.shortDay,
          hour: selectedClock[i],
          local_id: id,
          usuario_id: user.id
        };
        const response = await axios.post(`http://localhost:3001/marks`, data)
        .catch((e) => {
          if(e.response.status === 409){
            alert("O Horário " + data.hour + data.dayOfMonth + data.monthYear  + " ja está marcado!");
          }
        });

        if(response.status === 201) {
          alert("Horário: " + data.hour + " marcado com sucesso!");
          reservedHours.push(data.hour);
        }
        try{
          const message = `Olá, estou reservando o seu espaço para o dia ${selectedDay.dayOfMonth}/${selectedDay.monthYear} no(s) horário(s) ${reservedHours.join(', ')}.`;
          const encodedMessage = encodeURIComponent(message);
          /* const whatsappUrl = `https://api.whatsapp.com/send?1=pt_BR&phone=5585992147100` */
          const whatsappUrl = `https://wa.me/55${phone}/? text=${encodedMessage}`;
          /* `` */
          window.open(whatsappUrl, '_blank');
          setShowDisplayMark(false);
        }catch(e){
          alert("Erro ao mandar a mensagem para o dono do local");
          console.error(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
    
    // navigate("")
  };

  const handleDayClick = (day) => {
    if (selectedDay) {
      setSelectedDay(null);
    } else {
      setSelectedClockDay([]);
      for (let i = 0; i < timeSelected.length; i++) {
        if (
          timeSelected[i].day === Number(day.dayOfMonth) &&
          timeSelected[i].monthYear === day.monthYear
        ) {
          setSelectedClockDay((prevClockDay) => [
            ...prevClockDay,
            timeSelected[i].time,
          ]);
        }
      }
      setSelectedDay(day);
      setSelectedClock([]);
    }
  };

  return (
    <div className="">
      <div className="pl-3 sm:pl-5">
        {getNextSevenDays().map((day) => (
          <DayMark
            key={day.shortDay}
            day={day}
            clicked={clicked}
            setClicked={setClicked}
            handleDayClick={handleDayClick}
            selectedDay={selectedDay}
          />
        ))}
      </div>
      {selectedDay && (
        <div>
          <div className="py-2">
            <div className="h-72 overflow-y-auto grid grid-cols-1 divide-y">
                {renderTimeSlots(
                  selectedDay,
                  selectedClock,
                  timeSelected,
                  setSelectedClock,
                  selectedClockDay
                )}
            </div>
          </div>
          <div className="flex justify-between items-center mx-3">
            <button
              className="flex items-center text-sm m-2 font-semibold leading-6 transition ease-in-out duration-300 hover:shadow-sm  delay-150 text-gray-900 hover:bg-slate-300 rounded-md p-2"
              onClick={() => setShowDisplayMark(false)}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveDayHour}
              className="flex justify-center rounded-md px-3 py-1.5 text-sm text-black font-semibold leading-6 transition ease-in-out delay-150 hover:text-white hover:bg-orange-400 duration-300 hover:shadow-sm"
            >
              Reservar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const renderTimeSlots = (
  selectedDay,
  selectedClock,
  timeSelected,
  setSelectedClock,
  selectedClockDay
) => {
  const timeSlots = [];
  const startTime = moment().startOf("day").hour(7); // hora inicial
  const endTime = moment().startOf("day").hour(24); // hora final

  let currentTime = startTime.clone();
  while (currentTime.isBefore(endTime)) {
    const time = currentTime.format("HH:mm");
    // const isMarked = timeSelected.includes(time);
    // const isAvailable = !isMarked || selectedClockDay.includes(time);
    timeSlots.push(
      <ClockMark
        key={time}
        time={time}
        setSelectedClock={setSelectedClock}
        selectedClockDay={selectedClockDay}
        selectedClock={selectedClock}
        selectedDay={selectedDay}
      />
    );

    currentTime = currentTime.add(1, "hour");
  }

  return timeSlots;
};

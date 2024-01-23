import { useEffect, useState } from "react";
import DayMarked from "./DayMarked";
import ClockMarked from "./ClockMarked";
import axios from "axios";
import { useUserContext } from "./ContextUser";
import moment from "moment";

export default function MarkedCalendar({}) {
    const [ selectedDay, setSelectedDay ] = useState("");
    const [ dayMarked, setDayMarked ] = useState([]);
    const [ clockForDay, setClockForDay ] = useState([]);
    const { user } = useUserContext();
    // const [ selectedClockDay, setSelectedClockDay ] = useState([]);

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

    const handleDayClick = (day) => {
      if (selectedDay) {
        setSelectedDay(null);
      } else {
        // Filtrar os clocks para o dia selecionado
        const clocksForSelectedDay = dayMarked
          .filter((markedDay) => markedDay.shortDay === day)
      
        setClockForDay(() => {
          const times = [];
          for (let i = 0; i < clocksForSelectedDay.length; i++) {
            // console.log()
            const time = {
              hour: clocksForSelectedDay[i].hour, 
              local_id: clocksForSelectedDay[i].local_id, 
              usuario_id: clocksForSelectedDay[i].usuario_id
            }
            times.push(time);
          }
          return times;
        });
        setSelectedDay(day);
      }
    };

    // useEffect(() => {
    //   console.log(dayMarked);
    // },[dayMarked])

    useEffect(() => {
      const fetchMarksSelecteds = async () => {
        await axios.get(`http://localhost:3001/marks/buscaUserId?userId=${user.id}`)
          .then(response => setDayMarked(response.data))
          .catch(err => console.error(err));
      }
      
      fetchMarksSelecteds();
      
    }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div class="flex bg-white shadow-md justify-start md:justify-center rounded-lg overflow-x-scroll mx-auto py-4 px-2  md:mx-12">
      {getNextSevenDays().map((day) => (
          <DayMarked
            key={day.shortDay}
            dayOfMonth={day.dayOfMonth}
            shortDay={day.shortDay}
            handleDayClick={handleDayClick}
            setSelectedDay={setSelectedDay}
            selectedDay={selectedDay}
          />
        ))}
      </div>
      <div>
        <div className="h-[400px] overflow-y-auto border-b-2 mt-1 grid grid-cols-1 divide-y">
          {selectedDay &&
            renderTimeSlots(
              clockForDay
            )}
        </div>
      </div>
    </div>
  );
}
const renderTimeSlots = (
    clockForDay
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
        <ClockMarked
          key={time}
          time={time}
          clockForDay={clockForDay}
        />
      );
  
      currentTime = currentTime.add(1, "hour");
    }
  
    return timeSlots;
  };

import { useEffect, useState } from "react";
import DayMarked from "./DayMarked";
import ClockMarked from "./ClockMarked";
import axios from "axios";
import { useUserContext } from "../Context/ContextUser";
import moment from "moment";

export default function MarkedCalendarClient({}) {
    const [ selectedDay, setSelectedDay ] = useState("");
    const [ dayMarked, setDayMarked ] = useState([]);
    const [ clockForDay, setClockForDay ] = useState([]);
    const [ markedForUser, setMarkedForUser ] = useState([]);
    const [ localForUserMarked, setLocalForUserMarked] = useState([]);
    const { user } = useUserContext();
    // const [ selectedClockDay, setSelectedClockDay ] = useState([]);

    useEffect(() => {
      if(user.typeUser === "dono"){
        const fetchLocalByUser = async () => {
          let userLocal = {};
          try {
            await axios.get(`http://localhost:3001/locals/usuario_id?usuario_id=${user.id}`)
              .then(response => {userLocal = response.data[0]; console.log(userLocal)})
              .catch(e => console.error(e));
            await axios.get(`http://localhost:3001/marks/buscaLocalIdBasedInUserId?local_id=${userLocal.id}`)
              .then(response => setLocalForUserMarked(response.data.markFound))
              .catch(e => console.log(e));          
            
          } catch (error) {
            console.error(error);
          }
        };
        fetchLocalByUser();
      }
    }, []);

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
        const marksUsersBasedInSelectedDay = localForUserMarked.filter((markedDay) => markedDay.shortDay === day.shortDay && markedDay.dayOfMonth === Number(day.dayOfMonth) && markedDay.monthYear === day.monthYear);
        
        // Filtrar os clocks para o dia selecionado
        const clocksForSelectedDay = dayMarked
          .filter((markedDay) => 
            markedDay.shortDay === day.shortDay && markedDay.dayOfMonth === Number(day.dayOfMonth) && markedDay.monthYear === day.monthYear )
      
        setClockForDay(() => {
          const times = [];
          for (let i = 0; i < clocksForSelectedDay.length; i++) {
            const time = {
              hour: clocksForSelectedDay[i].hour, 
              local_id: clocksForSelectedDay[i].local_id, 
              usuario_id: clocksForSelectedDay[i].usuario_id
            }
            times.push(time);
          }
          return times;
        });
        setSelectedDay(day.shortDay);
        setMarkedForUser(marksUsersBasedInSelectedDay);
      }
    };

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
      <div class="flex bg-white w-[390px] sm:w-[800px] shadow-md justify-center md:justify-center rounded-lg overflow-x-auto px-4 py-4  md:mx-12">
      {getNextSevenDays().map((day) => (
          <DayMarked
            key={day.shortDay}
            dayOfMonth={day.dayOfMonth}
            shortDay={day.shortDay}
            monthYear={day.monthYear}
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
              clockForDay,
              markedForUser
            )}
        </div>
      </div>
    </div>
  );
}
const renderTimeSlots = (
    clockForDay,
    markedForUser
  ) => {
    const timeSlots = [];
    const startTime = moment().startOf("day").hour(7); // hora inicial
    const endTime = moment().startOf("day").hour(24); // hora final
  
    let currentTime = startTime.clone();
    while (currentTime.isBefore(endTime)) {
      const time = currentTime.format("HH:mm");

      const markFoundFunction = (time) => {
        const markFound = markedForUser.find((mark) => mark.hour === time);
        return markFound || null; // Retorna null se nenhum marcador for encontrado
      };
      // const isMarked = timeSelected.includes(time);
      // const isAvailable = !isMarked || selectedClockDay.includes(time);
      timeSlots.push(
        <ClockMarked
          key={time}
          time={time}
          clockForDay={clockForDay}
          markedClockUser={markFoundFunction(time)}
        />
      );
  
      currentTime = currentTime.add(1, "hour");
    }
  
    return timeSlots;
  };

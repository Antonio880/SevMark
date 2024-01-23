import { useEffect, useState } from "react"


export default function DayMarked({ shortDay, dayOfMonth, selectedDay, handleDayClick }){

  const [ clicked, setCliked ] = useState(false);

  useEffect(() => {
    if(shortDay === selectedDay){
      setCliked(true);
    }else{
      setCliked(false);
    }
  }, [selectedDay])

    return(
        <div class={`flex group hover:bg-orange-100 ${clicked && "bg-orange-100"} hover:shadow-lg hover-light-shadow rounded-lg mx-2 transition-all duration-300 cursor-pointer justify-center w-16`} onClick={() => handleDayClick(shortDay)}>
          <div class="flex items-center px-4 py-4">
            <div class="text-center">
              <p class="text-orange-900 group-hover:text-orange-900 text-sm transition-all	duration-300">
                {" "}
                {shortDay}{" "}
              </p>
              <p class="text-orange-900 group-hover:text-orange-900 mt-3 group-hover:font-bold transition-all	duration-300">
                {" "}
                {dayOfMonth}{" "}
              </p>
            </div>
          </div>
        </div>
    )
}
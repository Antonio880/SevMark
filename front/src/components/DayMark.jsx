import { useState } from "react"

export default function DayMark({ day, handleDayClick }){
    const [ clicked, setCliked ] = useState(false);
    
    return(
        <button
            key={day.shortDay}
            onClick={() => {
                handleDayClick(day);
                setCliked(!clicked);
            }}
            className={`mx-6 mt-2 p-2 border-[1px] border-orange-500 rounded-md text-orange-500 hover:text-white hover:bg-orange-500 duration-300 shadow-sm ${clicked ? "bg-orange-500 text-white outline outline-orange-300  outline-[5px]" : ""}`}
          >
            <div>{day.shortDay}</div>
            <div>{day.dayOfMonth}</div>
            <div className="text-xs">{day.monthYear}</div>
          </button>
    )
}
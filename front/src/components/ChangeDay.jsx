import { useEffect, useState } from "react"


export default function ChangeDay({ shortDay, selectedDay, handleDayClick }){

  const [ clicked, setCliked ] = useState(false);

  useEffect(() => {
    if(shortDay === selectedDay){
      setCliked(true);
    }else{
      setCliked(false);
    }
  }, [selectedDay]);



    return(
        <div class={`flex group hover:bg-orange-100 ${clicked && "bg-orange-100"} hover:shadow-lg hover-light-shadow rounded-lg mx-0 md:mx-2 transition-all duration-300 cursor-pointer justify-center w-16`} onClick={() => handleDayClick(shortDay)}>
          <div class="flex items-center py-4">
            <div class="text-center">
              <p class="text-orange-900 group-hover:text-orange-900 text-sm transition-all	duration-300">
                {" "}
                {shortDay}{" "}
              </p>
            </div>
          </div>
        </div>
    )
}
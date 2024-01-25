import { useEffect, useState } from "react";
import SwiperImages from "./SwiperImages";
import SchedulePicker from "./SchedulePicker";
export default function DisplayMark({ data, setShowDisplayMark }) {
  const { obs, id } = data;
  const fotos = ["quadra_unifor.jpg", "quadra.jpg"];
 
  return (
    <div className="h-[772px] w-[400px] sm:w-[590px] md:w-[700px] lg:w-[800px] py-2 bg-slate-100 rounded-md">
      <SwiperImages fotos={fotos} />
      <div className="flex flex-col">
        <div className="h-16 overflow-y-auto px-1 pt-4">
          {
            obs && (
              <p className="overflow-x-auto flex justify-center px-2">Observações Adicionais: {obs}</p>
            )
          }
        </div>
        <div>
          <SchedulePicker setShowDisplayMark={setShowDisplayMark} id={id} />
        </div>      
      </div>
    </div>
  );
}

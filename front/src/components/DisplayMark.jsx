import { useEffect, useState } from "react";
import SwiperImages from "./SwiperImages";
import SchedulePicker from "./SchedulePicker";
export default function DisplayMark({ data, setShowDisplayMark }) {
  const { obs } = data;
  const fotos = ["quadra_unifor.jpg", "quadra.jpg"];
 
  return (
    <div className="h-[772px] py-2 bg-slate-100 rounded-md">
      <SwiperImages fotos={fotos} />
      <div className="flex flex-col">
        <div className="h-16 overflow-y-auto px-8 py-2">
          Observações Adicionais: {obs}
        </div>
        <div>
          <SchedulePicker setShowDisplayMark={setShowDisplayMark} />
        </div>      
      </div>
    </div>
  );
}


import SwiperImages from "./SwiperImages";
import SchedulePicker from "./SchedulePicker";
import axios from "axios";
import { useState, useEffect } from "react";
export default function DisplayMark({ data, images, setShowDisplayMark }) {
  const { obs, id, usuario_id } = data;
  const [ phone, setPhone ] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${usuario_id}`)
      .then(response => setPhone(response.data.phone))
      .catch((err) => console.log("Não conseguimos pegar o número do dono"))
  }, []);

  return (
    <div className="h-[800px] w-[390px] sm:w-[640px] md:w-[800px] lg:w-[1000px] py-2 bg-slate-100 rounded-md">
      <SwiperImages fotos={images} />
      <div className="flex flex-col">
        <div className="h-16 overflow-y-auto px-1 pt-4">
          {
            obs && (
              <p className="overflow-x-auto flex text-sm sm:text-base md:text-lg justify-center px-2">Observações Adicionais: {obs}</p>
            )
          }
        </div>
        <div>
          <SchedulePicker setShowDisplayMark={setShowDisplayMark} id={id} phone={phone} />
        </div>      
      </div>
    </div>
  );
}

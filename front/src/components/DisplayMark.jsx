import { useEffect } from "react";
import SwiperImages from "./SwiperImages";
export default function DisplayMark({ data, sports }) {
  const { locationName, description, price, obs } = data;

  const fotos = ["quadra_unifor.jpg", "quadra.jpg"];

  return (
    <div className="h-[500px]">
      <SwiperImages fotos={fotos} />
      <div className="flex flex-row">
        <div className="basis-1/2 grid grid-cols-1 divide-y">
          <h2 className="flex justify-center py-3"><strong>{locationName}</strong></h2>
          <h3 className="flex justify-center py-3 overflow-x-auto">Endereço: {description}</h3>
        </div>
        <div className="basis-1/2 grid grid-cols-1 divide-y">
          <h3 className="text-base flex justify-center pt-3">Preço: {price}</h3>
        </div>
      </div>
    </div>
  );
}

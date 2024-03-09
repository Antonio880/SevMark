import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

export default function SwiperImages({ fotos }) {
  return (
    <div className="flex justify-center w-full ">
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="h-[250px] rounded-md"
        style={{
          "--swiper-pagination-color": "#fdba74",
          "--swiper-navigation-color": "#fdba74"
        }}
      >
        {fotos.map((foto) => (
          <SwiperSlide>
            <div className="flex justify-center">
              <img src={foto.src} alt="" className="w-[450px]" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

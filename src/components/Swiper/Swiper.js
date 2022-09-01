import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Skeleton } from "@mui/material";
import Card from "./Card";
function SwiperComp({ data }) {
  if (!data) return <SkeletonSwiper />;
  return (
    <Swiper
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
      slidesPerView={2}
      spaceBetween={5}
      loop={true}
      navigation={true}
      modules={[Navigation]}
      slideNextClass="next"
    >
      {data.results?.map((item) => {
        if (!item.backdrop_path) return "";
        return (
          <SwiperSlide className="Movies moviesSwiper" key={item.id}>
            <Card item={item} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
const SkeletonSwiper = () => {
  return (
    <Swiper
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
      slidesPerView={2}
      spaceBetween={5}
      loop={true}
    >
      <SwiperSlide className="Movies moviesSwiper">
        <Skeleton
          animation="wave"
          height="100%"
          variant="rectangular"
          sx={{
            bgcolor: "#0f212b",
          }}
        />
      </SwiperSlide>
      <SwiperSlide className="Movies moviesSwiper">
        <Skeleton
          animation="wave"
          height="100%"
          variant="rectangular"
          sx={{
            bgcolor: "#0f212b",
          }}
        />
      </SwiperSlide>
      <SwiperSlide className="Movies moviesSwiper">
        <Skeleton
          animation="wave"
          height="100%"
          variant="rectangular"
          sx={{
            bgcolor: "#0f212b",
          }}
        />
      </SwiperSlide>
      <SwiperSlide className="Movies moviesSwiper">
        <Skeleton
          animation="wave"
          height="100%"
          variant="rectangular"
          sx={{
            bgcolor: "#0f212b",
          }}
        />
      </SwiperSlide>
      <SwiperSlide className="Movies moviesSwiper">
        <Skeleton
          animation="wave"
          height="100%"
          variant="rectangular"
          sx={{
            bgcolor: "#0f212b",
          }}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComp;

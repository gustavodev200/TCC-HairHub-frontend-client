"use client";

import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { BarberCard } from "../BarberCard";

const FeedbackClientsSlider = () => {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <BarberCard />
        </SwiperSlide>
        <SwiperSlide>
          <BarberCard />
        </SwiperSlide>
        <SwiperSlide>
          <BarberCard />
        </SwiperSlide>
        <SwiperSlide>
          <BarberCard />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default FeedbackClientsSlider;

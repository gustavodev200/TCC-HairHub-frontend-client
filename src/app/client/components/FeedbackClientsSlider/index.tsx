"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { BarberCard } from "../BarberCard";
import { CommentOutputDTO } from "@/@types/comments";

export interface BarberCardProps {
  comments: CommentOutputDTO[];
}

const FeedbackClientsSlider = (comments: BarberCardProps) => {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {comments.comments?.map((items) => (
          <SwiperSlide key={items.id} className="mySwiper">
            <BarberCard
              client={items.client}
              employee={items.employee}
              content={items.content}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default FeedbackClientsSlider;

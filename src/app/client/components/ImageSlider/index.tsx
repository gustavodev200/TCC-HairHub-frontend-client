"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function ImageSlider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <ImageSwiper
            src="https://crisaita.com.br/wp-content/uploads/2018/10/barbearia_nova_antiga.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ImageSwiper
            src="https://clubmensalon.com.br/wp-content/uploads/2023/05/eaae141d-dd9a-4799-88e4-8cb2ba408502.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ImageSwiper
            src="https://ae01.alicdn.com/kf/HTB141GymDJYBeNjy1zeq6yhzVXaF/Personalizado-vintage-papel-de-parede-barbeiro-elementos-para-a-parede-da-barbearia-sof-sala-estar.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ImageSwiper
            src="https://d2zdpiztbgorvt.cloudfront.net/region1/br/151527/biz_photo/1920b716134f406d8f22a74c9a9435-o-marquez-barbearia-biz-photo-b816a631794149f6b3c34373b4f153-booksy.jpeg"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ImageSwiper
            src="https://www.wineenthusiast.com/wp-content/uploads/2022/09/HERO_Barbershop_Cuts_and_Cocktails_Credit_David_J_Crewe_1920x1280.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>

        <SwiperSlide>
          <ImageSwiper
            src="https://potricharquitetura.com/wp-content/uploads/Adailton_Barbearia_HD_09-1.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export const ImageSwiper = styled.img`
  display: flex;
  background-color: #1f1f1f;
  z-index: 1;
`;

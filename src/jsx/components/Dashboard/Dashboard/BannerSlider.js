import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay, Pagination } from "swiper";

import "swiper/css";

import banerimg1 from "./../../../../images/banner-img/pic-1.jpg";
import banerimg2 from "./../../../../images/banner-img/pic-3.jpg";
import banerimg3 from "./../../../../images/banner-img/pic-4.jpg";
import logo from "./../../../../images/banner-img/logo.png";

const sliderBlog = [{ image: logo }];

const BannerSlider = () => {
  return (
    <div className="position-relative ">
      <div className="swiper-pagination-banner"></div>
      <Swiper
        className="mySwiper-1"
        // speed= {1200}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          el: ".swiper-pagination-banner",
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
        }}
        modules={[Autoplay, Pagination]}
      >
        {sliderBlog.map((data, ind) => (
          <SwiperSlide key={ind}>
            <div className="banner-bx">
              <img src={data.image} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default BannerSlider;

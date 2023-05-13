import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper";

import "swiper/css";

const CategorySlider = ({ categories, setCatId, catId }) => {
  const handleSlectCat = (id) => {
    setCatId(id);
  };
  return (
    <>
      <Swiper
        className="mySwiper-2"
        speed={1200}
        slidesPerView={5}
        spaceBetween={20}
        //loop={true}
        autoplay={{
          delay: 1200,
        }}
        modules={[Autoplay]}
        breakpoints={{
          360: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1920: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                backgroundColor: cat.id === catId ? "#86AD31" : "white",
              }}
              className="cate-bx text-center"
              onClick={() => handleSlectCat(cat.id)}
            >
              <div className="card">
                <div className="card-body">
                  <img height={70} width={100} src={cat.img} />
                  <Link to={"#"}>
                    <h6
                      style={{
                        color: cat.id === catId ? "white" : "black",
                      }}
                      className="mb-0 font-w500"
                    >
                      {cat.name}
                    </h6>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div>
      </Swiper>
    </>
  );
};
export default CategorySlider;

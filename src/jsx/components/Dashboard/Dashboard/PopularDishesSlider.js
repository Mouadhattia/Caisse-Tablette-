import React from "react";

import { Link } from "react-router-dom";

import "swiper/css";

const PopularDishesSlider = ({ products }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {products.map((data, index) => (
          <Link to={"/product/" + data.id} key={index}>
            <div
              className="card dishe-bx b-hover review style-1"
              style={{ width: "18rem" }}
            >
              <div className="card-body text-center py-3 d-flex justify-content-center">
                <img src={data.img1} alt="" />
              </div>
              <div className="card-footer pt-0 border-0 text-center">
                <div>
                  <h4 className="mb-0">{data.name}</h4>

                  <h3 className="font-w700 text-primary">{data.price}TND</h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
export default PopularDishesSlider;

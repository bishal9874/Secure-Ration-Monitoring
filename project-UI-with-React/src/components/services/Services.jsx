import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./Services.css";
import data from "../../utils/slider.json";
import { sliderSettings } from "../../utils/common";
const Services = () => {
  return (
    <section className="s-wrapper" id="services">
      <div className="paddings innerWidth s-container">
        <div className="s-head flexColStart">
          <span className="orangeText">Our Services</span>
          <span className="primaryText">Best Selling</span>
        </div>
        <Swiper {...sliderSettings}>
          <SliderButton/>
            {
                data.map((card,i)=>(
                    <SwiperSlide key={i}>
                        <div className="flexColCenter s-card">
                            <img src={card.image} alt="kerosene" />

                            <span className="secondaryText s-price">
                                <span style={{color:"orange"}}>₹</span>
                                <span>{card.price}</span>
                            </span>
                            <span className="primaryText">{card.name}</span>
                            <span className="secondaryText">{card.detail}</span>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
      </div>
    </section>
  );
};

export default Services;

const SliderButton =()=>{
  const swiper = useSwiper();
  return(
    <div className="flexCenter s-button">
      <button onClick={()=>swiper.slidePrev()}>&lt;</button>
      <button onClick={()=>swiper.slideNext()}>&gt;</button>
    </div>
  )
}
import React from "react";
import "./Hero.css";
import CountUp from "react-countup";
const Hero = () => {
  return (
    <section className="hero-wrapper" id="home">
      <div className="paddings innerWidth flexCenter hero-container ">
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="purple-circle" />
            <h1>
              Your One-Step <br />
              Secure and Hassle-Free <br />
              Ration Monitoring
            </h1>
          </div>
          <div className="flexColStart hero-des">
            <span className="secondaryText"> 
              Our system ensures that only eligible individuals receive the{" "}
              <br /> allocated ration by using biometric verification and other
              advanced technologies.
            </span>
            
          </div>
          <div className="flexCenter stats">
            <div className="flexColStart stat">
              <span>
                    <CountUp start={1800} end={9000} duration={4}/>
                    <span>+</span>
              </span>
              <span className="secondaryText">
                Suppling Items
              </span>
            </div>
            <div className="flexColStart stat">
              <span>
                    <CountUp start={18000} end={50000} duration={4}/>
                    <span>+</span>
              </span>
              <span className="secondaryText">
                 Active Users
              </span>
            </div>
            <div className="flexColStart stat">
              <span>
                    <CountUp start={10} end={50} duration={120}/>
                    <span>+</span>
              </span>
              <span className="secondaryText">
                servies
              </span>
            </div>
          </div>
        </div>
        <div className="flexCenter hero-right">
          <div className="image-container">
            <img
              src="src/assets/food/fotor-ai-2023050510181_2.jpg"
              alt="food"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

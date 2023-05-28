// import React from "react";
// import "./Footer.css";
// import { Divider } from "@mui/material";

// const Footer = () => {
//   return (
//     <section className=" f_wraper ">
//       <div className="f_img">
//         <img
//           className="paddings"
//           src="src\assets\png\logo-no-background.png"
//           width={340}
//         />
//         <p className="f_para">
//           Your One-Step <br />
//           Secure and Hassle-Free <br />
//           Ration Monitoring
//         </p>
//       </div>

//       <div>
//         <section className="paddings f_quick">
//           <div className=""><h1>Ouick Link</h1>
//             <p>

//             </p>
//           </div>
//           <div className="">hello1</div>
//           <div className="">hello2</div>
//           <div className="">hello3</div>
//         </section>
//         <Divider style={{ backgroundColor: "white" }} />
//       </div>
//     </section>
//   );
// };

// export default Footer;
import React from "react";
import "./Footer.css";
import { Divider } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
  Navigate,
} from "react-router-dom";

const Footer = () => {
  return (
    <div className="body">
      <footer>
        <div class="row primary">
          <div class="column about">
             <img
              src="src/assets/png/logo-no-background.png"
              alt="logo"
              width={350}
            /> 
            
            
            
            <br />

            <p>
              Your One-Step <br />
              Secure and Hassle-Free <br />
              Ration Monitoring
            </p>

            {/* <div class="social">
      <img src='src\assets\png\facebook-logo-facebook-icon-transparent-free-png.webp'
      width={40}
      height={40}/>
      <img src='src\assets\png\twitter.png'
      width={40}
      height={40}/>
      <img src='src\assets\png\facebook.png'
      width={50}/>
      <img src='src\assets\png\facebook.png'
      width={50}/>
        </div> */}
          </div>

          <div class="column links">
            <h3 className="Some">Some Links</h3>
            <br />
            <ul>
              <li>
                <a href="#faq">F.A.Q</a>
              </li>
              <li>
                <a href="#cookies-policy">Cookies Policy</a>
              </li>
              <li>
                <a href="#terms-of-services">Terms Of Service</a>
              </li>
              <li>
                <a href="#support">Support</a>
              </li>
            </ul>
          </div>

          <div class="column subscribe">
            <h3  className="Some">Newsletter</h3>
            <br />
            <div>
              <input
                className="inputButton"
                type="email"
                placeholder="Your email id here"
              />
              <button className="button">Subscribe</button>
            </div>
          </div>

          <div className="socialIcons">
            <img src="src/assets/social icons/facebook.png" />
            <img src="src/assets/social icons/github.png" />
            <img src="src/assets/social icons/twitter.png" />
          </div>
        </div>

        <div class="row copyright">
          <div class="footer-menu">
            <a href="#">Home</a>
            <a href="#companies">Companies</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
            <a href="/login">Sign in</a>
            <a href="/signup">Sign up</a>
          </div>
          <p>Copyright &copy; 2023 Secure Ration Developer</p>
        </div>
      </footer>

    </div>
  );
};

export default Footer;

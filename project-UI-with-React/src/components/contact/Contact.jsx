import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  TextField,
  Box,
  Alert,
  Typography,
  CircularProgress,
  Icon,
} from "@mui/material";
import "./Contact.css";
const Contact = () => {
  const [succeed, setsucceed] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_0e7n9qs",
        "template_1fsh6j4",
        form.current,
        "K--KcB3b9iD0l9AoS"
      )
      .then(
        (result) => {
          console.log(result.text);
          const message = "Our team will contact you soon.";
          setsucceed(message);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <section className="c-wrapper" id="contact">
      <div className="paddings innerWidth flexCenter c-container">
        {/* left side */}
        <div className="c-left flexColStart">
          <span className="contactTitle">Contacts</span>
          <span className="secondaryText">Easy to Contact Us</span>
          <Box component="form" ref={form} onSubmit={sendEmail}>
            <div className="inputs_container">
              <TextField
                id="user_name"
                name="user_name"
                label="Name"
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                id="user_email"
                name="user_email"
                label="Email"
                variant="outlined"
                margin="normal"
                type="email" // Add email type restriction
                required
              />

              <TextField
                id="subject"
                name="subject"
                label="Subject"
                variant="outlined"
                margin="normal"
                required
              />

              <TextField
                margin="normal"
                fullWidth
                id="message"
                name="message"
                label="Add a message"
                multiline
                rows={4}
                variant="outlined"
                placeholder="Write your message here..."
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </div>
            <div className="flexCenter login_butto_section ">
              {/* {isLoading ? (
         <CircularProgress />
       ) : (
         <button type="submit" className="login_button">
           Submit
         </button>
       )} */}
              <button type="submit" className="login_button">
                Submit
              </button>
            </div>
          </Box>
          {succeed && (
            <Alert severity="success" style={{marginTop:"10px"}}>
              <div className="flexCenter" style={{display:"flex",flexDirection:"column",}}>
              <img src="src/assets/icons/smile.png" alt="Success" width={40}/>
              <span>{succeed}</span>
              </div>
            </Alert>
          )}
        </div>
        {/* rightside */}
        <div className="c-right">
          <div className="c-image-container">
            <img src="src/assets/contact.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

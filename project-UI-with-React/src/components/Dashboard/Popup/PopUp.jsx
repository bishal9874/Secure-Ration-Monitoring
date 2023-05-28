import React, { useState, useEffect } from 'react';
import './PopUp.css';

const PopUp = (props) => {
  const [showPopup, setShowPopup] = useState(props.trigger);

  useEffect(() => {
    setShowPopup(props.trigger);
  }, [props.trigger]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  console.log(showPopup);
  return showPopup ? (
    <div className="popUp">
      <div className="popup-inner">
        <button className="button buttonalign" onClick={handleClosePopup}>
          Close
        </button>
        <div className="popup-content">
          {props.children}
        </div>
      </div>
    </div>
  ) : null;
};

export default PopUp;

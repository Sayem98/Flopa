import React from "react";

const Button = ({ className, text, onClick }) => {
  return (
    <button className={`${className} connect-wallet`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;

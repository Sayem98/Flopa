import React from "react";
import Button from "../Button/Button";

const Input = ({ type, placeholder, button, className, value, onChange }) => {
  return (
    <div className={`${className} d-flex align-items-center position-relative`}>
      <input
        className={`input-amount`}
        type={type ? type : "text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
      />
      {button ? (
        <Button className={"buy-btn position-absolute"} text={"Buy"} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;

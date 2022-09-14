import React from "react";
import "./SelectButton.css";
function SelectButton({ children, selected, onClick }) {
  return (
    <span
      className="Buttons"
      onClick={onClick}
      selected={selected}
      tabindex="0"
    >
      {children}
    </span>
  );
}

export default SelectButton;

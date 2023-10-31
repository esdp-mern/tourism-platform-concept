import React from "react";

interface IProps {
  show: boolean;
  onClick: () => void;
}

const ToolBarMenu: React.FC<IProps> = ({ show, onClick }) => {
  return (
    <div className={`tool-bar-menu ${show ? "menu-active" : ""}`}>
      <button className="close-btn" onClick={onClick}>
        <span></span>
        <span></span>
      </button>
    </div>
  );
};

export default ToolBarMenu;

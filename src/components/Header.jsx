import React from "react";

const Header = ({ message }) => {
  const hour = new Date().getHours();
  const greetingTexts = ["Good morning", "Good afternoon", "Good evening"];
  let greeting = "";

  if (hour < 12) greeting = greetingTexts[0];
  else if (hour < 18) greeting = greetingTexts[1];
  else greeting = greetingTexts[2];

  return (
    <div className="Header">
      <span>
        <p>{greeting},</p>
        <h1>{message}</h1>
      </span>
      <button>View More</button>
    </div>
  );
};
export default Header;

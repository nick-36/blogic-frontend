import React from "react";
import "./Header.css";
// import headerImage from "../../assets/headerImage.png";

function Header(props) {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      {/* <img className="headerImage" src={headerImage} alt="" /> */}
    </div>
  );
}

export default Header;

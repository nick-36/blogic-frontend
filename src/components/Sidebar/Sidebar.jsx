import "./Sidebar.css";
import personProfile from "../../assets/person.jpeg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Sidebar(props) {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_PROD_SERVER_URL}categories`
      );
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img className="sidebarImage" src={personProfile} alt="User_Image" />
        <p className="sidebardescription">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit,
          dicta, maiores in architecto consequuntur quo voluptatum sapiente
          perspiciatis quaerat dolorum quis aperiam veritatis inventore
          aspernatur tempora minima sint quasi iusto.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => {
            return (
              <Link key={c._id} className="link" to={`/?cat=${c.name}`}>
                <li key={c._id} className="sidebarListItem">
                  {c.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <ul className="sidebarIcons">
          <i className="sidebarIcon fa-brands fa-facebook-square"></i>
          <i className="sidebarIcon fa-brands fa-twitter-square"></i>
          <i className="sidebarIcon fa-brands fa-instagram-square"></i>
          <i className="sidebarIcon fa-brands fa-pinterest-square"></i>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

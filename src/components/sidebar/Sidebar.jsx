import React, { useContext } from "react";
import MainContext from "../../context/MainContext";
import "./styles.css";
import { Link } from "react-router-dom";

function Sidebar() {
  const { categorias } = useContext(MainContext);

  return (
    <div id="sidebar">
      {categorias.map((item, index) => {
        return (
          <div key={index}>
          <Link to={`/${item==='mangás' ? 'mangas' : item}`}>
            <div className="categoria">{item}</div>
          </Link>
        </div>
        );
        
      })}
    </div>
  );
}

export default Sidebar;

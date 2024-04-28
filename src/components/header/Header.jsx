import React, { useContext } from "react";
import MainContext from "../../context/MainContext";
import { Link } from "react-router-dom";
import "./header.css";
import Carrinho from "../carrinho/Carrinho";

function Header() {
  const { abrirCarrinho, setAbrirCarrinho } = useContext(MainContext);

  return (
    <div id='header-wrapper'>
      <div id="head">
        <Link to="/">
          <div id="logo-container">
            <div id="logo-img">
              <img src="./logo.png" />
            </div>
            <div id="logo">POINT HQ</div>
          </div>
        </Link>
        <div id="navbar">
          <div
            id={abrirCarrinho ? "carrinho-aberto" : "carrinho"}
            onClick={() => setAbrirCarrinho(!abrirCarrinho)}
          >
            Carrinho <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <div id='login'>Login</div>
        </div>
      </div>
      <div id="carrinho-container">
        <Carrinho />
      </div>
    </div>
  );
}

export default Header;

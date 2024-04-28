import { CSSTransition } from "react-transition-group";
import MainContext from "../../context/MainContext";
import Quantidade from "../Quantidade/Quantidade";
import "./carrinho.css";

import React, { useContext } from "react";

export default function Carrinho() {
  const {
    carrinho,
    abrirCarrinho,
    valoresCarrinho,
    preçoTotal
  } = useContext(MainContext);

  return (
    <div className="box-carrinho">
      <div className="box-carrinho-content">
        <CSSTransition
          in={abrirCarrinho}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <div className="wrapper">
            <div className="titulo">Carrinho de Compras</div>
            <div className="produtos-container">
              {carrinho.map((item) => (
                <div
                  className="carrinho-produto-container"
                  key={item.id_produto}
                >
                  <img className="carrinho-produto-imagem" src={item.imagem} />
                  <div className="carrinho-produto-nome">
                    {item.nome} {item.volume ? "#" + item.volume : null}
                  </div>
                  <div className="carrinho-quantidade-container">
                    <Quantidade
                      id={item.id_produto}
                      preço={Number(item.preço)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="orçamento">
              {valoresCarrinho.length
                ? `TOTAL = R$${preçoTotal}`
                : "TOTAL = R$0,00"}
            </div>
            <button>Comprar</button>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}

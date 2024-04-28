import React, { useContext, useEffect, useState } from "react";
import "./infoproduto.css";
import { useParams } from "react-router-dom";
import MainContext from "../../context/MainContext";
import { products } from "../../products";

function InfoProduto() {
  let { id } = useParams();
  const {valoresCarrinho, setValoresCarrinho, carrinho, setCarrinho, setPreçoTotal} = useContext(MainContext);
  const [quantidade, setQuantidade] = useState(1)

  const produto = products.filter(item => item.id_produto == id)[0]

  function handleClick() {
    const carrinhoAtualizado = [...carrinho, produto];
    setCarrinho(carrinhoAtualizado);

    const totalAtual = valoresCarrinho;
    const valorAcumulado = [...totalAtual, {id: id, preço: Number(produto.preço), qtd: quantidade}]
    setValoresCarrinho(valorAcumulado)
    setPreçoTotal(
      valorAcumulado
        .reduce((a, b) => {
          return a + b.preço * b.qtd;
        }, 0)
        .toFixed(2)
        .toString()
        .replace(".", ",")
    );
  }

  function handleChange(e) {
    const value = Number(e.current.value)
    if (value !== quantidade) {
      setQuantidade(value)
    }
  }

  function handleClickQtd(operator) {
    let qtdAtualizada;
    if (operator === '-' && quantidade > 1) {
      qtdAtualizada = quantidade - 1;
    }
    if (operator === '+') {
      qtdAtualizada = quantidade + 1;
    }
    if (qtdAtualizada >= 1) {
      setQuantidade(qtdAtualizada);
    }
  }

  return (
    <div id="wrapper">
      {produto ? (<div id="info-produto-container">
          <div id="imagem-container">
            <div id="imagem-container-box">
              <img src={produto.imagem} />
            </div>
            <div id="imagem-container-compra">
              <div id="imagem-container-compra-preço">{`R$${produto?.preço
                .toFixed(2)
                .replace(".", ",")}`}</div>
              <div id="imagem-container-compra-carrinho">
                <div id="imagem-container-compra-carrinho-qtd">
                  <div id='imagem-container-compra-carrinho-qtd-menos' onClick={() => handleClickQtd('-')}>-</div>
                  <input id='imagem-container-compra-carrinho-qtd-input' type='number' maxLenght={3} value={quantidade} onChange={handleChange}/>
                  <div id='imagem-container-compra-carrinho-qtd-mais' onClick={() => handleClickQtd('+')}>+</div>
                  </div>
                {
                        valoresCarrinho.some(valor => valor.id === id)
                        ? (<button
                          id="imagem-container-compra-carrinho-btn"
                          disabled
                        >
                          Adicionado<i className="fa-solid fa-cart-shopping"></i>
                        </button>)
                        : (<button
                          id="imagem-container-compra-carrinho-btn"
                          onClick={() => handleClick(produto.id_produto)}
                        >
                          Adicionar <i className="fa-solid fa-cart-shopping"></i>
                        </button>)
                      }
              </div>
            </div>
          </div>
          <div id="info-container">
            <div id="info-container-título">{`${produto.nome}${
              produto.volume ? " Vol - " + produto.volume : ""
            }`}</div>
            <div id="info-container-sinopse">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta
              eum modi harum, velit molestiae ut consequatur deserunt quidem
              reprehenderit voluptatum architecto quaerat temporibus adipisci
              beatae nulla nemo veritatis officiis officia!
            </div>
            <div id="info-container-ficha">
              <div id="info-container-ficha-detalhes">Ficha técnica</div>
              <div className="info-container-ficha-dado">
                Categoria: <b>{produto.categoria}</b>
              </div>
              <div className="info-container-ficha-dado">
                Editora: <b>{produto.editora}</b>
              </div>
              {produto.tipo?.length ? (
                <div className="info-container-ficha-dado">
                  Tipo: <b>{produto.tipo}</b>
                </div>
              ) : null}
              {produto.coleção?.length ? (
                <div className="info-container-ficha-dado">
                  Coleção: <b>{produto.coleção}</b>
                </div>
              ) : null}
              {produto.estilo?.length ? (
                <div className="info-container-ficha-dado">
                  Estilo: <b>{produto.estilo}</b>
                </div>
              ) : null}
              {produto.jogadores?.length ? (
                <div className="info-container-ficha-dado">
                  Jogadores: <b>{produto.jogadores}</b>
                </div>
              ) : null}
              {produto.linha?.length ? (
                <div className="info-container-ficha-dado">
                  Linha: <b>{produto.linha}</b>
                </div>
              ) : null}
            </div>
          </div>
        </div>) : (<div>Carregando...</div>)}
             
    </div>
  );
}

export default InfoProduto;

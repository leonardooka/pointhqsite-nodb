import React, { createRef, useContext, useState } from "react";
import MainContext from "../../context/MainContext";
import "./quantidade.css";

export default function Quantidade({ id, preço }) {
  const ref = createRef();
  const {
    valoresCarrinho,
    setValoresCarrinho,
    carrinho,
    setCarrinho,
    setPreçoTotal,
  } = useContext(MainContext);

  const produtoAtual = valoresCarrinho.filter((item) => item.id == id)[0];
  const indexValor = valoresCarrinho.indexOf(produtoAtual);

  const [preçoTotalProduto, setPreçoTotalProduto] = useState(preço);
  const [quantidade, setQuantidade] = useState(valoresCarrinho[indexValor].qtd);

  function atualizarValorProduto(qtd) {
    const valoresCarrinhoClone = valoresCarrinho;
    valoresCarrinhoClone[indexValor].qtd = qtd;

    setPreçoTotal(
      valoresCarrinhoClone
        .reduce((a, b) => {
          return a + b.preço * b.qtd;
        }, 0)
        .toFixed(2)
        .toString()
        .replace(".", ",")
    );

    setValoresCarrinho(valoresCarrinhoClone);
    setPreçoTotalProduto(preço * qtd);
    
    if (qtd !== quantidade) {
        setQuantidade(qtd);
    }
  }

  function handleChange() {
    atualizarValorProduto(Number(ref.current.value));
  }

  function handleClick(operator, preço) {
    let qtdAtual = Number(ref.current.value);
    let qtdAtualizada;
    let valorTotal;
    if (operator === "-" && qtdAtual > 1) {
      qtdAtualizada = qtdAtual - 1;
      valorTotal = preço * qtdAtualizada;
    }
    if (operator === "+") {
      qtdAtualizada = qtdAtual + 1;
      valorTotal = preço * qtdAtualizada;
    }

    if (valorTotal > 0) {
      setQuantidade(qtdAtualizada);
      ref.current.value = qtdAtualizada;
      atualizarValorProduto(qtdAtualizada);
    }
  }

  function handleClickExcluir() {
    const valoresCarrinhoClone = valoresCarrinho.filter(
      (item) => item.id !== id
    );
    const carrinhoClone = carrinho.filter((item) => item.id_produto !== id);
    setCarrinho(carrinhoClone);
    setValoresCarrinho(valoresCarrinhoClone);
  }

  return (
    <div className="qtd-wrapper">
      <div className="qtd-produto-preco">
        {quantidade +
          " x " +
          `R$${preço.toFixed(2).toString().replace(".", ",")}`}
      </div>
      <div className="qtd-container">
        <div>
          <i
            className="qtd-arrow fa-solid fa-circle-arrow-left"
            onClick={() => handleClick("-", preço)}
          ></i>
        </div>
        <input
          className="qtd-input"
          onChange={handleChange}
          value={quantidade}
          maxLength={3}
          ref={ref}
        />
        <div>
          <i
            className="qtd-arrow fa-solid fa-circle-arrow-right"
            onClick={() => handleClick("+", preço)}
          ></i>
        </div>
      </div>
      <div className="qtd-preco-total">
        {`R$${preçoTotalProduto.toFixed(2).toString().replace(".", ",")}`}
      </div>
      <button className="qtd-excluir-btn" onClick={handleClickExcluir}>
        <i className="qtd-excluir-icon fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
}

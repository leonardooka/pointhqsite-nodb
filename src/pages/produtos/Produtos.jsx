import { useContext, useEffect, useLayoutEffect, useState } from "react";
import MainContext from "../../context/MainContext";
import "./produtos.css";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";
import useWindowResize from "../../components/windowResize";
import Carrinho from "../../components/carrinho/Carrinho";
import { products } from "../../products";

export default function Produtos({ cat }) {
  const {
    setProdutos,
    produtos,
    searchInput,
    carrinho,
    setCarrinho,
    valoresCarrinho,
    setValoresCarrinho,
    setPreçoTotal,
  } = useContext(MainContext);

  const [columns, setColumns] = useState("auto auto auto auto auto auto");

  const windowSize = useWindowResize();

  useEffect(() => {
    if (windowSize > 1710) {
      setColumns("auto auto auto auto auto");
    } else if (windowSize > 1440) {
      setColumns("auto auto auto auto");
    } else if (windowSize > 1180) {
      setColumns("auto auto auto");
    } else if (windowSize > 900) {
      setColumns("auto auto");
    } else if (windowSize > 625) {
      setColumns("auto");
    } else {
      setColumns("auto");
    }
  }, [windowSize]);

  useEffect(() => {
    setProdutos(
      cat === "todos"
        ? products
        : products.filter((produto) => produto.categoria === cat)
    );
  }, [cat]);

  function handleClick(id) {
    const produtoAdicionado = produtos.filter(
      (item) => item.id_produto === id
    )[0];
    const carrinhoAtualizado = [...carrinho, produtoAdicionado];
    setCarrinho(carrinhoAtualizado);

    const totalAtual = valoresCarrinho;
    const valorAcumulado = [
      ...totalAtual,
      { id: id, preço: Number(produtoAdicionado.preço), qtd: 1 },
    ];
    setValoresCarrinho(valorAcumulado);
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

  return (
    <div id="wrapper">
      {cat !== "todos" && <div id="title">{cat.toUpperCase()}</div>}
      <Search />
      <div id="main-produtos-container">
        <div id="produtos-grid" style={{ gridTemplateColumns: columns }}>
          {searchInput?.length
            ? produtos?.map((item, index) => {
                if (
                  item.nome.toLowerCase().indexOf(searchInput.toLowerCase()) >
                  -1
                ) {
                  return (
                    <div className="produto-container" key={index}>
                      <div className="produto">
                        <div className="nome">
                          {`${item.nome} ${
                            item.volume ? "Vol. " + item.volume : ""
                          }`}
                        </div>
                        <Link to={`/produto/${item.id_produto}`}>
                          <div className="imagem">
                            {item.imagem ? (
                              <img src={item.imagem} />
                            ) : (
                              "SEM IMAGEM"
                            )}
                          </div>
                        </Link>
                        <div className="preço">{`R$${item.preço
                          .toFixed(2)
                          .toString()
                          .replace(".", ",")}`}</div>
                      </div>
                      {valoresCarrinho.some(
                        (valor) => valor.id === item.id_produto
                      ) ? (
                        <button className="adicionarBtn" disabled>
                          Adicionado
                          <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                      ) : (
                        <button
                          className="adicionarBtn"
                          onClick={() => handleClick(item.id_produto)}
                        >
                          Adicionar{" "}
                          <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                      )}
                    </div>
                  );
                }
              })
            : produtos?.map((item, index) => {
                return (
                  <div className="produto-container" key={index}>
                    <div className="produto">
                      <div className="nome">
                        {`${item.nome} ${
                          item.volume ? "Vol. " + item.volume : ""
                        }`}
                      </div>
                      <Link to={`/produto/${item.id_produto}`}>
                        <div className="imagem">
                          {item.imagem ? (
                            <img src={item.imagem} />
                          ) : (
                            "SEM IMAGEM"
                          )}
                        </div>
                      </Link>
                      <div className="preço">{`R$${item.preço
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}`}</div>
                    </div>
                    {valoresCarrinho.some(
                      (valor) => valor.id === item.id_produto
                    ) ? (
                      <button className="adicionarBtn" disabled>
                        Adicionado<i className="fa-solid fa-cart-shopping"></i>
                      </button>
                    ) : (
                      <button
                        className="adicionarBtn"
                        onClick={() => handleClick(item.id_produto)}
                      >
                        Adicionar <i className="fa-solid fa-cart-shopping"></i>
                      </button>
                    )}
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

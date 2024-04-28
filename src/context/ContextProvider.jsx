import React, { createContext, useEffect, useState } from "react";
import MainContext from "./MainContext";
import { products } from "../products";

const MainContextProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([
    "quadrinhos",
    "mangás",
    "cardgames",
    "boardgames",
    "rpgs",
  ]);
  const [produtos, setProdutos] = useState(products);
  const [screen, setScreen] = useState("principal");
  const [carrinho, setCarrinho] = useState([]);
  const [abrirCarrinho, setAbrirCarrinho] = useState(false);
  const [valoresCarrinho, setValoresCarrinho] = useState([]);
  const [preçoTotal, setPreçoTotal] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  return (
    <MainContext.Provider
      value={{
        categorias,
        setCategorias,
        produtos,
        setProdutos,
        screen,
        setScreen,
        searchInput,
        setSearchInput,
        showResults,
        setShowResults,
        results,
        setResults,
        carrinho,
        setCarrinho,
        abrirCarrinho,
        setAbrirCarrinho,
        valoresCarrinho,
        setValoresCarrinho,
        preçoTotal,
        setPreçoTotal
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

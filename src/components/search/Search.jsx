import { createRef, useContext, useEffect, useState } from "react";
import MainContext from "../../context/MainContext";
import './styles.css'

export default function Search() {
  const {
    produtos,
    searchInput,
    setSearchInput,
    showResults,
    setShowResults,
    results,
    setResults,
  } = useContext(MainContext);

  const ref = createRef();

  function handleChange(e) {
    const query = e.target.value.toString().toLowerCase();
    if (query.length > 1) {
      const produtosEncontrados = produtos.filter((item)=> item.nome.toLowerCase().indexOf(query) > -1).map(item => item.nome);
      setResults(produtosEncontrados);
      setShowResults(true);
    } else {
      setResults([])
      setShowResults(false);
      setSearchInput('');
    }
  }

  function handleClick() {
    if (results.length) {
      setSearchInput(ref.current.value);
    } else {
      setSearchInput('');
    }
    setShowResults(false);
    setResults([]);
    ref.current.value = searchInput;
  }

  function handleClickBtn() {
    if (results.length) {
      setSearchInput(ref.current.value)
    }
    setShowResults(false);
    setResults([]);
    if (ref.current.value === '') {setSearchInput('')};
  }

  return (
    <div id="search-wrapper">
      <div id="input-container">
        <input
          id="search-input"
          onChange={handleChange}
          placeholder="buscar produto"
          ref={ref}
        />
        <button id="search-btn" onClick={handleClickBtn}><i className="fa-solid fa-magnifying-glass"></i></button>
      </div>
      {showResults ? (
        <ul id="search-results">
          {results.map((produto, index) => {
            return (
              <li key={index} onClick={handleClick}>
                {produto} 
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

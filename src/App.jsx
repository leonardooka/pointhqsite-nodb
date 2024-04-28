import "./App.css";
import { Route, Routes } from "react-router-dom";
import InfoProduto from "./pages/info-produto/InfoProduto";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Produtos from "./pages/produtos/Produtos";

function App() {
  return (
    <div className="global-container">
      {/* <Testes /> */}
      <Header />
      <div id="main-container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Produtos cat={'todos'}/>} />
          <Route path="/mangas" element={<Produtos cat={'mangás'} />} />
          <Route path="/quadrinhos" element={<Produtos cat={'quadrinhos'} />} />
          <Route path="/cardgames" element={<Produtos cat={'cardgames'} />} />
          <Route path="/boardgames" element={<Produtos cat={'boardgames'} />} />
          <Route path="/rpgs" element={<Produtos cat={'rpgs'} />} />
          <Route path="/produto/:id" element={<InfoProduto />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;

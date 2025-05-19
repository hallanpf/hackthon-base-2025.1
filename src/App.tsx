import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import Footer from "./components/footer/footer"
import Personagem from "./pages/personagem/personagem";

const App = () => {

  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personagem" element={<Personagem />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  );
};

export default App;
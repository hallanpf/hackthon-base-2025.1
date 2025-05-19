import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import Footer from "./components/footer/footer"

const App = () => {

  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personagem/:id" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  );
};

export default App;
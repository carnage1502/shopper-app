import "./styles/styles.css";
import { Routes, Route } from "react-router-dom";

//Pages
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
//Components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="overflow-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Sidebar />
      <Footer />
    </div>
  );
};

export default App;

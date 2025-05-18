import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cart from "./pages/Cart";
import ProductLIst from "./pages/ProductLIst";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">E-commerce App</h1>
        <Routes>
          <Route path="/" element={<ProductLIst />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

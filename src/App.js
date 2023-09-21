import React from "react";
import HeaderNav from "./components/Header/Navbar/Navbar";
import Products from "./components/Products/Products";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <HeaderNav />
      <Products />
      <Footer />
    </div>
  );
}

export default App;

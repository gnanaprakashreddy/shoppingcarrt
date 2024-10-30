import { useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";

function App() {
  function handleClearCart() {
    setCartItems([]);
  }
  return (
    <>
      <Header />
      <Products />
    </>
  );
}
export default App;

import api from "./api";
import "./App.css";
import { useEffect } from "react";

function App() {
  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      console.log(res.data);
     // const products = res.data.products || [];
      //console.log("Fetched products:", products); // Log fetched products to console
      //return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Something went wrong");
    }
  };
  useEffect(() => {
    getProducts()
  }, [])


  return (
    <div className="App">
      <h1>Ecommerce App</h1>

    </div>
  );
}

export default App;

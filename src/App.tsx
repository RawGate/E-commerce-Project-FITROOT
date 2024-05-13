import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./components/ui/card";
import { Product } from "./types";
import api from "./api";
import "./App.css";

function App() {
  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      return res.data.products || [];
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong");
    }
  };

  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  });

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="App">
      <h1 className="text-2xl uppercase mb-10">Products</h1>

      <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
        {data && Array.isArray(data) && (
          data.map((product) => (
            <Card key={product.id} className="w-[350px]">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>Some Description here</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content Here</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to cart</Button>
              </CardFooter>
            </Card>
          ))
        )}
      </section>
    </div>
  );
}

export default App;


import { useState, useEffect } from "react";
import api from "../api";

//  Загрузка товров с сервера + для фильтрации
const useProducts = () => {
  // Состояния
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка товаров с сервера
  useEffect(() => {
    api
      .get("/products/")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки товаров", err);
        setError(err.message || "Ошибка загрузки");
        setLoading(false);
      });
  }, []);

  return {
    products,
    loading,
    error,
  };
};

export default useProducts;

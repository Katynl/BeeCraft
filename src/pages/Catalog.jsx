import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import {
  ShoppingCartIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";

const Catalog = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // Основные фильтры
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Временные значения для фильтра (пока не нажали "Применить")
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");
  const [tempSelectedCategories, setTempSelectedCategories] = useState([]);

  const [sortType, setSortType] = useState("default");
  const [loading, setLoading] = useState(true);

  // Загрузка товаров и категорий
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get("/products/"),
          api.get("/categories/"),
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Ошибка загрузки каталога", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // При открытии фильтра подставляем текущие значения
  useEffect(() => {
    if (filterOpen) {
      setTempMinPrice(minPrice);
      setTempMaxPrice(maxPrice);
      setTempSelectedCategories(selectedCategories);
    }
  }, [filterOpen, minPrice, maxPrice, selectedCategories]);

  // Фильтрация товаров
  const filterProducts = (list) => {
    let filtered = [...list];
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category?.id),
      );
    }
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (!isNaN(min)) filtered = filtered.filter((p) => p.price >= min);
    if (!isNaN(max)) filtered = filtered.filter((p) => p.price <= max);
    return filtered;
  };

  // Сортировка
  const sortProducts = (list) => {
    const sorted = [...list];
    if (sortType === "price_asc") sorted.sort((a, b) => a.price - b.price);
    else if (sortType === "price_desc")
      sorted.sort((a, b) => b.price - a.price);
    return sorted;
  };

  const filteredAndSorted = sortProducts(filterProducts(products));
  const isGrouped = sortType === "default" && selectedCategories.length === 0;

  // Компонент карточки товара
  const ProductCard = ({ product }) => (
    <div className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      <div
        onClick={() => navigate(`/catalog/${product.slug}`)}
        className="relative aspect-[3/4] overflow-hidden bg-stone-100 cursor-pointer"
      >
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 p-3">
          <h3 className="text-sm font-medium text-stone-800 line-clamp-2">
            {product.name}
          </h3>
          <span className="text-sm font-semibold text-stone-900 whitespace-nowrap">
            {product.price} ₽
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="w-full py-5 rounded-sm bg-stone-900 text-white text-sm hover:bg-[#f4d864] hover:text-stone-900 transition-colors duration-300 flex items-center justify-center gap-1"
        >
          <ShoppingCartIcon className="h-4 w-4" />
          <span>В корзину</span>
        </button>
      </div>
    </div>
  );

  // Рендер товаров
  const renderProducts = () => {
    if (filteredAndSorted.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-stone-400">
          <p>Товары не найдены</p>
          <button
            onClick={() => {
              setSelectedCategories([]);
              setMinPrice("");
              setMaxPrice("");
              setSortType("default");
            }}
            className="mt-4 text-sm text-stone-600 underline hover:text-stone-900"
          >
            Сбросить фильтры
          </button>
        </div>
      );
    }

    if (isGrouped) {
      const grouped = categories
        .map((cat) => ({
          ...cat,
          products: filteredAndSorted.filter((p) => p.category?.id === cat.id),
        }))
        .filter((group) => group.products.length > 0);

      return grouped.map((group) => (
        <div key={group.id} className="mb-12">
          <h2 className="text-xl font-light tracking-wide text-stone-600 mb-4 border-l-3 border-[#f4d864] pl-3">
            {group.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {group.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ));
    } else {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredAndSorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      );
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Загрузка...
      </div>
    );

  return (
    <div className="min-h-screen bg-stone-50 pt-28 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-stone-800">
            Каталог
          </h1>
          <div className="w-16 h-px bg-[#f4d864] mx-auto mt-2"></div>
        </div>

        {/* Панель управления (сортировка/фильтр) */}
        <div className="flex justify-between gap-3 mb-8">
          {/* Сортировка */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-1 px-4 py-2 text-sm bg-white rounded-sm shadow-sm hover:bg-stone-100 transition"
            >
              <ArrowsUpDownIcon className="h-4 w-4" />
              Сортировка
            </button>
            {sortOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-sm shadow-lg z-20 overflow-hidden border border-stone-100">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setSortType("default");
                      setSortOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      sortType === "default"
                        ? "bg-stone-100 text-stone-900"
                        : "text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    По умолчанию (категории)
                  </button>
                  <button
                    onClick={() => {
                      setSortType("price_asc");
                      setSortOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      sortType === "price_asc"
                        ? "bg-stone-100 text-stone-900"
                        : "text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    Цена: по возрастанию
                  </button>
                  <button
                    onClick={() => {
                      setSortType("price_desc");
                      setSortOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      sortType === "price_desc"
                        ? "bg-stone-100 text-stone-900"
                        : "text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    Цена: по убыванию
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Фильтр */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-sm bg-white shadow-sm hover:shadow-md transition-all duration-300"
            >
              <FunnelIcon className="h-4 w-4" />
              Фильтр
              {selectedCategories.length > 0 && (
                <span className="bg-[#f4d864] text-stone-800 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedCategories.length}
                </span>
              )}
            </button>
            {filterOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl z-20 p-5 border border-stone-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-stone-800">Фильтры</h3>
                  <button onClick={() => setFilterOpen(false)}>
                    <XMarkIcon className="h-5 w-5 text-stone-400 hover:text-stone-600" />
                  </button>
                </div>
                <div className="mb-4">
                  <label className="block text-xs uppercase tracking-wide text-stone-500 mb-2">
                    Цена (₽)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="от"
                      value={tempMinPrice}
                      onChange={(e) => setTempMinPrice(e.target.value)}
                      className="w-full border border-stone-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#f4d864]"
                    />
                    <input
                      type="number"
                      placeholder="до"
                      value={tempMaxPrice}
                      onChange={(e) => setTempMaxPrice(e.target.value)}
                      className="w-full border border-stone-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#f4d864]"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-wide text-stone-500 mb-2">
                    Категории
                  </label>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {categories.map((cat) => (
                      <label
                        key={cat.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={tempSelectedCategories.includes(cat.id)}
                          onChange={() => {
                            setTempSelectedCategories((prev) =>
                              prev.includes(cat.id)
                                ? prev.filter((id) => id !== cat.id)
                                : [...prev, cat.id],
                            );
                          }}
                          className="rounded-sm text-[#f4d864] focus:ring-0 focus:ring-offset-0"
                        />
                        <span className="text-sm text-stone-700">
                          {cat.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedCategories(tempSelectedCategories);
                      setMinPrice(tempMinPrice);
                      setMaxPrice(tempMaxPrice);
                      setFilterOpen(false);
                    }}
                    className="flex-1 bg-stone-900 text-white py-2 rounded-sm hover:bg-stone-700 transition"
                  >
                    Применить
                  </button>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="flex-1 border border-stone-300 py-2 rounded-sm hover:bg-stone-50 transition"
                  >
                    Отмена
                  </button>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setMinPrice("");
                    setMaxPrice("");
                    setTempSelectedCategories([]);
                    setTempMinPrice("");
                    setTempMaxPrice("");
                    setFilterOpen(false);
                  }}
                  className="w-full text-center text-xs text-stone-400 underline mt-3 hover:text-stone-600"
                >
                  Сбросить все
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Товары */}
        {renderProducts()}
      </div>
    </div>
  );
};

export default Catalog;

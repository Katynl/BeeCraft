import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import { useCart } from "../context/CartContext";
import { ShoppingCartIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const ProductPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${slug}/`);
        setProduct(res.data);
        if (res.data.category?.slug) {
          const similarRes = await api.get(
            `/products/?category=${res.data.category.slug}`,
          );
          const filtered = similarRes.data.filter((p) => p.slug !== slug);
          setSimilarProducts(filtered.slice(0, 4));
        }
      } catch (err) {
        console.error(err);
        setError("Товар не найден");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (val > 0) setQuantity(val);
  };

  const handleAddToCart = () => {
    if (addToCart) addToCart(product, quantity);
    else alert(`Добавлено в корзину: ${product.name} x${quantity}`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Загрузка...
      </div>
    );
  if (error || !product)
    return (
      <div className="text-center text-red-500 py-20">
        {error || "Товар не найден"}
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      {/* Хлебные крошки (тонкие, почти незаметные) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32">
        <div className="text-xs text-stone-300 tracking-wide uppercase mb-8">
          <Link to="/" className="hover:text-stone-500 transition">
            Главная
          </Link>{" "}
          /{" "}
          <Link to="/catalog" className="hover:text-stone-500 transition">
            Каталог
          </Link>{" "}
          / <span className="text-stone-500">{product.name}</span>
        </div>
      </div>

      {/* Основной блок – гибкая сетка */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Левая колонка: изображение с зумом при наведении */}
          <div className="lg:w-1/2">
            <div className="sticky top-24 overflow-hidden rounded-2xl bg-stone-50 group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* Правая колонка: информация */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="max-w-xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-stone-900 mb-4">
                {product.name}
              </h1>
              <div className="text-4xl font-medium text-stone-800 mb-8 border-b border-stone-100 pb-6">
                {product.price} ₽
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-400 mb-2">
                    Описание
                  </h2>
                  <p className="text-stone-600 leading-relaxed">
                    {product.description ||
                      "Этот товар станет идеальным дополнением вашего флористического проекта."}
                  </p>
                </div>
                {product.specifications && (
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-400 mb-2">
                      Характеристики
                    </h2>
                    <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                      {product.specifications}
                    </p>
                  </div>
                )}
              </div>

              {/* Выбор количества и корзина */}
              <div className="flex flex-col sm:flex-row gap-4 items-center pt-4 border-t border-stone-100">
                <div className="flex items-center border border-stone-200 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-900 transition"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 text-center py-2 focus:outline-none focus:ring-0 text-stone-800"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-900 transition"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-stone-900 text-white py-3 px-6 rounded-full hover:bg-[#f4d864] hover:text-stone-900 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>В корзину</span>
                  <ArrowRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Блок "Похожие товары" – элегантная сетка */}
        {similarProducts.length > 0 && (
          <div className="mt-24 md:mt-32">
            <h2 className="text-2xl font-light tracking-tight text-stone-900 mb-8 text-center md:text-left">
              Вам также может понравиться
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((similar) => (
                <Link
                  to={`/catalog/${similar.slug}`}
                  key={similar.id}
                  className="group block"
                >
                  <div className="aspect-square overflow-hidden rounded-xl bg-stone-100">
                    <img
                      src={similar.image}
                      alt={similar.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="text-sm font-medium text-stone-700 group-hover:text-stone-900 transition">
                      {similar.name}
                    </h3>
                    <p className="text-stone-500 text-sm mt-1">
                      {similar.price} ₽
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;

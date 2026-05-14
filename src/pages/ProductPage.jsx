import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import { useCart } from "../context/CartContext";
import {
  ShoppingCartIcon,
  ArrowLeftIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

const formatPrice = (price) => {
  const value = Number(price);

  if (Number.isNaN(value)) {
    return `${price} ₽`;
  }

  return `${value.toLocaleString("ru-RU")} ₽`;
};

const ProductPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const productRes = await api.get(`/products/${slug}/`);

        if (!isMounted) return;

        setProduct(productRes.data);

        if (productRes.data?.category?.slug) {
          const similarRes = await api.get(
            `/products/?category=${productRes.data.category.slug}`,
          );

          if (!isMounted) return;

          const filtered = Array.isArray(similarRes.data)
            ? similarRes.data.filter((item) => item.slug !== slug).slice(0, 4)
            : [];

          setSimilarProducts(filtered);
        } else {
          setSimilarProducts([]);
        }
      } catch (err) {
        console.error(err);

        if (isMounted) {
          setError("Товар не найден");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const categoryName = useMemo(() => {
    if (!product?.category) return "Каталог";

    if (typeof product.category === "object") {
      return product.category.name || "Каталог";
    }

    return "Каталог";
  }, [product]);

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);

    if (value > 0) {
      setQuantity(value);
    }
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (addToCart) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-50 px-4 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 h-4 w-56 animate-pulse bg-stone-50" />

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="aspect-[4/5] animate-pulse bg-stone-50" />

            <div className="space-y-6">
              <div className="h-16 w-3/4 animate-pulse bg-stone-50" />
              <div className="h-8 w-40 animate-pulse bg-stone-50" />
              <div className="h-32 w-full animate-pulse bg-stone-50" />
              <div className="h-14 w-full animate-pulse bg-stone-50" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-stone-50 px-4 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl bg-white p-8 text-center shadow-[0_18px_60px_rgba(41,37,36,0.06)]">
          <div className="mx-auto mb-6 h-px w-16 bg-[#d4aa2a]" />

          <h1 className="text-3xl font-light text-stone-800">
            Товар не найден
          </h1>

          <p className="mt-4 text-stone-500">
            Возможно, товар был удалён или ссылка устарела.
          </p>

          <Link
            to="/catalog"
            className="mt-8 inline-flex items-center justify-center bg-stone-800 px-7 py-4 text-sm uppercase tracking-[0.22em] text-[#d4aa2a] transition hover:bg-[#d4aa2a] hover:text-stone-800"
          >
            Вернуться в каталог
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-stone-50 text-stone-800">
      {/* БАННЕР */}
      <section className="relative border-b border-stone-200 pt-28 md:pt-32">
        <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[#d4aa2a]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 top-36 hidden text-[180px] font-black leading-none tracking-[-0.08em] text-stone-200/70 md:block">
          BEE
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 md:pb-14">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-stone-400">
            <Link to="/" className="transition hover:text-stone-800">
              Главная
            </Link>
            <span>/</span>
            <Link to="/catalog" className="transition hover:text-stone-800">
              Каталог
            </Link>
            <span>/</span>
            <span className="text-stone-600">{product.name}</span>
          </div>
          <Link
            to="/catalog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-stone-500 transition hover:text-stone-800"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Назад в каталог
          </Link>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            {/* КАРТИНКА */}
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 hidden h-full w-full border border-[#d4aa2a]/40 md:block" />

              <div className="relative z-10 overflow-hidden border border-stone-200 bg-white shadow-[0_24px_80px_rgba(41,37,36,0.10)]">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-[460px] w-full object-cover object-center sm:h-[620px] lg:h-[720px]"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
            {/* ИНФО */}
            <div className="lg:sticky lg:top-28">
              <div className="bg-white p-6 shadow-[0_18px_60px_rgba(41,37,36,0.06)] sm:p-8 lg:p-10">
                <div className="mb-4 inline-flex bg-[#d4aa2a]/20 px-4 py-2 text-xs uppercase tracking-[0.22em] text-stone-700">
                  {categoryName}
                </div>
                <h1 className="text-4xl font-light leading-[0.98] tracking-tight text-stone-800 sm:text-5xl lg:text-6xl">
                  {product.name}
                </h1>
                <div className="mt-7 flex items-end justify-between gap-6 border-b border-stone-200 pb-7">
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-[0.22em] text-stone-400">
                      Цена
                    </p>

                    <p className="text-3xl font-light text-stone-800 md:text-4xl">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  {product.is_new && (
                    <span className="bg-[#d4aa2a] px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-stone-800">
                      Новинка
                    </span>
                  )}
                </div>
                <div className="mt-8 space-y-8">
                  <section>
                    <h2 className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-400">
                      Описание
                    </h2>

                    <p className="whitespace-pre-line text-[15px] text-justify text-stone-600">
                      {product.description ||
                        "Описание пока не добавлено, но этот товар отлично подойдёт для флористики, упаковки и декоративных композиций."}
                    </p>
                  </section>
                  {product.specifications && (
                    <section className="border-t border-stone-200 pt-7">
                      <h2 className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-400">
                        Характеристики
                      </h2>

                      <p className="whitespace-pre-line text-[15px] leading-8 text-stone-600">
                        {product.specifications}
                      </p>
                    </section>
                  )}
                </div>
                <div className="mt-9 border-t border-stone-200 pt-7">
                  <div className="mb-4 text-xs uppercase tracking-[0.25em] text-stone-400">
                    Количество
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex h-14 items-center border border-stone-200 bg-stone-50">
                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        className="flex h-full w-14 items-center justify-center text-stone-500 transition hover:bg-white hover:text-stone-800"
                        aria-label="Уменьшить количество"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                        className="h-full w-16 border-x border-stone-200 bg-white text-center text-stone-800 outline-none"
                        aria-label="Количество товара"
                      />
                      <button
                        type="button"
                        onClick={increaseQuantity}
                        className="flex h-full w-14 items-center justify-center text-stone-500 transition hover:bg-white hover:text-stone-800"
                        aria-label="Увеличить количество"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="group flex h-14 flex-1 items-center justify-center gap-3 bg-stone-800 px-7 text-sm uppercase tracking-[0.2em] text-[#d4aa2a] transition hover:bg-[#d4aa2a] hover:text-stone-800 active:scale-[0.99]"
                    >
                      <ShoppingCartIcon className="h-5 w-5" />В корзину
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ПОХОЖИЕ ПОЗИЦИИ */}
      {similarProducts.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-5 flex items-center gap-4">
                  <div className="h-px w-10 bg-[#d4aa2a]" />
                  <span className="text-xs uppercase tracking-[0.28em] text-stone-500">
                    Похожие позиции
                  </span>
                </div>
                <h2 className="text-4xl font-light tracking-tight text-stone-800 md:text-5xl">
                  Вам может понравиться
                </h2>
              </div>
              <Link
                to="/catalog"
                className="text-sm uppercase tracking-[0.2em] text-stone-500 transition hover:text-stone-800"
              >
                Смотреть каталог →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similarProducts.map((similar) => (
                <Link
                  key={similar.id}
                  to={`/catalog/${similar.slug}`}
                  className="group transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                    <img
                      src={similar.image}
                      alt={similar.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex justify-between items-end">
                    <h3 className="line-clamp-2 text-xl font-light leading-snug text-stone-800">
                      {similar.name}
                    </h3>
                    <p className="mt-3 font-light text-xl text-stone-800">
                      {formatPrice(similar.price)}
                    </p>
                  </div>
                  <div className="mt-5 text-sm font-light uppercase tracking-[0.2em] text-[#b89422]">
                    Смотреть →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductPage;

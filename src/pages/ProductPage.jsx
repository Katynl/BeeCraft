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

const focusClass =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4aa2a] focus-visible:ring-offset-2";

const formatPrice = (price) => {
  const value = Number(price);
  return Number.isNaN(value)
    ? `${price} ₽`
    : `${value.toLocaleString("ru-RU")} ₽`;
};

const ProductPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartMessage, setCartMessage] = useState("");

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
    if (!product || !addToCart) return;

    addToCart(product, quantity);
    setCartMessage(
      `${product.name} добавлен в корзину, количество: ${quantity}`,
    );

    window.setTimeout(() => {
      setCartMessage("");
    }, 2500);
  };

  if (loading) {
    return (
      <main
        className="min-h-screen bg-stone-50 px-4 pt-28 sm:px-6 lg:px-8"
        aria-busy="true"
      >
        <div className="mx-auto max-w-7xl" role="status" aria-live="polite">
          <span className="sr-only">Загрузка товара</span>

          <div className="mb-8 h-4 w-56 animate-pulse bg-stone-200" />

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="aspect-[4/5] animate-pulse bg-stone-200" />

            <div className="space-y-6">
              <div className="h-16 w-3/4 animate-pulse bg-stone-200" />
              <div className="h-8 w-40 animate-pulse bg-stone-200" />
              <div className="h-32 w-full animate-pulse bg-stone-200" />
              <div className="h-14 w-full animate-pulse bg-stone-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-stone-50 px-4 pt-32 sm:px-6 lg:px-8">
        <section
          className="mx-auto max-w-xl bg-white p-8 text-center shadow-[0_18px_60px_rgba(41,37,36,0.06)]"
          role="alert"
          aria-labelledby="product-error-title"
        >
          <div
            className="mx-auto mb-6 h-px w-16 bg-[#d4aa2a]"
            aria-hidden="true"
          />

          <h1
            id="product-error-title"
            className="text-3xl font-light text-stone-800"
          >
            Товар не найден
          </h1>

          <p className="mt-4 text-stone-500">
            Возможно, товар был удалён или ссылка устарела.
          </p>

          <Link
            to="/catalog"
            className={`mt-8 inline-flex items-center justify-center bg-stone-800 px-7 py-4 text-sm uppercase tracking-[0.22em] text-[#d4aa2a] transition hover:bg-[#d4aa2a] hover:text-stone-800 ${focusClass}`}
          >
            Вернуться в каталог
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-stone-50 text-stone-800">
      <p className="sr-only" role="status" aria-live="polite">
        {cartMessage}
      </p>

      <section className="relative border-b border-stone-200 pt-28 md:pt-32">
        <div
          className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[#d4aa2a]/20 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -left-10 top-36 hidden text-[180px] font-black leading-none tracking-[-0.08em] text-stone-200/70 md:block"
          aria-hidden="true"
        >
          BEE
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 md:pb-14">
          <nav
            className="mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-stone-500"
            aria-label="Хлебные крошки"
          >
            <Link
              to="/"
              className={`transition hover:text-stone-800 ${focusClass}`}
            >
              Главная
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              to="/catalog"
              className={`transition hover:text-stone-800 ${focusClass}`}
            >
              Каталог
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-stone-700" aria-current="page">
              {product.name}
            </span>
          </nav>

          <Link
            to="/catalog"
            className={`mb-8 inline-flex items-center gap-2 text-sm text-stone-600 transition hover:text-stone-800 ${focusClass}`}
          >
            <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
            Назад в каталог
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="relative">
              <div
                className="absolute -bottom-4 -right-4 hidden h-full w-full border border-[#d4aa2a]/40 md:block"
                aria-hidden="true"
              />

              <div className="relative z-10 overflow-hidden border border-stone-200 bg-white shadow-[0_24px_80px_rgba(41,37,36,0.10)]">
                <img
                  src={product.image_url}
                  alt={product.name || "Товар Bee Craft"}
                  className="h-[460px] w-full object-cover object-center sm:h-[620px] lg:h-[720px]"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>

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
                    <p className="mb-1 text-xs uppercase tracking-[0.22em] text-stone-500">
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
                  <section aria-labelledby="product-description-title">
                    <h2
                      id="product-description-title"
                      className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-500"
                    >
                      Описание
                    </h2>

                    <p className="whitespace-pre-line text-left text-[15px] leading-7 text-stone-600">
                      {product.description ||
                        "Описание пока не добавлено, но этот товар отлично подойдёт для флористики, упаковки и декоративных композиций."}
                    </p>
                  </section>

                  {product.specifications && (
                    <section
                      className="border-t border-stone-200 pt-7"
                      aria-labelledby="product-specifications-title"
                    >
                      <h2
                        id="product-specifications-title"
                        className="mb-3 text-xs uppercase tracking-[0.25em] text-stone-500"
                      >
                        Характеристики
                      </h2>

                      <p className="whitespace-pre-line text-[15px] leading-8 text-stone-600">
                        {product.specifications}
                      </p>
                    </section>
                  )}
                </div>

                <div className="mt-9 border-t border-stone-200 pt-7">
                  <label
                    htmlFor="product-quantity"
                    className="mb-4 block text-xs uppercase tracking-[0.25em] text-stone-500"
                  >
                    Количество
                  </label>

                  <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-stretch">
                    <div className="flex h-14 w-fit items-center overflow-hidden border border-stone-200 bg-stone-50 sm:self-auto">
                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        className={`flex h-full w-11 items-center justify-center text-stone-500 transition hover:bg-white hover:text-stone-800 sm:w-14 ${focusClass}`}
                        aria-label={`Уменьшить количество товара ${product.name}`}
                      >
                        <MinusIcon aria-hidden="true" className="h-4 w-4" />
                      </button>

                      <input
                        id="product-quantity"
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                        inputMode="numeric"
                        className={`h-full w-14 border-x border-stone-200 bg-white text-center text-stone-800 outline-none sm:w-16 ${focusClass}`}
                      />

                      <button
                        type="button"
                        onClick={increaseQuantity}
                        className={`flex h-full w-11 items-center justify-center text-stone-500 transition hover:bg-white hover:text-stone-800 sm:w-14 ${focusClass}`}
                        aria-label={`Увеличить количество товара ${product.name}`}
                      >
                        <PlusIcon aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddToCart}
                      aria-label={`Добавить товар ${product.name} в корзину, количество: ${quantity}`}
                      className={`group flex h-14 w-full items-center justify-center gap-3 bg-stone-800 px-7 py-4 text-sm uppercase tracking-[0.2em] text-[#d4aa2a] transition hover:bg-[#d4aa2a] hover:text-stone-800 active:scale-[0.99] sm:flex-1 ${focusClass}`}
                    >
                      <ShoppingCartIcon
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {similarProducts.length > 0 && (
        <section
          className="py-20 md:py-28"
          aria-labelledby="similar-products-title"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-5 flex items-center gap-4">
                  <div className="h-px w-10 bg-[#d4aa2a]" aria-hidden="true" />
                  <span className="text-xs uppercase tracking-[0.28em] text-stone-500">
                    Похожие позиции
                  </span>
                </div>

                <h2
                  id="similar-products-title"
                  className="text-4xl font-light tracking-tight text-stone-800 md:text-5xl"
                >
                  Вам может понравиться
                </h2>
              </div>

              <Link
                to="/catalog"
                className={`text-sm uppercase tracking-[0.2em] text-stone-600 transition hover:text-stone-800 ${focusClass}`}
              >
                Смотреть каталог →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similarProducts.map((similar) => (
                <Link
                  key={similar.id}
                  to={`/catalog/${similar.slug}`}
                  aria-label={`Открыть похожий товар: ${similar.name}`}
                  className={`group transition-all duration-500 hover:-translate-y-1 ${focusClass}`}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                    <img
                      src={similar.image_url}
                      alt={similar.name || "Похожий товар Bee Craft"}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <h3 className="line-clamp-2 text-xl font-light leading-snug text-stone-800">
                      {similar.name}
                    </h3>

                    <p className="mt-3 shrink-0 text-xl font-light text-stone-800">
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

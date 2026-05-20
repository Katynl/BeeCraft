import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";

const focusClass =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4aa2a] focus-visible:ring-offset-2";

const formatPrice = (price) => {
  const value = Number(price);

  if (Number.isNaN(value)) {
    return `${price} ₽`;
  }

  return `${value.toLocaleString("ru-RU")} ₽`;
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const productName = product?.name || "Товар Bee Craft";
  const isAvailable = product?.in_stock !== false;

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addToCart(product);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm transition duration-500 hover:-translate-y-1">
      <button
        type="button"
        onClick={() => navigate(`/catalog/${product.slug}`)}
        className={`relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-stone-100 text-left ${focusClass}`}
        aria-label={`Открыть товар: ${productName}`}
      >
        <img
          src={product.image_url}
          alt={productName}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
          width="300"
          height="400"
        />

        {product.is_new && (
          <span className="absolute left-3 top-3 rounded-sm bg-[#d4aa2a] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-800">
            Новинка
          </span>
        )}

        {!isAvailable && (
          <span className="absolute inset-0 flex items-center justify-center bg-stone-900/45 text-sm font-medium uppercase tracking-[0.2em] text-white">
            Нет в наличии
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col justify-between">
        <div className="my-3 flex items-start justify-between gap-4">
          <h3 className="text-base font-medium leading-snug text-stone-800 md:text-lg">
            {productName}
          </h3>

          <span className="shrink-0 text-sm font-medium text-stone-800 md:text-lg">
            {formatPrice(product.price)}
          </span>
        </div>

        <button
          type="button"
          disabled={!isAvailable}
          aria-disabled={!isAvailable}
          aria-label={
            isAvailable
              ? `Добавить товар ${productName} в корзину`
              : `Товар ${productName} нет в наличии`
          }
          onClick={handleAddToCart}
          className={`flex w-full items-center justify-center gap-2 rounded-sm bg-stone-800 px-5 py-4 text-sm font-medium text-[#d4aa2a] transition duration-300 hover:bg-[#d4aa2a] hover:text-stone-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-stone-800 disabled:hover:text-[#d4aa2a] ${focusClass}`}
        >
          <ShoppingCartIcon className="h-4 w-4" aria-hidden="true" />
          <span>{isAvailable ? "В корзину" : "Нет в наличии"}</span>
        </button>
      </div>
    </article>
  );
};

export default ProductCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";

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

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm transition duration-500 hover:-translate-y-1">
      <button
        type="button"
        onClick={() => navigate(`/catalog/${product.slug}`)}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-stone-100 text-left"
        aria-label={`Открыть товар ${product.name}`}
      >
        <img
          src={product.image_url}
          alt={product.name}
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
      </button>

      <div className="flex flex-1 flex-col justify-between">
        <div className="my-3 flex items-start justify-between gap-4">
          <h3 className="text-base font-medium leading-snug text-stone-800 md:text-lg">
            {product.name}
          </h3>

          <span className="shrink-0 text-sm font-medium text-stone-800 md:text-lg">
            {formatPrice(product.price)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="flex w-full items-center justify-center gap-2 rounded-sm bg-stone-800 px-5 py-4 text-sm font-medium text-[#d4aa2a] transition duration-300 hover:bg-[#d4aa2a] hover:text-stone-800 active:scale-[0.99]"
        >
          <ShoppingCartIcon className="h-4 w-4" />
          <span>В корзину</span>
        </button>
      </div>
    </article>
  );
};

export default ProductCard;

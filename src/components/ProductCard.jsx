import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import useOnScreen from "../hooks/useOnScreen";
import { useCart } from "../context/CartContext";

// Карточки с товарами для главного экрана
const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [cardRef, isVisible] = useOnScreen({
    threshold: 0.1,
    rootMargin: "50px",
  });

  const animationClass =
    index % 2 === 0 ? "animate-in-bottom" : "animate-in-top";

  return (
    <div className="rounded-lg flex flex-col">
      <div
        ref={cardRef}
        className={`rounded-sm w-full aspect-[3/4] ${
          isVisible ? animationClass : "opacity-0 translate-y-10"
        }`}
      >
        <img
          src={product.image}
          alt=""
          onClick={() => navigate(`/catalog/${product.slug}`)}
          className="w-full h-full object-cover rounded-sm"
          loading="lazy"
          width="300"
          height="400"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <div className="my-3 flex items-start justify-between gap-4">
            <h3 className="text-base font-light leading-snug text-stone-800 md:text-xl">
              {product.name}
            </h3>

            <span className="shrink-0 font-light text-sm md:text-xl text-stone-800">
              {product.price} ₽
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="flex w-full items-center justify-center gap-2 bg-stone-800 px-5 py-4 text-sm text-[#d4aa2a] transition duration-300 hover:bg-[#d4aa2a] hover:text-stone-800 active:scale-[0.99]"
        >
          <ShoppingCartIcon className="h-4 w-4" />
          <span>В корзину</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

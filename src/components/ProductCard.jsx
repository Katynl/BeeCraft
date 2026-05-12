import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="rounded-lg flex flex-col hover:shadow-xl">
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
        <div className="flex justify-between py-2 gap-2 px-2">
          <p className="text-sm md:text-lg lg:text-xl text-left">
            {product.name}
          </p>
          <p className="text-sm md:text-lg lg:text-xl text-left">
            {product.price} р.
          </p>
        </div>

        <button
          onClick={() => addToCart(product)}
          aria-label="В корзину"
          className="p-5 w-full text-sm md:text-xl xl:text-2xl rounded-sm bg-stone-800 text-white hover:text-stone-900 hover:bg-[#f4d864] transition"
          // className="py-2 w-full text-sm md:text-xl xl:text-2xl rounded-sm bg-[#f0e5c7] text-black/50 hover:bg-[#f4d864] transition"
        >
          В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

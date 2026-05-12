import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { TrashIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white flex flex-col items-center justify-center px-4 py-32">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBagIcon className="h-12 w-12 text-stone-300" />
          </div>
          <h2 className="text-3xl font-light text-stone-800 mb-3">Корзина пуста</h2>
          <p className="text-stone-500 mb-8">Похоже, вы ещё не добавили ни одного товара.</p>
          <Link
            to="/catalog"
            className="inline-block px-6 py-3 bg-stone-800 text-white rounded-sm hover:bg-[#f4d864] hover:text-stone-800 transition duration-300"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-light tracking-tight text-stone-800 mb-8 text-center md:text-left">
          Корзина
          <span className="block w-12 h-0.5 bg-[#f4d864] mt-2 mx-auto md:mx-0"></span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Список товаров */}
          <div className="lg:w-2/3 space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <div className="w-24 h-24 flex-shrink-0 bg-stone-100 rounded-sm overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-stone-800 mb-1">{item.name}</h3>
                  <p className="text-stone-500 text-sm">{item.price} ₽ / шт</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-sm bg-stone-100 hover:bg-stone-200 transition flex items-center justify-center"
                  >
                    <MinusIcon className="h-4 w-4 text-stone-600" />
                  </button>
                  <span className="w-8 text-center text-stone-800 font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-sm bg-stone-100 hover:bg-stone-200 transition flex items-center justify-center"
                  >
                    <PlusIcon className="h-4 w-4 text-stone-600" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-stone-800">{item.price * item.quantity} ₽</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-stone-400 hover:text-rose-500 transition p-1"
                  aria-label="Удалить товар"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Итоговая карточка */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-sm shadow-md p-6 sticky top-28">
              <h3 className="text-xl font-medium text-stone-800 mb-4">Итого</h3>
              <div className="flex justify-between text-stone-600 border-b border-stone-100 pb-3 mb-4">
                <span>Сумма заказа:</span>
                <span className="font-semibold">{totalPrice} ₽</span>
              </div>
              <Link
                to="/checkout"
                className="block w-full text-center bg-stone-800 text-white py-3 rounded-sm hover:bg-[#f4d864] hover:text-stone-800 transition duration-300 font-medium"
              >
                Перейти к оформлению
              </Link>
              <p className="text-xs text-stone-400 text-center mt-4">
                Доступна оплата при получении
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;  
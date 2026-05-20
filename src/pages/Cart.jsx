import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  TrashIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const focusClass =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4aa2a] focus-visible:ring-offset-2";

const formatPrice = (price) => {
  const value = Number(price);

  if (Number.isNaN(value)) {
    return `${price} ₽`;
  }

  return `${value.toLocaleString("ru-RU")} ₽`;
};

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();
  const [cartMessage, setCartMessage] = useState("");

  const itemsCount = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const quantity = Number(item.quantity);
      return sum + (Number.isNaN(quantity) ? 0 : quantity);
    }, 0);
  }, [cartItems]);

  const setLiveMessage = (message) => {
    setCartMessage(message);

    window.setTimeout(() => {
      setCartMessage("");
    }, 2500);
  };

  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      removeFromCart(item.id);
      setLiveMessage(`${item.name} удалён из корзины`);
      return;
    }

    updateQuantity(item.id, item.quantity - 1);
    setLiveMessage(
      `Количество товара ${item.name} уменьшено до ${item.quantity - 1}`,
    );
  };

  const handleIncrease = (item) => {
    updateQuantity(item.id, item.quantity + 1);
    setLiveMessage(
      `Количество товара ${item.name} увеличено до ${item.quantity + 1}`,
    );
  };

  const handleRemove = (item) => {
    removeFromCart(item.id);
    setLiveMessage(`${item.name} удалён из корзины`);
  };

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen overflow-hidden bg-stone-50 text-stone-800">
        <section
          className="relative flex min-h-screen items-center justify-center px-4 pb-16 pt-24"
          aria-labelledby="empty-cart-title"
        >
          <div
            className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-[#d4aa2a]/20 blur-3xl"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -left-8 top-32 hidden select-none text-[180px] font-black leading-none tracking-[-0.08em] text-stone-200/70 md:block"
            aria-hidden="true"
          >
            BEE
          </div>

          <div className="relative z-10 w-full max-w-xl border border-stone-200 bg-white px-6 py-12 text-center shadow-[0_18px_60px_rgba(41,37,36,0.06)] sm:px-10">
            <div
              className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#d4aa2a]/20"
              aria-hidden="true"
            >
              <ShoppingBagIcon className="h-11 w-11 text-stone-800" />
            </div>

            <div
              className="mb-6 flex items-center justify-center gap-4"
              aria-hidden="true"
            >
              <div className="h-px w-10 bg-[#d4aa2a]" />
              <span className="text-xs uppercase tracking-[0.28em] text-stone-500">
                Bee Craft
              </span>
              <div className="h-px w-10 bg-[#d4aa2a]" />
            </div>

            <h1
              id="empty-cart-title"
              className="text-4xl font-light tracking-tight text-stone-800 md:text-5xl"
            >
              Корзина пуста
            </h1>

            <p className="mt-5 leading-relaxed text-stone-600">
              Похоже, вы ещё не добавили товары. Загляните в каталог — там уже
              ждут ленты, сухоцветы и детали для красивых композиций.
            </p>

            <Link
              to="/catalog"
              className={`mt-9 inline-flex items-center justify-center gap-3 bg-stone-800 px-8 py-4 text-sm uppercase tracking-[0.2em] text-[#d4aa2a] transition duration-300 hover:bg-[#d4aa2a] hover:text-stone-800 ${focusClass}`}
            >
              Перейти в каталог
              <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-stone-50 text-stone-800">
      <p className="sr-only" role="status" aria-live="polite">
        {cartMessage}
      </p>

      <section
        className="relative border-b border-stone-200 pt-28 md:pt-32"
        aria-labelledby="cart-title"
      >
        <div
          className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[#d4aa2a]/20 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -left-8 top-36 hidden select-none text-[180px] font-black leading-none tracking-[-0.08em] text-stone-200/70 md:block"
          aria-hidden="true"
        >
          BEE
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 md:pb-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1
                id="cart-title"
                className="text-5xl font-light leading-[0.95] tracking-tight text-stone-800 md:text-7xl lg:text-8xl"
              >
                Корзина
              </h1>

              <p className="mt-8 max-w-2xl text-base italic leading-relaxed text-stone-600 md:text-lg">
                Проверьте выбранные материалы, измените количество и перейдите к
                оформлению заказа.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-[320px]">
              <div className="border border-stone-200 bg-white px-5 py-4">
                <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
                  Товаров
                </p>
                <p className="mt-2 text-3xl font-light text-stone-800">
                  {itemsCount}
                </p>
              </div>

              <div className="border border-stone-200 bg-white px-5 py-4">
                <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
                  Сумма
                </p>
                <p className="mt-2 text-3xl font-light text-stone-800">
                  {formatPrice(totalPrice)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" aria-label="Содержимое корзины">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
          <section className="space-y-4" aria-label="Товары в корзине">
            {cartItems.map((item) => {
              const itemTotal = Number(item.price) * Number(item.quantity);
              const productName = item.name || "Товар Bee Craft";

              return (
                <article
                  key={item.id}
                  className="group border border-stone-200 bg-white p-4 transition-all duration-500 hover:border-[#d4aa2a]/60 hover:shadow-[0_18px_60px_rgba(41,37,36,0.07)] sm:p-5"
                >
                  <div className="grid gap-5 sm:grid-cols-[120px_1fr] lg:grid-cols-[130px_1fr_auto] lg:items-center">
                    <Link
                      to={`/catalog/${item.slug}`}
                      aria-label={`Открыть товар: ${productName}`}
                      className={`block aspect-square overflow-hidden bg-stone-100 ${focusClass}`}
                    >
                      <img
                        src={item.image_url || item.image}
                        alt={productName}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                    </Link>

                    <div>
                      <Link
                        to={`/catalog/${item.slug}`}
                        className={`text-xl font-light leading-tight text-stone-800 transition hover:text-black md:text-2xl ${focusClass}`}
                      >
                        {productName}
                      </Link>

                      <p className="mt-3 text-sm text-stone-600">
                        {formatPrice(item.price)} / шт.
                      </p>

                      <div className="mt-5 flex w-fit items-center border border-stone-200 bg-stone-50">
                        <button
                          type="button"
                          onClick={() => handleDecrease(item)}
                          className={`flex h-10 w-10 items-center justify-center text-stone-500 transition hover:bg-white hover:text-stone-800 ${focusClass}`}
                          aria-label={
                            item.quantity <= 1
                              ? `Удалить товар ${productName} из корзины`
                              : `Уменьшить количество товара ${productName}`
                          }
                        >
                          <MinusIcon aria-hidden="true" className="h-4 w-4" />
                        </button>

                        <span
                          className="flex h-10 min-w-12 items-center justify-center border-x border-stone-200 bg-white px-4 text-sm text-stone-800"
                          aria-label={`Количество товара ${productName}: ${item.quantity}`}
                        >
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleIncrease(item)}
                          className={`flex h-10 w-10 items-center justify-center text-stone-500 transition hover:bg-white hover:text-stone-800 ${focusClass}`}
                          aria-label={`Увеличить количество товара ${productName}`}
                        >
                          <PlusIcon aria-hidden="true" className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-6 border-t border-stone-100 pt-5 lg:block lg:border-t-0 lg:pt-0 lg:text-right">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                          Итого
                        </p>

                        <p className="mt-2 text-2xl font-light text-stone-800">
                          {formatPrice(itemTotal)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemove(item)}
                        className={`inline-flex h-11 w-11 items-center justify-center border border-stone-200 text-stone-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500 lg:mt-5 ${focusClass}`}
                        aria-label={`Удалить товар ${productName} из корзины`}
                      >
                        <TrashIcon aria-hidden="true" className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          <aside
            className="h-fit lg:sticky lg:top-28"
            aria-label="Сводка заказа"
          >
            <div className="border border-stone-200 bg-white p-6 shadow-[0_18px_60px_rgba(41,37,36,0.06)] sm:p-8">
              <div className="mb-7 flex items-center gap-4" aria-hidden="true">
                <div className="h-px w-10 bg-[#d4aa2a]" />
                <span className="text-xs uppercase tracking-[0.25em] text-stone-500">
                  Оформление
                </span>
              </div>

              <h2 className="text-3xl font-light tracking-tight text-stone-800">
                Ваш заказ
              </h2>

              <div className="mt-7 space-y-4 border-y border-stone-100 py-6">
                <div className="flex justify-between gap-4 text-stone-600">
                  <span>Товары</span>
                  <span>{itemsCount} шт.</span>
                </div>

                <div className="flex justify-between gap-4 text-stone-600">
                  <span>Сумма заказа</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>

                <div className="flex justify-between gap-4 text-stone-600">
                  <span>Оплата</span>
                  <span>при получении</span>
                </div>
              </div>

              <div className="mt-7 flex items-end justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.25em] text-stone-500">
                  Итого
                </span>

                <span className="text-4xl font-light tracking-tight text-stone-800">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <Link
                to="/checkout"
                className={`mt-8 flex w-full items-center justify-center gap-3 bg-stone-800 px-7 py-4 text-sm uppercase tracking-[0.2em] text-[#d4aa2a] transition duration-300 hover:bg-[#d4aa2a] hover:text-stone-800 ${focusClass}`}
              >
                Перейти к оформлению
                <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
              </Link>

              <Link
                to="/catalog"
                className={`mt-3 flex w-full items-center justify-center border border-stone-200 bg-white px-7 py-4 text-sm text-stone-600 transition hover:border-[#d4aa2a] hover:text-stone-800 ${focusClass}`}
              >
                Продолжить покупки
              </Link>

              <p className="mt-5 text-center text-xs text-stone-500">
                После оформления мы свяжемся с вами для подтверждения заказа.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Cart;

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  TrashIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const formatPrice = (price) => {
  const value = Number(price);

  if (Number.isNaN(value)) {
    return `${price} ₽`;
  }

  return `${value.toLocaleString("ru-RU")} ₽`;
};

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();

  const itemsCount = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const quantity = Number(item.quantity);
      return sum + (Number.isNaN(quantity) ? 0 : quantity);
    }, 0);
  }, [cartItems]);

  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      removeFromCart(item.id);
      return;
    }

    updateQuantity(item.id, item.quantity - 1);
  };

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-stone-80 text-stone-800 overflow-hidden">
        <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16">
          <div className="absolute top-24 right-0 w-72 h-72 bg-[#d4aa2a]/20 blur-3xl rounded-full pointer-events-none" />

          <div className="absolute -left-8 top-32 hidden md:block text-[180px] font-black leading-none tracking-[-0.08em] text-stone-200/70 pointer-events-none select-none">
            BEE
          </div>

          <div className="relative z-10 w-full max-w-xl bg-white border border-stone-200 px-6 py-12 sm:px-10 text-center shadow-[0_18px_60px_rgba(41,37,36,0.06)]">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#d4aa2a]/20">
              <ShoppingBagIcon className="h-11 w-11 text-stone-800" />
            </div>

            <div className="mb-6 flex items-center justify-center gap-4">
              <div className="h-px w-10 bg-[#d4aa2a]" />
              <span className="text-xs uppercase tracking-[0.28em] text-stone-400">
                Bee Craft
              </span>
              <div className="h-px w-10 bg-[#d4aa2a]" />
            </div>

            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-stone-800">
              Корзина пуста
            </h1>

            <p className="mt-5 text-stone-500 leading-relaxed">
              Похоже, вы ещё не добавили товары. Загляните в каталог — там уже
              ждут ленты, сухоцветы и детали для красивых композиций.
            </p>

            <Link
              to="/catalog"
              className="mt-9 inline-flex items-center justify-center gap-3 bg-stone-800 px-8 py-4 text-sm uppercase tracking-[0.2em] text-[#d4aa2a] transition duration-300 hover:bg-[#d4aa2a] hover:text-stone-800"
            >
              Перейти в каталог
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-stone-50 text-stone-800">
      {/* HERO */}
      <section className="relative border-b border-stone-200 pt-28 md:pt-32">
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-[#d4aa2a]/20 blur-3xl pointer-events-none" />

        <div className="absolute -left-8 top-36 hidden md:block text-[180px] font-black leading-none tracking-[-0.08em] text-stone-200/70 pointer-events-none select-none">
          BEE
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 md:pb-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-5xl font-light leading-[0.95] tracking-tight text-stone-800 md:text-7xl lg:text-8xl">
                Корзина
              </h1>

              <p className="mt-8 italic max-w-2xl text-base leading-relaxed text-stone-500 md:text-lg">
                Проверьте выбранные материалы, измените количество и перейдите к
                оформлению заказа.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-[320px]">
              <div className="border border-stone-200 bg-white px-5 py-4">
                <p className="text-xs uppercase tracking-[0.25em] text-stone-400">
                  Товаров
                </p>
                <p className="mt-2 text-3xl font-light text-stone-800">
                  {itemsCount}
                </p>
              </div>

              <div className="border border-stone-200 bg-white px-5 py-4">
                <p className="text-xs uppercase tracking-[0.25em] text-stone-400">
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

      {/* CONTENT */}
      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
          {/* CART ITEMS */}
          <section className="space-y-4">
            {cartItems.map((item) => {
              const itemTotal = Number(item.price) * Number(item.quantity);

              return (
                <article
                  key={item.id}
                  className="group border border-stone-200 bg-white p-4 sm:p-5 transition-all duration-500 hover:border-[#d4aa2a]/60 hover:shadow-[0_18px_60px_rgba(41,37,36,0.07)]"
                >
                  <div className="grid gap-5 sm:grid-cols-[120px_1fr] lg:grid-cols-[130px_1fr_auto] lg:items-center">
                    <Link
                      to={`/catalog/${item.slug}`}
                      className="block aspect-square overflow-hidden bg-stone-100"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                    </Link>

                    <div>
                      <Link
                        to={`/catalog/${item.slug}`}
                        className="text-xl font-light leading-tight text-stone-800 transition hover:text-black md:text-2xl"
                      >
                        {item.name}
                      </Link>

                      <p className="mt-3 text-sm text-stone-500">
                        {formatPrice(item.price)} / шт.
                      </p>

                      <div className="mt-5 flex w-fit items-center border border-stone-200 bg-stone-50">
                        <button
                          type="button"
                          onClick={() => handleDecrease(item)}
                          className="flex h-10 w-10 items-center justify-center text-stone-500 transition hover:bg-white hover:text-stone-800"
                          aria-label="Уменьшить количество"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>

                        <span className="flex h-10 min-w-12 items-center justify-center border-x border-stone-200 bg-white px-4 text-sm text-stone-800">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-10 w-10 items-center justify-center text-stone-500 transition hover:bg-white hover:text-stone-800"
                          aria-label="Увеличить количество"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-6 border-t border-stone-100 pt-5 lg:block lg:border-t-0 lg:pt-0 lg:text-right">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-stone-400">
                          Итого
                        </p>

                        <p className="mt-2 text-2xl font-light text-stone-800">
                          {formatPrice(itemTotal)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="inline-flex h-11 w-11 items-center justify-center border border-stone-200 text-stone-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500 lg:mt-5"
                        aria-label="Удалить товар"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          {/* SUMMARY */}
          <aside className="lg:sticky lg:top-28 h-fit">
            <div className="border border-stone-200 bg-white p-6 shadow-[0_18px_60px_rgba(41,37,36,0.06)] sm:p-8">
              <div className="mb-7 flex items-center gap-4">
                <div className="h-px w-10 bg-[#d4aa2a]" />
                <span className="text-xs uppercase tracking-[0.25em] text-stone-400">
                  Оформление
                </span>
              </div>

              <h2 className="text-3xl font-light tracking-tight text-stone-800">
                Ваш заказ
              </h2>

              <div className="mt-7 space-y-4 border-y border-stone-100 py-6">
                <div className="flex justify-between gap-4 text-stone-500">
                  <span>Товары</span>
                  <span>{itemsCount} шт.</span>
                </div>

                <div className="flex justify-between gap-4 text-stone-500">
                  <span>Сумма заказа</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>

                <div className="flex justify-between gap-4 text-stone-500">
                  <span>Оплата</span>
                  <span>при получении</span>
                </div>
              </div>

              <div className="mt-7 flex items-end justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.25em] text-stone-400">
                  Итого
                </span>

                <span className="text-4xl font-light tracking-tight text-stone-800">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <Link
                to="/checkout"
                className="mt-8 flex w-full items-center justify-center gap-3 bg-stone-800 px-7 py-4 text-sm uppercase tracking-[0.2em] text-[#d4aa2a] transition duration-300 hover:bg-[#d4aa2a] hover:text-stone-800"
              >
                Перейти к оформлению
                <ArrowRightIcon className="h-4 w-4" />
              </Link>

              <Link
                to="/catalog"
                className="mt-3 flex w-full items-center justify-center border border-stone-200 bg-white px-7 py-4 text-sm text-stone-600 transition hover:border-[#d4aa2a] hover:text-stone-800"
              >
                Продолжить покупки
              </Link>

              <p className="mt-5 text-center text-xs text-stone-400">
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

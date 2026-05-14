import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api";
import {
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftEllipsisIcon,
  CreditCardIcon,
  BanknotesIcon,
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const formatPrice = (price) => {
  const value = Number(price);

  if (Number.isNaN(value)) {
    return `${price} ₽`;
  }

  return `${value.toLocaleString("ru-RU")} ₽`;
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
    payment_method: "card",
    pickup_location: "ул. Уткинская, д. 38",
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const itemsCount = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const quantity = Number(item.quantity);
      return sum + (Number.isNaN(quantity) ? 0 : quantity);
    }, 0);
  }, [cartItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim()
    ) {
      alert("Пожалуйста, заполните имя, телефон и email");
      return;
    }

    setLoading(true);

    const orderData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      comment: formData.comment.trim() || "",
      payment_method: formData.payment_method,
      pickup_location: formData.pickup_location,
      total: totalPrice,
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      if (formData.payment_method === "card") {
        const paymentConfirmed = window.confirm(
          "Оплата прошла успешно! Нажмите ОК, чтобы подтвердить заказ.",
        );

        if (!paymentConfirmed) {
          setLoading(false);
          return;
        }
      }

      await api.post("/orders/", orderData);

      clearCart();

      alert("Заказ успешно создан! Спасибо за покупку.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(
        "Ошибка при оформлении заказа: " + JSON.stringify(err.response?.data),
      );
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) return null;

  const inputClass =
    "w-full border border-stone-200 bg-stone-50 px-4 py-4 pl-11 text-stone-800 placeholder:text-stone-400 outline-none transition focus:border-[#d4aa2a] focus:bg-white";

  return (
    <main className="min-h-screen overflow-hidden bg-stone-50 text-stone-800">
      {/* HERO */}
      <section className="relative border-b border-stone-200 pt-28 md:pt-32">
        <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[#d4aa2a]/20 blur-3xl" />

        <div className="pointer-events-none absolute -left-10 top-36 hidden select-none text-[180px] font-black leading-none tracking-[-0.08em] text-stone-200/70 md:block">
          BEE
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 md:pb-16">
          <Link
            to="/cart"
            className="mb-8 inline-flex items-center gap-2 text-sm text-stone-500 transition hover:text-stone-800"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Назад в корзину
          </Link>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-5xl font-light leading-[0.95] tracking-tight text-stone-800 md:text-7xl lg:text-8xl">
                Оформление
                <br />
                заказа
              </h1>

              <p className="mt-8 italic max-w-2xl text-base leading-relaxed text-stone-500 md:text-lg">
                Заполните контактные данные, выберите способ оплаты и удобный
                магазин для самовывоза.
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
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
          {/* FORM */}
          <form
            id="checkout-form"
            onSubmit={handleSubmit}
            className="border border-stone-200 bg-white p-6 shadow-[0_18px_60px_rgba(41,37,36,0.06)] sm:p-8 lg:p-10"
          >
            <div className="mb-8">
              <div className="mb-5 flex items-center gap-4">
                <div className="h-px w-10 bg-[#d4aa2a]" />
                <span className="text-xs uppercase tracking-[0.25em] text-stone-400">
                  Контакты
                </span>
              </div>

              <h2 className="text-3xl font-light tracking-tight text-stone-800 md:text-4xl">
                Данные получателя
              </h2>

              <p className="mt-3 italic w-full text-center text-stone-500">
                Мы используем эти данные только для подтверждения и выдачи
                заказа.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="relative md:col-span-1">
                <UserIcon className="absolute left-4 top-[20px] h-5 w-5 text-stone-400" />

                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div className="relative md:col-span-1">
                <PhoneIcon className="absolute left-4 top-[20px] h-5 w-5 text-stone-400" />

                <input
                  type="tel"
                  name="phone"
                  placeholder="+7..."
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div className="relative md:col-span-2">
                <EnvelopeIcon className="absolute left-4 top-[20px] h-5 w-5 text-stone-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div className="relative md:col-span-2">
                <ChatBubbleLeftEllipsisIcon className="absolute left-4 top-[20px] h-5 w-5 text-stone-400" />

                <textarea
                  name="comment"
                  placeholder="Комментарий к заказу, если нужно"
                  value={formData.comment}
                  onChange={handleChange}
                  rows="4"
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            {/* OPTIONS */}
            <div className="mt-10 border-t border-stone-200 pt-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px w-10 bg-[#d4aa2a]" />
                <span className="text-xs uppercase tracking-[0.25em] text-stone-400">
                  Оплата и самовывоз
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-stone-400">
                    Способ оплаты
                  </p>

                  <div className="space-y-3">
                    <label
                      className={`flex cursor-pointer items-center gap-4 border px-4 py-4 transition ${
                        formData.payment_method === "card"
                          ? "border-[#d4aa2a] bg-[#d4aa2a]/10"
                          : "border-stone-200 bg-stone-50 hover:border-[#d4aa2a]/60"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value="card"
                        checked={formData.payment_method === "card"}
                        onChange={handleChange}
                        className="accent-[#d4aa2a]"
                      />

                      <CreditCardIcon className="h-5 w-5 text-stone-600" />

                      <span className="text-stone-700">Банковская карта</span>
                    </label>

                    <label
                      className={`flex cursor-pointer items-center gap-4 border px-4 py-4 transition ${
                        formData.payment_method === "cash"
                          ? "border-[#d4aa2a] bg-[#d4aa2a]/10"
                          : "border-stone-200 bg-stone-50 hover:border-[#d4aa2a]/60"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value="cash"
                        checked={formData.payment_method === "cash"}
                        onChange={handleChange}
                        className="accent-[#d4aa2a]"
                      />

                      <BanknotesIcon className="h-5 w-5 text-stone-600" />

                      <span className="text-stone-700">
                        Наличные при получении
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-xs uppercase tracking-[0.2em] text-stone-400">
                    Магазин самовывоза
                  </label>

                  <div className="relative">
                    <BuildingStorefrontIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />

                    <select
                      name="pickup_location"
                      value={formData.pickup_location}
                      onChange={handleChange}
                      className="w-full appearance-none border border-stone-200 bg-stone-50 px-4 py-4 pl-11 text-stone-800 outline-none transition focus:border-[#d4aa2a] focus:bg-white"
                    >
                      <option value="ул. Уткинская, д. 38">
                        ул. Уткинская, д. 38"
                      </option>
                      <option value="ул. Светланская, д. 15">
                        ул. Светланская, д. 15
                      </option>
                    </select>
                  </div>

                  <div className="mt-4 border-l-4 border-[#d4aa2a] bg-stone-50 px-4 py-3 text-sm leading-relaxed text-stone-500">
                    После оформления заказа мы свяжемся с вами для
                    подтверждения.
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* SUMMARY */}
          <aside className="lg:sticky lg:top-28 h-fit">
            <div className="overflow-hidden border border-stone-200 bg-white shadow-[0_18px_60px_rgba(41,37,36,0.06)]">
              <div className="border-b border-stone-100 p-6 sm:p-8">
                <div className="mb-5 flex items-center gap-4">
                  <div className="h-px w-10 bg-[#d4aa2a]" />
                  <span className="text-xs uppercase tracking-[0.25em] text-stone-400">
                    Сводка
                  </span>
                </div>

                <h2 className="flex items-center gap-3 text-3xl font-light tracking-tight text-stone-800">
                  <ShoppingBagIcon className="h-7 w-7 text-[#d4aa2a]" />
                  Ваш заказ
                </h2>
              </div>

              <div className="max-h-[420px] divide-y divide-stone-100 overflow-y-auto">
                {cartItems.map((item) => {
                  const itemTotal = Number(item.price) * Number(item.quantity);

                  return (
                    <div key={item.id} className="flex gap-4 p-5">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="h-20 w-20 shrink-0 object-cover bg-stone-100"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-base font-light leading-snug text-stone-800">
                          {item.name}
                        </h3>

                        <p className="mt-2 text-sm text-stone-500">
                          {formatPrice(item.price)} × {item.quantity} шт.
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-base font-medium text-stone-800">
                          {formatPrice(itemTotal)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-stone-100 bg-stone-50 p-6 sm:p-8">
                <div className="space-y-4">
                  <div className="flex justify-between gap-4 text-stone-500">
                    <span>Товары</span>
                    <span>{itemsCount} шт.</span>
                  </div>

                  <div className="flex justify-between gap-4 text-stone-500">
                    <span>Сумма заказа</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>

                  <div className="flex justify-between gap-4 text-stone-500">
                    <span>Самовывоз</span>
                    <span className="text-right">
                      {formData.pickup_location}
                    </span>
                  </div>
                </div>

                <div className="mt-7 border-t border-stone-200 pt-6">
                  <div className="flex items-end justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.25em] text-stone-400">
                      Итого
                    </span>

                    <span className="text-4xl font-light tracking-tight text-stone-800">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={loading}
                  className="mt-8 flex w-full items-center justify-center gap-3 bg-stone-800 px-7 py-4 text-sm uppercase tracking-[0.2em] text-[#d4aa2a] transition duration-300 hover:bg-[#d4aa2a] hover:text-stone-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Оформляем...
                    </>
                  ) : (
                    <>
                      Оформить заказ
                      <ArrowRightIcon className="h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs leading-relaxed text-stone-400">
                  Нажимая «Оформить заказ», вы соглашаетесь с условиями
                  обработки данных.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Checkout;

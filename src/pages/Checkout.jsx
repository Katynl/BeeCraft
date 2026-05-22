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

const focusClass =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4aa2a] focus-visible:ring-offset-2";

const inputClass = `w-full border border-stone-200 bg-stone-50 px-4 py-4 pl-11 text-stone-800
  placeholder:text-stone-500 outline-none transition focus:border-[#d4aa2a]
  focus:bg-white focus:ring-2 focus:ring-[#d4aa2a]/20 ${focusClass}`;

const formatPrice = (price) => {
  const value = Number(price);

  return Number.isNaN(value)
    ? `${price} ₽`
    : `${value.toLocaleString("ru-RU")} ₽`;
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  const [formError, setFormError] = useState("");
  const [formStatus, setFormStatus] = useState("");

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
  }, [cartItems.length, navigate]);

  useEffect(() => {
    let isMounted = true;

    const fetchProfileForCheckout = async () => {
      if (cartItems.length === 0) return;

      const token = localStorage.getItem("access_token");

      if (!token) {
        localStorage.setItem("redirectAfterLogin", "/checkout");
        navigate("/login");
        return;
      }

      setProfileLoading(true);

      try {
        const response = await api.get("/profile/");

        if (!isMounted) return;

        const user = response.data;

        const fullName = [user.first_name, user.last_name]
          .filter(Boolean)
          .join(" ")
          .trim();

        setFormData((prev) => ({
          ...prev,
          name: prev.name || fullName || user.username || "",
          phone: prev.phone || user.phone || "",
          email: prev.email || user.email || "",
        }));
      } catch (err) {
        console.error(err);

        if (!isMounted) return;

        if (err.response?.status === 401) {
          localStorage.setItem("redirectAfterLogin", "/checkout");
          navigate("/login");
          return;
        }

        setFormStatus(
          "Не получилось автоматически подставить данные профиля. Можно заполнить вручную.",
        );
      } finally {
        if (isMounted) {
          setProfileLoading(false);
        }
      }
    };

    fetchProfileForCheckout();

    return () => {
      isMounted = false;
    };
  }, [cartItems.length, navigate]);

  const itemsCount = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const quantity = Number(item.quantity);
      return sum + (Number.isNaN(quantity) ? 0 : quantity);
    }, 0);
  }, [cartItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormError("");
    setFormStatus("");

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Введите имя получателя";
    if (!formData.phone.trim()) return "Введите телефон";
    if (!formData.email.trim()) return "Введите email";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      return "Введите корректный email";
    }

    if (!cartItems.length) {
      return "Корзина пуста";
    }

    const hasInvalidItem = cartItems.some((item) => {
      const quantity = Number(item.quantity);
      return !item.id || Number.isNaN(quantity) || quantity <= 0;
    });

    if (hasInvalidItem) {
      return "В корзине есть товар с некорректным количеством";
    }

    return "";
  };

  const getErrorMessage = (err) => {
    const data = err.response?.data;

    if (!data) {
      return "Ошибка при оформлении заказа. Попробуйте ещё раз.";
    }

    if (typeof data === "string") {
      return data;
    }

    if (typeof data === "object") {
      return Object.entries(data)
        .map(([field, messages]) => {
          const fieldNames = {
            name: "Имя",
            phone: "Телефон",
            email: "Email",
            comment: "Комментарий",
            payment_method: "Способ оплаты",
            pickup_location: "Пункт самовывоза",
            items: "Товары",
            detail: "Ошибка",
            non_field_errors: "Ошибка",
          };

          const label = fieldNames[field] || field;

          if (Array.isArray(messages)) {
            return `${label}: ${messages.join(" ")}`;
          }

          if (typeof messages === "object") {
            return `${label}: ${JSON.stringify(messages)}`;
          }

          return `${label}: ${messages}`;
        })
        .join("\n");
    }

    return "Ошибка при оформлении заказа. Попробуйте ещё раз.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setLoading(true);
    setFormError("");
    setFormStatus(
      formData.payment_method === "card"
        ? "Имитируем оплату картой и оформляем заказ..."
        : "Оформляем заказ...",
    );

    const orderData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      comment: formData.comment.trim() || "",
      payment_method: formData.payment_method,
      pickup_location: formData.pickup_location,
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: Number(item.quantity),
      })),
    };

    try {
      const response = await api.post("/orders/", orderData);

      clearCart();
      navigate(`/profile/orders/${response.data.id}`);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        localStorage.setItem("redirectAfterLogin", "/checkout");
        navigate("/login");
        return;
      }

      setFormError(getErrorMessage(err));
    } finally {
      setLoading(false);
      setFormStatus("");
    }
  };

  if (cartItems.length === 0) return null;

  return (
    <main className="min-h-screen overflow-hidden bg-stone-50 text-stone-800">
      <section className="relative border-b border-stone-200 pt-28 md:pt-32">
        <div
          className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[#d4aa2a]/20 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -left-10 top-36 hidden select-none text-[180px] font-black leading-none tracking-[-0.08em] text-stone-200/70 md:block"
          aria-hidden="true"
        >
          BEE
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 md:pb-16">
          <Link
            to="/cart"
            className={`mb-8 inline-flex items-center gap-2 text-sm text-stone-600 transition hover:text-stone-800 ${focusClass}`}
          >
            <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
            Назад в корзину
          </Link>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-5xl font-light leading-[0.95] tracking-tight text-stone-800 md:text-7xl lg:text-8xl">
                Оформление
                <br />
                заказа
              </h1>

              <p className="mt-8 max-w-2xl text-base italic leading-relaxed text-stone-600 md:text-lg">
                Заполните контактные данные, выберите способ оплаты и удобный
                магазин для самовывоза.
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

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
          <form
            id="checkout-form"
            onSubmit={handleSubmit}
            noValidate
            className="border border-stone-200 bg-white p-6 shadow-[0_18px_60px_rgba(41,37,36,0.06)] sm:p-8 lg:p-10"
          >
            <div className="mb-8">
              <div className="mb-5 flex items-center gap-4" aria-hidden="true">
                <div className="h-px w-10 bg-[#d4aa2a]" />
                <span className="text-xs uppercase tracking-[0.25em] text-stone-500">
                  Контакты
                </span>
              </div>

              <h2 className="text-3xl font-light tracking-tight text-stone-800 md:text-4xl">
                Данные получателя
              </h2>

              <p className="mt-3 w-full text-center italic text-stone-600">
                Мы используем эти данные только для подтверждения и выдачи
                заказа.
              </p>
            </div>

            {profileLoading && (
              <div
                role="status"
                aria-live="polite"
                className="mb-6 border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600"
              >
                Подставляем данные из профиля...
              </div>
            )}

            {formError && (
              <div
                role="alert"
                className="mb-6 whitespace-pre-line border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
              >
                {formError}
              </div>
            )}

            {formStatus && (
              <div
                role="status"
                aria-live="polite"
                className="mb-6 border border-[#d4aa2a]/40 bg-[#d4aa2a]/10 px-4 py-3 text-sm text-stone-800"
              >
                {formStatus}
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <div className="relative md:col-span-1">
                <label htmlFor="checkout-name" className="sr-only">
                  Ваше имя
                </label>

                <UserIcon
                  aria-hidden="true"
                  className="absolute left-4 top-[20px] h-5 w-5 text-stone-400"
                />

                <input
                  id="checkout-name"
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={Boolean(formError && !formData.name.trim())}
                  className={inputClass}
                />
              </div>

              <div className="relative md:col-span-1">
                <label htmlFor="checkout-phone" className="sr-only">
                  Телефон
                </label>

                <PhoneIcon
                  aria-hidden="true"
                  className="absolute left-4 top-[20px] h-5 w-5 text-stone-400"
                />

                <input
                  id="checkout-phone"
                  type="tel"
                  name="phone"
                  placeholder="+7..."
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={Boolean(formError && !formData.phone.trim())}
                  className={inputClass}
                />
              </div>

              <div className="relative md:col-span-2">
                <label htmlFor="checkout-email" className="sr-only">
                  Email
                </label>

                <EnvelopeIcon
                  aria-hidden="true"
                  className="absolute left-4 top-[20px] h-5 w-5 text-stone-400"
                />

                <input
                  id="checkout-email"
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={Boolean(formError && !formData.email.trim())}
                  className={inputClass}
                />
              </div>

              <div className="relative md:col-span-2">
                <label htmlFor="checkout-comment" className="sr-only">
                  Комментарий к заказу
                </label>

                <ChatBubbleLeftEllipsisIcon
                  aria-hidden="true"
                  className="absolute left-4 top-[20px] h-5 w-5 text-stone-400"
                />

                <textarea
                  id="checkout-comment"
                  name="comment"
                  placeholder="Комментарий к заказу, если нужно"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            <div className="mt-10 border-t border-stone-200 pt-8">
              <div className="mb-6 flex items-center gap-4" aria-hidden="true">
                <div className="h-px w-10 bg-[#d4aa2a]" />
                <span className="text-xs uppercase tracking-[0.25em] text-stone-500">
                  Оплата и самовывоз
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <fieldset>
                  <legend className="mb-3 text-xs uppercase tracking-[0.2em] text-stone-500">
                    Способ оплаты
                  </legend>

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
                        className={`accent-[#d4aa2a] ${focusClass}`}
                      />

                      <CreditCardIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-stone-600"
                      />

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
                        className={`accent-[#d4aa2a] ${focusClass}`}
                      />

                      <BanknotesIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-stone-600"
                      />

                      <span className="text-stone-700">
                        Наличные при получении
                      </span>
                    </label>
                  </div>
                </fieldset>

                <div>
                  <label
                    htmlFor="pickup-location"
                    className="mb-3 block text-xs uppercase tracking-[0.2em] text-stone-500"
                  >
                    Магазин самовывоза
                  </label>

                  <div className="relative">
                    <BuildingStorefrontIcon
                      aria-hidden="true"
                      className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
                    />

                    <select
                      id="pickup-location"
                      name="pickup_location"
                      value={formData.pickup_location}
                      onChange={handleChange}
                      className={`w-full appearance-none border border-stone-200 bg-stone-50 px-4 py-4 pl-11 text-stone-800 outline-none transition focus:border-[#d4aa2a] focus:bg-white ${focusClass}`}
                    >
                      <option value="ул. Уткинская, д. 38">
                        ул. Уткинская, д. 38
                      </option>

                      <option value="ул. Светланская, д. 15">
                        ул. Светланская, д. 15
                      </option>
                    </select>
                  </div>

                  <div className="mt-4 border-l-4 border-[#d4aa2a] bg-stone-50 px-4 py-3 text-sm leading-relaxed text-stone-600">
                    После оформления заказа мы свяжемся с вами для
                    подтверждения.
                  </div>
                </div>
              </div>
            </div>
          </form>

          <aside className="h-fit lg:sticky lg:top-28">
            <div className="overflow-hidden border border-stone-200 bg-white shadow-[0_18px_60px_rgba(41,37,36,0.06)]">
              <div className="border-b border-stone-100 p-6 sm:p-8">
                <div
                  className="mb-5 flex items-center gap-4"
                  aria-hidden="true"
                >
                  <div className="h-px w-10 bg-[#d4aa2a]" />
                  <span className="text-xs uppercase tracking-[0.25em] text-stone-500">
                    Сводка
                  </span>
                </div>

                <h2 className="flex items-center gap-3 text-3xl font-light tracking-tight text-stone-800">
                  <ShoppingBagIcon
                    aria-hidden="true"
                    className="h-7 w-7 text-[#d4aa2a]"
                  />
                  Ваш заказ
                </h2>
              </div>

              <div className="max-h-[420px] divide-y divide-stone-100 overflow-y-auto">
                {cartItems.map((item) => {
                  const itemTotal = Number(item.price) * Number(item.quantity);

                  return (
                    <div key={item.id} className="flex gap-4 p-5">
                      <img
                        src={item.image_url || item.image}
                        alt={item.name || "Товар Bee Craft"}
                        loading="lazy"
                        decoding="async"
                        className="h-20 w-20 shrink-0 bg-stone-100 object-cover"
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
                  <div className="flex justify-between gap-4 text-stone-600">
                    <span>Товары</span>
                    <span>{itemsCount} шт.</span>
                  </div>

                  <div className="flex justify-between gap-4 text-stone-600">
                    <span>Сумма заказа</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>

                  <div className="flex justify-between gap-4 text-stone-600">
                    <span>Самовывоз</span>
                    <span className="text-right">
                      {formData.pickup_location}
                    </span>
                  </div>
                </div>

                <div className="mt-7 border-t border-stone-200 pt-6">
                  <div className="flex items-end justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.25em] text-stone-500">
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
                  disabled={loading || profileLoading}
                  aria-busy={loading || profileLoading}
                  className={`mt-8 flex w-full items-center justify-center gap-3 bg-stone-800 px-7 py-4 text-sm uppercase tracking-[0.2em] text-[#d4aa2a] transition duration-300 hover:bg-[#d4aa2a] hover:text-stone-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 ${focusClass}`}
                >
                  {loading ? (
                    <>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                      >
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
                  ) : profileLoading ? (
                    "Загружаем данные..."
                  ) : (
                    <>
                      Оформить заказ
                      <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs leading-relaxed text-stone-500">
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

import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const getStatusText = (status) => {
  const statusMap = {
    new: "Новый",
    preparing: "Готовится",
    ready: "Готов к выдаче",
    completed: "Выдан",
    cancelled: "Отменён",
  };

  return statusMap[status] || status || "Неизвестно";
};

const getStatusClasses = (status) => {
  const classes = {
    new: "bg-[#d4aa2a]/20 text-stone-800 border-[#d4aa2a]/50",
    preparing: "bg-sky-50 text-sky-700 border-sky-200",
    ready: "bg-emerald-50 text-emerald-700 border-emerald-200",
    completed: "bg-stone-100 text-stone-500 border-stone-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return classes[status] || "bg-stone-100 text-stone-500 border-stone-200";
};

const formatPrice = (price) => {
  const value = Number(price);

  if (Number.isNaN(value)) {
    return `${price} ₽`;
  }

  return `${value.toLocaleString("ru-RU")} ₽`;
};

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/orders/my/${id}/`);

        if (isMounted) {
          setOrder(response.data);
        }
      } catch (err) {
        console.error(err);

        if (!isMounted) return;

        if (err.response?.status === 404) {
          setError("Заказ не найден");
        } else if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError("Ошибка загрузки заказа");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchOrder();

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const itemsCount = useMemo(() => {
    if (!order?.items) return 0;

    return order.items.reduce((sum, item) => {
      const quantity = Number(item.quantity);
      return sum + (Number.isNaN(quantity) ? 0 : quantity);
    }, 0);
  }, [order]);

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-50 px-4 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 h-5 w-60 animate-pulse bg-stone-200" />

          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="h-72 animate-pulse border border-stone-200 bg-white" />
            <div className="h-72 animate-pulse border border-stone-200 bg-white" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
        <div className="max-w-md border border-stone-200 bg-white p-8 text-center shadow-[0_18px_60px_rgba(41,37,36,0.06)]">
          <div className="mx-auto mb-6 h-px w-16 bg-[#d4aa2a]" />

          <h1 className="text-3xl font-light text-stone-800">Ошибка</h1>

          <p className="mt-4 text-stone-500">{error}</p>

          <Link
            to="/profile"
            className="mt-8 inline-flex items-center justify-center bg-stone-800 px-8 py-4 text-sm uppercase tracking-[0.2em] text-[#d4aa2a] transition hover:bg-[#d4aa2a] hover:text-stone-800"
          >
            В личный кабинет
          </Link>
        </div>
      </main>
    );
  }

  if (!order) return null;

  return (
    <main className="min-h-screen overflow-hidden bg-stone-50 text-stone-800">
      {/* HERO */}
      <section className="relative border-b border-stone-200 pt-28 md:pt-32">
        <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[#d4aa2a]/20 blur-3xl" />

        <div className="pointer-events-none absolute -left-10 top-36 hidden text-[180px] font-black leading-none tracking-[-0.08em] text-stone-200/70 md:block">
          BEE
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8 md:pb-16">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-stone-400">
            <Link to="/" className="transition hover:text-stone-800">
              Главная
            </Link>

            <span>/</span>

            <Link to="/profile" className="transition hover:text-stone-800">
              Профиль
            </Link>

            <span>/</span>

            <span className="text-stone-600">Заказ №{order.id}</span>
          </div>

          <Link
            to="/profile"
            className="mb-8 inline-flex items-center gap-2 text-sm text-stone-500 transition hover:text-stone-800"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Вернуться в личный кабинет
          </Link>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-5xl font-light leading-[0.95] tracking-tight text-stone-800 md:text-7xl">
                Заказ №{order.id}
              </h1>

              <p className="mt-8 italic max-w-2xl text-base leading-relaxed text-stone-500 md:text-lg">
                Детали заказа, товары, контакты получателя и информация о
                выдаче.
              </p>
            </div>

            <div
              className={`w-fit border px-5 py-3 text-xs uppercase tracking-[0.22em] ${getStatusClasses(
                order.status,
              )}`}
            >
              {getStatusText(order.status)}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          {/* LEFT INFO */}
          <aside className="space-y-5">
            <div className="border border-stone-200 bg-white p-6 shadow-[0_18px_60px_rgba(41,37,36,0.05)] sm:p-8">
              <div className="mb-7 flex items-center gap-4">
                <div className="h-px w-10 bg-[#d4aa2a]" />
                <span className="text-xs uppercase tracking-[0.25em] text-stone-400">
                  Информация
                </span>
              </div>

              <div className="space-y-5">
                <div className="flex gap-4 border-b border-stone-100 pb-5">
                  <CalendarDaysIcon className="mt-1 h-5 w-5 shrink-0 text-[#d4aa2a]" />

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                      Дата заказа
                    </p>

                    <p className="mt-1 text-stone-800">
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 border-b border-stone-100 pb-5">
                  <CreditCardIcon className="mt-1 h-5 w-5 shrink-0 text-[#d4aa2a]" />

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                      Оплата
                    </p>

                    <p className="mt-1 text-stone-800">
                      {order.payment_method === "card"
                        ? "Банковская карта"
                        : "Наличные при получении"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-[#d4aa2a]" />

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                      Самовывоз
                    </p>

                    <p className="mt-1 text-stone-800">
                      {order.pickup_location || "Не указан"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-stone-200 bg-white p-6 sm:p-8">
              <div className="mb-7 flex items-center gap-4">
                <div className="h-px w-10 bg-[#d4aa2a]" />
                <span className="text-xs uppercase tracking-[0.25em] text-stone-400">
                  Получатель
                </span>
              </div>

              <div className="space-y-5">
                <div className="flex gap-4 border-b border-stone-100 pb-5">
                  <UserIcon className="mt-1 h-5 w-5 shrink-0 text-[#d4aa2a]" />

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                      Имя
                    </p>

                    <p className="mt-1 text-stone-800">{order.name || "—"}</p>
                  </div>
                </div>

                <div className="flex gap-4 border-b border-stone-100 pb-5">
                  <PhoneIcon className="mt-1 h-5 w-5 shrink-0 text-[#d4aa2a]" />

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                      Телефон
                    </p>

                    <p className="mt-1 text-stone-800">{order.phone || "—"}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <EnvelopeIcon className="mt-1 h-5 w-5 shrink-0 text-[#d4aa2a]" />

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                      Email
                    </p>

                    <p className="mt-1 break-all text-stone-800">
                      {order.email || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {order.comment && (
              <div className="border-l-4 border-[#d4aa2a] bg-white p-6 text-stone-600 shadow-[0_14px_45px_rgba(41,37,36,0.04)]">
                <p className="mb-2 text-xs uppercase tracking-[0.22em] text-stone-400">
                  Комментарий
                </p>

                <p className="leading-relaxed">{order.comment}</p>
              </div>
            )}
          </aside>

          {/* ORDER ITEMS */}
          <section className="border border-stone-200 bg-white p-6 shadow-[0_18px_60px_rgba(41,37,36,0.05)] sm:p-8">
            <div className="mb-8 flex flex-col gap-5 border-b border-stone-100 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-px w-10 bg-[#d4aa2a]" />
                  <span className="text-xs uppercase tracking-[0.25em] text-stone-400">
                    Состав заказа
                  </span>
                </div>

                <h2 className="text-3xl font-light tracking-tight text-stone-800 md:text-4xl">
                  Товары
                </h2>
              </div>

              <div className="flex items-center gap-3 text-stone-500">
                <ShoppingBagIcon className="h-5 w-5" />
                <span className="text-sm">{itemsCount} шт.</span>
              </div>
            </div>

            <div className="space-y-4">
              {order.items?.map((item) => {
                const price = Number(item.price);
                const quantity = Number(item.quantity);
                const total =
                  !Number.isNaN(price) && !Number.isNaN(quantity)
                    ? price * quantity
                    : item.price;

                return (
                  <div
                    key={item.id}
                    className="group border border-stone-200 bg-stone-50 p-5 transition hover:border-[#d4aa2a]/60 hover:bg-white"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-xl font-light leading-tight text-stone-800">
                          {item.product_name}
                        </h3>

                        <p className="mt-2 text-sm text-stone-500">
                          Количество: {item.quantity} шт.
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-2xl font-light text-stone-800">
                          {formatPrice(total)}
                        </p>

                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-400">
                          {formatPrice(item.price)} / шт.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 border-t border-stone-200 pt-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-stone-400">
                    Итого к оплате
                  </p>

                  <p className="mt-2 text-stone-500">
                    Сумма всех товаров в заказе
                  </p>
                </div>

                <p className="text-4xl font-light tracking-tight text-stone-800">
                  {formatPrice(order.total)}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-between gap-3 sm:flex-row">
              <Link
                to="/profile"
                className="inline-flex items-center justify-center gap-2 border border-stone-300 bg-white px-7 py-4 text-sm text-stone-600 transition hover:border-[#d4aa2a] hover:text-stone-800"
              >
                <ArrowLeftIcon className="h-4 w-4" />В личный кабинет
              </Link>

              <Link
                to="/catalog"
                className="inline-flex items-center justify-center bg-stone-800 px-7 py-4 text-sm uppercase tracking-[0.2em] text-[#d4aa2a] transition hover:bg-[#d4aa2a] hover:text-stone-800"
              >
                В каталог
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default OrderDetail;

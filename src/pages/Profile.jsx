import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import {
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const focusClass =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4aa2a] focus-visible:ring-offset-2";

const inputClass = `w-full border border-stone-200 bg-stone-50 px-4 py-4 text-stone-800
  outline-none transition focus:border-[#d4aa2a] focus:bg-white
  focus:ring-2 focus:ring-[#d4aa2a]/20 ${focusClass}`;

const getStatusText = (status) => {
  const statusMap = {
    new: "Новый",
    preparing: "Готовится",
    ready: "Готов к выдаче",
    completed: "Выдан",
    cancelled: "Отменён",
  };

  return statusMap[status] || status;
};

const getStatusClasses = (status) => {
  const classes = {
    new: "bg-[#d4aa2a]/20 text-stone-800 border-[#d4aa2a]/40",
    preparing: "bg-sky-50 text-sky-700 border-sky-200",
    ready: "bg-emerald-50 text-emerald-700 border-emerald-200",
    completed: "bg-stone-100 text-stone-500 border-stone-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return classes[status] || "bg-stone-100 text-stone-500 border-stone-200";
};

const formatPrice = (price) => {
  const value = Number(price);
  return Number.isNaN(value)
    ? `${price} ₽`
    : `${value.toLocaleString("ru-RU")} ₽`;
};

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [profileRes, ordersRes] = await Promise.all([
          api.get("/profile/"),
          api.get("/orders/my/"),
        ]);

        if (!isMounted) return;

        setProfile(profileRes.data);
        setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);

        setEditForm({
          username: profileRes.data.username || "",
          email: profileRes.data.email || "",
          phone: profileRes.data.phone || "",
        });
      } catch (err) {
        console.error(err);

        if (!isMounted) return;

        setError("Не удалось загрузить данные");

        if (err.response?.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          navigate("/login");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const totalOrders = orders.length;

  const totalSpent = useMemo(() => {
    return orders.reduce((sum, order) => {
      const value = Number(order.total);
      return Number.isNaN(value) ? sum : sum + value;
    }, 0);
  }, [orders]);

  const lastOrderDate = useMemo(() => {
    if (!orders.length) return "—";

    const sorted = [...orders].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );

    return new Date(sorted[0].created_at).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [orders]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSaveError("");
    setSaveMessage("");

    setEditForm({
      username: profile?.username || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveError("");
    setSaveMessage("");

    try {
      const response = await api.put("/profile/", {
        username: editForm.username.trim(),
        email: editForm.email.trim(),
        phone: editForm.phone.trim(),
      });

      setProfile(response.data);
      setIsEditing(false);
      setSaveMessage("Профиль обновлён");
    } catch (err) {
      console.error(err);
      setSaveError("Ошибка сохранения. Попробуйте ещё раз.");
    }
  };

  if (loading) {
    return (
      <main
        className="min-h-screen bg-stone-50 px-4 pt-32 sm:px-6 lg:px-8"
        aria-busy="true"
      >
        <div className="mx-auto max-w-7xl" role="status" aria-live="polite">
          <span className="sr-only">Загрузка профиля</span>
          <div className="mb-10 h-12 w-72 animate-pulse bg-stone-200" />
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="h-96 animate-pulse border border-stone-200 bg-white" />
            <div className="h-96 animate-pulse border border-stone-200 bg-white" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6">
        <section
          className="max-w-md border border-stone-200 bg-white p-8 text-center shadow-[0_18px_60px_rgba(41,37,36,0.06)]"
          role="alert"
          aria-labelledby="profile-error-title"
        >
          <div
            className="mx-auto mb-6 h-px w-16 bg-[#d4aa2a]"
            aria-hidden="true"
          />

          <h1
            id="profile-error-title"
            className="text-3xl font-light text-stone-800"
          >
            Ошибка
          </h1>

          <p className="mt-4 text-stone-500">{error}</p>

          <Link
            to="/"
            className={`mt-8 inline-flex bg-stone-800 px-8 py-4 text-sm uppercase tracking-[0.2em] text-[#d4aa2a] transition hover:bg-[#d4aa2a] hover:text-stone-800 ${focusClass}`}
          >
            На главную
          </Link>
        </section>
      </main>
    );
  }

  if (!profile) return null;

  const userInitial =
    profile.username?.trim()?.slice(0, 1).toUpperCase() || "U";

  return (
    <main className="min-h-screen overflow-hidden bg-stone-50 text-stone-800">
      <section className="relative border-b border-stone-200 pt-28 md:pt-32">
        <div
          className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[#d4aa2a]/20 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -left-8 top-36 hidden text-[180px] font-black leading-none tracking-[-0.08em] text-stone-200/70 md:block"
          aria-hidden="true"
        >
          BEE
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 md:pb-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-5xl font-light leading-[0.95] tracking-tight text-stone-800 md:text-7xl lg:text-8xl">
                Профиль
              </h1>

              <p className="mt-8 max-w-2xl text-base italic leading-relaxed text-stone-600 md:text-lg">
                Добро пожаловать, {profile.username}. Здесь можно посмотреть
                заказы, обновить контактные данные и вернуться к любимым
                материалам Bee Craft.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className={`inline-flex w-fit items-center gap-3 border border-stone-300 bg-white px-6 py-4 text-sm text-stone-600 transition hover:border-[#d4aa2a] hover:text-stone-800 ${focusClass}`}
            >
              <ArrowRightOnRectangleIcon
                aria-hidden="true"
                className="h-5 w-5"
              />
              Выйти
            </button>
          </div>
        </div>
      </section>

      <section
        className="border-b border-stone-200 bg-stone-50 py-6"
        aria-label="Статистика профиля"
      >
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            { label: "Заказов", value: totalOrders },
            { label: "Сумма заказов", value: formatPrice(totalSpent) },
            { label: "Последний заказ", value: lastOrderDate },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-stone-200 bg-white px-6 py-5"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-light text-stone-800">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <aside>
            <div className="border border-stone-200 bg-white p-6 shadow-[0_18px_60px_rgba(41,37,36,0.05)] sm:p-8">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d4aa2a]/20 text-stone-800 ring-1 ring-[#d4aa2a]/30"
                    aria-hidden="true"
                  >
                    <span className="text-2xl font-light uppercase tracking-tight">
                      {userInitial}
                    </span>
                  </div>
                </div>

                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(true);
                      setSaveError("");
                      setSaveMessage("");
                    }}
                    className={`flex h-10 w-10 items-center justify-center border border-stone-200 text-stone-400 transition hover:border-[#d4aa2a] hover:text-stone-800 ${focusClass}`}
                    aria-label="Редактировать профиль"
                  >
                    <PencilIcon aria-hidden="true" className="h-5 w-5" />
                  </button>
                )}
              </div>

              {saveMessage && (
                <p
                  role="status"
                  className="mb-5 border border-[#d4aa2a]/40 bg-[#d4aa2a]/10 px-4 py-3 text-sm text-stone-800"
                >
                  {saveMessage}
                </p>
              )}

              {saveError && (
                <p
                  role="alert"
                  className="mb-5 border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
                >
                  {saveError}
                </p>
              )}

              {!isEditing ? (
                <div className="space-y-6">
                  <div className="border-b border-stone-100 pb-5">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-stone-500">
                      Имя пользователя
                    </p>
                    <p className="text-lg text-stone-800">{profile.username}</p>
                  </div>

                  <div className="border-b border-stone-100 pb-5">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-stone-500">
                      Email
                    </p>
                    <p className="break-all text-lg text-stone-800">
                      {profile.email}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-stone-500">
                      Телефон
                    </p>
                    <p className="text-lg text-stone-800">
                      {profile.phone || "Не указан"}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSave} className="space-y-5" noValidate>
                  <div>
                    <label
                      htmlFor="profile-username"
                      className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-500"
                    >
                      Имя пользователя
                    </label>

                    <input
                      id="profile-username"
                      type="text"
                      value={editForm.username}
                      autoComplete="username"
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      required
                      aria-required="true"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="profile-email"
                      className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-500"
                    >
                      Email
                    </label>

                    <input
                      id="profile-email"
                      type="email"
                      value={editForm.email}
                      autoComplete="email"
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                      aria-required="true"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="profile-phone"
                      className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-500"
                    >
                      Телефон
                    </label>

                    <input
                      id="profile-phone"
                      type="tel"
                      value={editForm.phone}
                      autoComplete="tel"
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <button
                      type="submit"
                      className={`flex items-center justify-center gap-2 bg-stone-800 px-5 py-4 text-sm text-[#d4aa2a] transition hover:bg-[#d4aa2a] hover:text-stone-800 ${focusClass}`}
                    >
                      <CheckIcon aria-hidden="true" className="h-4 w-4" />
                      Сохранить
                    </button>

                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className={`flex items-center justify-center gap-2 border border-stone-200 px-5 py-4 text-sm text-stone-600 transition hover:border-stone-400 hover:text-stone-800 ${focusClass}`}
                    >
                      <XMarkIcon aria-hidden="true" className="h-4 w-4" />
                      Отмена
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="mt-5 border border-stone-200 bg-white p-6">
              <div className="mb-4 h-px w-10 bg-[#d4aa2a]" aria-hidden="true" />
              <h2 className="text-xl font-light text-stone-800">
                Нужна помощь?
              </h2>
              <p className="mt-3 text-sm text-stone-500">
                Если нужно уточнить заказ, подобрать оттенки или материалы —
                напишите нам через форму обратной связи.
              </p>
            </div>
          </aside>

          <section className="border border-stone-200 bg-white p-6 shadow-[0_18px_60px_rgba(41,37,36,0.05)] sm:p-8">
            <div className="mb-8 flex flex-col gap-5 border-b border-stone-100 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-px w-10 bg-[#d4aa2a]" aria-hidden="true" />
                  <span className="text-xs uppercase tracking-[0.25em] text-stone-500">
                    История
                  </span>
                </div>

                <h2 className="text-3xl font-light tracking-tight text-stone-800 md:text-4xl">
                  Мои заказы
                </h2>
              </div>

              <Link
                to="/catalog"
                className={`text-sm uppercase tracking-[0.18em] text-[#b89422] transition hover:text-stone-800 ${focusClass}`}
              >
                В каталог →
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center border border-dashed border-stone-200 bg-stone-50 px-6 py-12 text-center">
                <ShoppingBagIcon
                  aria-hidden="true"
                  className="mb-6 h-14 w-14 text-stone-300"
                />

                <h3 className="text-2xl font-light text-stone-800">
                  Заказов пока нет
                </h3>

                <p className="mt-4 max-w-md text-stone-500">
                  Посмотрите каталог Bee Craft — возможно, там уже ждут ваши
                  будущие ленты, сухоцветы и детали для декора.
                </p>

                <Link
                  to="/catalog"
                  className={`mt-8 bg-stone-800 px-8 py-4 text-sm uppercase tracking-[0.2em] text-[#d4aa2a] transition hover:bg-[#d4aa2a] hover:text-stone-800 ${focusClass}`}
                >
                  Перейти в каталог
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Link
                    key={order.id}
                    to={`/profile/orders/${order.id}`}
                    aria-label={`Открыть заказ номер ${order.id}, статус: ${getStatusText(order.status)}, сумма: ${formatPrice(order.total)}`}
                    className={`group block border border-stone-200 bg-stone-50 p-5 transition hover:border-[#d4aa2a]/60 hover:bg-white hover:shadow-[0_14px_50px_rgba(41,37,36,0.07)] ${focusClass}`}
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-light text-stone-800">
                            Заказ №{order.id}
                          </h3>

                          <span
                            className={`border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${getStatusClasses(order.status)}`}
                          >
                            Статус: {getStatusText(order.status)}
                          </span>
                        </div>

                        <p className="text-sm text-stone-500">
                          {new Date(order.created_at).toLocaleDateString(
                            "ru-RU",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-6 md:text-right">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                            Сумма
                          </p>

                          <p className="mt-1 text-2xl font-light text-stone-800">
                            {formatPrice(order.total)}
                          </p>
                        </div>

                        <span
                          aria-hidden="true"
                          className="text-[#d4aa2a] transition group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
};

export default Profile;

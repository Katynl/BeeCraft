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
    new: "bg-[#b89422]/20 text-stone-800 border-[#b89422]/40",
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

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        if (isMounted) {
          setLoading(false);
        }
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

    setEditForm({
      username: profile?.username || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put("/profile/", {
        username: editForm.username.trim(),
        email: editForm.email.trim(),
        phone: editForm.phone.trim(),
      });

      setProfile(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Ошибка сохранения");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-50 px-4 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
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
      <main className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
        <div className="max-w-md border border-stone-200 bg-white p-8 text-center shadow-[0_18px_60px_rgba(41,37,36,0.06)]">
          <div className="mx-auto mb-6 h-px w-16 bg-[#b89422]" />

          <h1 className="text-3xl font-light text-stone-800">Ошибка</h1>

          <p className="mt-4 text-stone-500">{error}</p>

          <Link
            to="/"
            className="mt-8 inline-flex bg-stone-800 px-8 py-4 text-sm uppercase tracking-[0.2em] text-[#b89422] transition hover:bg-[#b89422] hover:text-stone-800"
          >
            На главную
          </Link>
        </div>
      </main>
    );
  }

  if (!profile) return null;

  const userInitial =
    profile.username?.trim()?.slice(0, 1).toUpperCase() || "U";

  return (
    <main className="min-h-screen overflow-hidden bg-stone-50 text-stone-800">
      {/* HERO */}
      <section className="relative border-b border-stone-200 pt-28 md:pt-32">
        <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[#b89422]/20 blur-3xl" />

        <div className="pointer-events-none absolute -left-8 top-36 hidden text-[180px] font-black leading-none tracking-[-0.08em] text-stone-200/70 md:block">
          BEE
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 md:pb-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-5xl font-light leading-[0.95] tracking-tight text-stone-800 md:text-7xl lg:text-8xl">
                Профиль
              </h1>

              <p className="mt-8 italic max-w-2xl text-base leading-relaxed text-stone-500 md:text-lg">
                Добро пожаловать, {profile.username}. Здесь можно посмотреть
                заказы, обновить контактные данные и вернуться к любимым
                материалам Bloom..ing Craft.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex w-fit items-center gap-3 border border-stone-300 bg-white px-6 py-4 text-sm text-stone-600 transition hover:border-[#b89422] hover:text-stone-800"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              Выйти
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-stone-200 bg-stone-50 py-6">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            {
              label: "Заказов",
              value: totalOrders,
            },
            {
              label: "Сумма заказов",
              value: formatPrice(totalSpent),
            },
            {
              label: "Последний заказ",
              value: lastOrderDate,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-stone-200 bg-white px-6 py-5"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-stone-400">
                {item.label}
              </p>

              <p className="mt-2 text-2xl font-light text-stone-800">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          {/* PROFILE CARD */}
          <aside>
            <div className="border border-stone-200 bg-white p-6 shadow-[0_18px_60px_rgba(41,37,36,0.05)] sm:p-8">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#b89422]/20 text-stone-800 ring-1 ring-[#b89422]/30">
                    <span className="text-2xl font-light uppercase tracking-tight">
                      {userInitial}
                    </span>
                  </div>
                </div>

                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex h-10 w-10 items-center justify-center border border-stone-200 text-stone-400 transition hover:border-[#b89422] hover:text-stone-800"
                    aria-label="Редактировать профиль"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                )}
              </div>

              {!isEditing ? (
                <div className="space-y-6">
                  <div className="border-b border-stone-100 pb-5">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-stone-400">
                      Имя пользователя
                    </p>
                    <p className="text-lg text-stone-800">{profile.username}</p>
                  </div>

                  <div className="border-b border-stone-100 pb-5">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-stone-400">
                      Email
                    </p>
                    <p className="break-all text-lg text-stone-800">
                      {profile.email}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-stone-400">
                      Телефон
                    </p>
                    <p className="text-lg text-stone-800">
                      {profile.phone || "Не указан"}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSave} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-400">
                      Имя пользователя
                    </label>

                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      required
                      className="w-full border border-stone-200 bg-stone-50 px-4 py-4 text-stone-800 outline-none transition focus:border-[#b89422] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-400">
                      Email
                    </label>

                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                      className="w-full border border-stone-200 bg-stone-50 px-4 py-4 text-stone-800 outline-none transition focus:border-[#b89422] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-400">
                      Телефон
                    </label>

                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="w-full border border-stone-200 bg-stone-50 px-4 py-4 text-stone-800 outline-none transition focus:border-[#b89422] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 bg-stone-800 px-5 py-4 text-sm text-[#b89422] transition hover:bg-[#b89422] hover:text-stone-800"
                    >
                      <CheckIcon className="h-4 w-4" />
                      Сохранить
                    </button>

                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex items-center justify-center gap-2 border border-stone-200 px-5 py-4 text-sm text-stone-600 transition hover:border-stone-400 hover:text-stone-800"
                    >
                      <XMarkIcon className="h-4 w-4" />
                      Отмена
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="mt-5 border border-stone-200 bg-white p-6">
              <div className="mb-4 h-px w-10 bg-[#b89422]" />

              <h3 className="text-xl font-light text-stone-800">
                Нужна помощь?
              </h3>

              <p className="mt-3 text-sm text-stone-500">
                Если нужно уточнить заказ, подобрать оттенки или материалы —
                напишите нам через форму обратной связи.
              </p>
            </div>
          </aside>

          {/* ORDERS */}
          <section className="border border-stone-200 bg-white p-6 shadow-[0_18px_60px_rgba(41,37,36,0.05)] sm:p-8">
            <div className="mb-8 flex flex-col gap-5 border-b border-stone-100 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-px w-10 bg-[#b89422]" />
                  <span className="text-xs uppercase tracking-[0.25em] text-stone-400">
                    История
                  </span>
                </div>

                <h2 className="text-3xl font-light tracking-tight text-stone-800 md:text-4xl">
                  Мои заказы
                </h2>
              </div>

              <Link
                to="/catalog"
                className="text-sm uppercase tracking-[0.18em] text-[#b89422] transition hover:text-stone-800"
              >
                В каталог →
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center border border-dashed border-stone-200 bg-stone-50 px-6 py-12 text-center">
                <ShoppingBagIcon className="mb-6 h-14 w-14 text-stone-300" />

                <h3 className="text-2xl font-light text-stone-800">
                  Заказов пока нет
                </h3>

                <p className="mt-4 max-w-md text-stone-500">
                  Посмотрите каталог Bloom..ing Craft — возможно, там уже ждут
                  ваши будущие ленты, сухоцветы и детали для декора.
                </p>

                <Link
                  to="/catalog"
                  className="mt-8 bg-stone-800 px-8 py-4 text-sm uppercase tracking-[0.2em] text-[#b89422] transition hover:bg-[#b89422] hover:text-stone-800"
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
                    className="group block border border-stone-200 bg-stone-50 p-5 transition hover:border-[#b89422]/60 hover:bg-white hover:shadow-[0_14px_50px_rgba(41,37,36,0.07)]"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-light text-stone-800">
                            Заказ №{order.id}
                          </h3>

                          <span
                            className={`border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${getStatusClasses(
                              order.status,
                            )}`}
                          >
                            {getStatusText(order.status)}
                          </span>
                        </div>

                        <p className="text-sm text-stone-400">
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
                          <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                            Сумма
                          </p>

                          <p className="mt-1 text-2xl font-light text-stone-800">
                            {formatPrice(order.total)}
                          </p>
                        </div>

                        <span className="text-[#b89422] transition group-hover:translate-x-1">
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

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { UserCircleIcon, PencilIcon, CheckIcon, XMarkIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

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

const getStatusColor = (status) => {
  switch (status) {
    case "new": return "bg-amber-50 text-amber-600 border border-amber-200";
    case "preparing": return "bg-sky-50 text-sky-600 border border-sky-200";
    case "ready": return "bg-emerald-50 text-emerald-600 border border-emerald-200";
    case "completed": return "bg-stone-50 text-stone-500 border border-stone-200";
    case "cancelled": return "bg-rose-50 text-rose-600 border border-rose-200";
    default: return "bg-stone-50 text-stone-500 border border-stone-200";
  }
};

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: "", email: "", phone: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, ordersRes] = await Promise.all([
          api.get("/profile/"),
          api.get("/orders/my/"),
        ]);
        setProfile(profileRes.data);
        setOrders(ordersRes.data);
        setEditForm({
          username: profileRes.data.username,
          email: profileRes.data.email,
          phone: profileRes.data.phone || "",
        });
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить данные");
        if (err.response?.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/profile/", editForm);
      setProfile(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Ошибка сохранения");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-stone-400">Загрузка...</div>;
  if (error) return <div className="text-center text-rose-500 py-20">{error}</div>;
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-stone-50 pt-28 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Шапка профиля */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 border-b border-stone-200 pb-6">
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-full p-1 shadow-sm">
              <UserCircleIcon className="w-14 h-14 text-stone-300" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-stone-800">
                {profile.username}
              </h1>
              <p className="text-stone-400 text-sm mt-1">Ваш аккаунт BloomCraft</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition group"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4 group-hover:-translate-y-0.5 transition" />
            <span>Выйти</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Левая колонка – личные данные */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl border border-stone-100 shadow-xs p-6 transition-all hover:shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400">Личная информация</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-stone-300 hover:text-stone-600 transition p-1 rounded-full hover:bg-stone-50"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
              {!isEditing ? (
                <div className="space-y-5">
                  <div>
                    <p className="text-xs uppercase text-stone-400 mb-0.5">Имя пользователя</p>
                    <p className="text-stone-800 text-lg font-medium">{profile.username}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-stone-400 mb-0.5">Email</p>
                    <p className="text-stone-800 text-lg font-medium break-all">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-stone-400 mb-0.5">Телефон</p>
                    <p className="text-stone-800 text-lg font-medium">{profile.phone || "—"}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase text-stone-500 mb-1">Имя пользователя</label>
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#f4d864] focus:border-[#f4d864] transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-stone-500 mb-1">Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#f4d864] focus:border-[#f4d864] transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-stone-500 mb-1">Телефон</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#f4d864] focus:border-[#f4d864] transition"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-stone-800 text-white py-2 rounded-xl hover:bg-stone-700 transition flex items-center justify-center gap-1 text-sm"
                    >
                      <CheckIcon className="h-4 w-4" />
                      Сохранить
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 border border-stone-200 py-2 rounded-xl hover:bg-stone-50 transition flex items-center justify-center gap-1 text-sm"
                    >
                      <XMarkIcon className="h-4 w-4" />
                      Отмена
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Правая колонка – история заказов */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl border border-stone-100 shadow-xs p-6 transition-all hover:shadow-md">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-6">История заказов</h2>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-stone-300 text-5xl mb-4">🌸</div>
                  <p className="text-stone-500 mb-4">У вас пока нет заказов</p>
                  <Link
                    to="/catalog"
                    className="inline-block px-6 py-2.5 bg-stone-800 text-white rounded-full text-sm hover:bg-stone-700 transition shadow-sm"
                  >
                    Вдохновиться каталогом
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-stone-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:shadow-sm transition"
                    >
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                          <p className="font-medium text-stone-800 text-lg">Заказ №{order.id}</p>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full w-fit ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        <p className="text-sm text-stone-400 mt-1">
                          {new Date(order.created_at).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-stone-800 text-xl">{order.total} ₽</p>
                        <Link
                          to={`/profile/orders/${order.id}`}
                          className="text-sm text-stone-400 hover:text-stone-700 transition inline-flex items-center gap-1"
                        >
                          <span>Подробнее</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
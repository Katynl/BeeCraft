import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { UserIcon, EnvelopeIcon, LockClosedIcon, PhoneIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (formData.password !== formData.password2) {
      setError("Пароли не совпадают!");
      setLoading(false);
      return;
    }
    try {
      await api.post("/register/", formData);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Ошибка регистрации. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-sm shadow-xl p-8 md:p-10 border border-stone-100 transform transition-all duration-500 animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-stone-800">Регистрация</h1>
          <div className="w-16 h-0.5 bg-[#f4d864] mx-auto mt-2 rounded-sm"></div>
          <p className="text-stone-500 mt-3 text-sm">Создайте аккаунт</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-sm bg-rose-50 border border-rose-200 text-rose-600 text-sm text-center animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              name="username"
              placeholder="Имя пользователя"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-sm border border-stone-200 focus:border-[#f4d864] focus:ring-2 focus:ring-[#f4d864]/20 transition outline-none text-stone-700"
            />
          </div>
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-sm border border-stone-200 focus:border-[#f4d864] focus:ring-2 focus:ring-[#f4d864]/20 transition outline-none text-stone-700"
            />
          </div>
          <div className="relative">
            <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-12 py-3 rounded-sm border border-stone-200 focus:border-[#f4d864] focus:ring-2 focus:ring-[#f4d864]/20 transition outline-none text-stone-700"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
            >
              {showPassword ? "Скрыть" : "Показать"}
            </button>
          </div>
          <div className="relative">
            <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type={showPassword2 ? "text" : "password"}
              name="password2"
              placeholder="Повторите пароль"
              value={formData.password2}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-12 py-3 rounded-sm border border-stone-200 focus:border-[#f4d864] focus:ring-2 focus:ring-[#f4d864]/20 transition outline-none text-stone-700"
            />
            <button
              type="button"
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
            >
              {showPassword2 ? "Скрыть" : "Показать"}
            </button>
          </div>
          <div className="relative">
            <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Телефон (необязательно)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-sm border border-stone-200 focus:border-[#f4d864] focus:ring-2 focus:ring-[#f4d864]/20 transition outline-none text-stone-700"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="group w-full bg-stone-800 text-white py-3 rounded-sm hover:bg-[#f4d864] hover:text-stone-800 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg disabled:opacity-70"
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-8 text-center space-y-2">
          <p className="text-stone-500 text-sm">Уже есть аккаунт?</p>
          <button
            onClick={() => navigate("/login")}
            className="text-stone-800 underline decoration-[#f4d864] underline-offset-4 hover:text-[#f4d864] transition font-medium"
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
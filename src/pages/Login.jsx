import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const savedRedirect = localStorage.getItem("redirectAfterLogin");
  const from = location.state?.from?.pathname || savedRedirect || "/";

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/token/", formData);
      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.removeItem("redirectAfterLogin");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Неверное имя пользователя или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-sm shadow-xl p-8 md:p-10 border border-stone-100 transform transition-all duration-500 animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-stone-800 font-plexsans">
            Добро пожаловать
          </h1>
          <div className="w-16 h-0.5 bg-[#d4aa2a] mx-auto mt-2 rounded-sm"></div>
          <p className="text-stone-500 mt-3 text-sm font-plexsans">
            Войдите в свой аккаунт
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-sm bg-rose-50 border font-plexsans border-rose-200 text-rose-600 text-sm text-center animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              name="username"
              placeholder="Имя пользователя"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 rounded-sm border font-plexsans border-stone-200 focus:border-[#d4aa2a] focus:ring-2 focus:ring-[#d4aa2a]/20 transition outline-none text-stone-700"
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
              className="w-full pl-10 pr-12 py-3 rounded-sm border font-plexsans border-stone-200 focus:border-[#d4aa2a] focus:ring-2 focus:ring-[#d4aa2a]/20 transition outline-none text-stone-700"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
            >
              {showPassword ? "Скрыть" : "Показать"}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="group w-full bg-stone-800 text-white py-3 rounded-sm hover:bg-[#d4aa2a] hover:text-stone-800 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg disabled:opacity-70"
          >
            {loading ? "Вход..." : "Войти"}
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-8 text-center space-y-2 w-full flex justify-between items-ens">
          <p className="text-stone-500 text-sm font-plexsans">Нет аккаунта?</p>
          <button
            onClick={() => navigate("/register")}
            className="text-stone-800 underline decoration-[#d4aa2a] underline-offset-4 hover:text-[#d4aa2a] transition font-plexsans"
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

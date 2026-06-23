import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const [privacyAccepted, setPrivacyAccepted] = useState(false);
import api from "../api";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const focusClass =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4aa2a] focus-visible:ring-offset-2";

const inputClass = `w-full rounded-sm border border-stone-200 py-3 pl-10 pr-4 text-stone-700
  outline-none transition placeholder:text-stone-500
  focus:border-[#d4aa2a] focus:ring-2 focus:ring-[#d4aa2a]/20 ${focusClass}`;

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

  const hasError = Boolean(error);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getApiErrorMessage = (error) => {
    const data = error.response?.data;

    if (!data) {
      return "Ошибка соединения с сервером. Попробуйте позже.";
    }

    if (typeof data === "string") {
      return data;
    }

    if (typeof data === "object") {
      const fieldNames = {
        username: "Имя пользователя",
        email: "Email",
        password: "Пароль",
        password2: "Повтор пароля",
        detail: "Ошибка",
        non_field_errors: "Ошибка",
      };

      return Object.entries(data)
        .map(([field, messages]) => {
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

    return "Ошибка. Попробуйте ещё раз.";
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

    if (!privacyAccepted) {
      setError("Необходимо согласиться на обработку персональных данных.");
      setLoading(false);
      return;
    }

    try {
      await api.post("/register/", formData);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-50 via-white to-stone-100 px-4 py-20">
      <section
        className="w-full max-w-md rounded-sm border border-stone-100 bg-white/80 p-8 shadow-xl backdrop-blur-sm transition-all duration-500 animate-fade-in-up md:p-10"
        aria-labelledby="register-title"
      >
        <div className="mb-8 text-center">
          <h1
            id="register-title"
            className="text-4xl tracking-tight text-stone-800 md:text-5xl"
          >
            Регистрация
          </h1>

          <div
            className="mx-auto mt-2 h-0.5 w-16 rounded-sm bg-[#d4aa2a]"
            aria-hidden="true"
          />

          <p className="mt-3 text-sm text-stone-500">Создайте аккаунт</p>
        </div>

        {error && (
          <div className="mb-6 whitespace-pre-line border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="relative">
            <label htmlFor="username" className="sr-only">
              Имя пользователя
            </label>
            <UserIcon
              aria-hidden="true"
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
            />
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Имя пользователя"
              autoComplete="username"
              value={formData.username}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={hasError}
              className={inputClass}
            />
          </div>

          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <EnvelopeIcon
              aria-hidden="true"
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
            />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={hasError}
              className={inputClass}
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Пароль
            </label>
            <LockClosedIcon
              aria-hidden="true"
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Пароль"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={hasError}
              className={`${inputClass} pr-20`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              aria-pressed={showPassword}
              className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-xs text-stone-500 transition hover:text-stone-700 ${focusClass}`}
            >
              {showPassword ? "Скрыть" : "Показать"}
            </button>
          </div>

          <div className="relative">
            <label htmlFor="password2" className="sr-only">
              Повторите пароль
            </label>
            <LockClosedIcon
              aria-hidden="true"
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
            />
            <input
              id="password2"
              type={showPassword2 ? "text" : "password"}
              name="password2"
              placeholder="Повторите пароль"
              autoComplete="new-password"
              value={formData.password2}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={hasError}
              className={`${inputClass} pr-20`}
            />
            <button
              type="button"
              onClick={() => setShowPassword2((prev) => !prev)}
              aria-label={
                showPassword2
                  ? "Скрыть повтор пароля"
                  : "Показать повтор пароля"
              }
              aria-pressed={showPassword2}
              className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-xs text-stone-500 transition hover:text-stone-700 ${focusClass}`}
            >
              {showPassword2 ? "Скрыть" : "Показать"}
            </button>
          </div>

          <div className="relative">
            <label htmlFor="phone" className="sr-only">
              Телефон
            </label>
            <PhoneIcon
              aria-hidden="true"
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
            />
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="Телефон (необязательно)"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
            />

            <span>
              Я согласен на обработку персональных данных и принимаю{" "}
              <button
                type="button"
                onClick={() => navigate("/privacy")}
                className="underline"
              >
                Политику конфиденциальности
              </button>
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className={`group flex w-full items-center justify-center gap-2 rounded-sm bg-stone-800 py-3 font-medium text-white shadow-md transition-all duration-300 hover:bg-[#d4aa2a] hover:text-stone-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 ${focusClass}`}
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
            <ArrowRightIcon
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </button>
        </form>

        <div className="mt-8 flex w-full items-end justify-between gap-4 text-center">
          <p className="text-sm text-stone-500">Уже есть аккаунт?</p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className={`rounded-sm text-stone-800 underline decoration-[#d4aa2a] underline-offset-4 transition hover:text-[#d4aa2a] ${focusClass}`}
          >
            Войти
          </button>
        </div>
      </section>
    </main>
  );
};

export default Register;

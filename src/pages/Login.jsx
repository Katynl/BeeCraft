import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const focusClass =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4aa2a] focus-visible:ring-offset-2";

const inputClass = `w-full rounded-sm border border-stone-200 py-3 pl-10 pr-4 text-stone-700
  outline-none transition placeholder:text-stone-500
  focus:border-[#d4aa2a] focus:ring-2 focus:ring-[#d4aa2a]/20 ${focusClass}`;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const savedRedirect = localStorage.getItem("redirectAfterLogin");
  const from = location.state?.from?.pathname || savedRedirect || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [resetForm, setResetForm] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResetPassword2, setShowResetPassword2] = useState(false);

  const [isResetOpen, setIsResetOpen] = useState(false);

  const hasError = Boolean(error);
  const hasResetError = Boolean(resetError);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleResetChange = (e) => {
    setResetForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setResetError("");
    setResetMessage("");
  };

  const openResetModal = () => {
    setResetForm({
      email: formData.email || "",
      password: "",
      password2: "",
    });

    setResetError("");
    setResetMessage("");
    setIsResetOpen(true);
  };

  const closeResetModal = () => {
    if (resetLoading) return;

    setIsResetOpen(false);
    setResetError("");
    setResetMessage("");
    setShowResetPassword(false);
    setShowResetPassword2(false);
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

    if (!formData.email.trim()) {
      setError("Введите email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError("Введите корректный email");
      return;
    }

    if (!formData.password.trim()) {
      setError("Введите пароль");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/token/", {
        email: formData.email.trim(),
        password: formData.password,
      });

      const { access, refresh } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.removeItem("redirectAfterLogin");

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.is_staff === true || user?.is_superuser === true;

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    setResetError("");
    setResetMessage("");

    if (!resetForm.email.trim()) {
      setResetError("Введите email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetForm.email.trim())) {
      setResetError("Введите корректный email");
      return;
    }

    if (!resetForm.password.trim()) {
      setResetError("Введите новый пароль");
      return;
    }

    if (resetForm.password.length < 6) {
      setResetError("Пароль должен содержать минимум 6 символов");
      return;
    }

    if (resetForm.password !== resetForm.password2) {
      setResetError("Пароли не совпадают");
      return;
    }

    setResetLoading(true);

    try {
      const response = await api.post("/password-reset-simple/", {
        email: resetForm.email.trim(),
        password: resetForm.password,
        password2: resetForm.password2,
      });

      setResetMessage(
        response.data?.detail ||
          "Пароль успешно изменён. Теперь можно войти с новым паролем.",
      );

      setFormData((prev) => ({
        ...prev,
        email: resetForm.email.trim(),
        password: "",
      }));

      setResetForm({
        email: resetForm.email.trim(),
        password: "",
        password2: "",
      });

      setTimeout(() => {
        closeResetModal();
      }, 1500);
    } catch (err) {
      console.error(err);
      setResetError(getApiErrorMessage(err));
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-50 via-white to-stone-100 px-4 py-20">
      <section
        className="w-full max-w-md rounded-sm border border-stone-100 bg-white/80 p-8 shadow-xl backdrop-blur-sm transition-all duration-500 animate-fade-in-up md:p-10"
        aria-labelledby="login-title"
      >
        <div className="mb-8 text-center">
          <h1
            id="login-title"
            className="text-4xl font-light tracking-tight text-stone-800 md:text-5xl"
          >
            Добро пожаловать
          </h1>

          <div
            className="mx-auto mt-2 h-0.5 w-16 rounded-sm bg-[#d4aa2a]"
            aria-hidden="true"
          />

          <p className="mt-3 text-sm text-stone-500">Войдите в свой аккаунт</p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 whitespace-pre-line border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
              autoComplete="current-password"
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

          <div className="flex justify-end">
            <button
              type="button"
              onClick={openResetModal}
              className={`rounded-sm text-sm text-stone-500 underline decoration-[#d4aa2a] underline-offset-4 transition hover:text-stone-800 ${focusClass}`}
            >
              Забыли пароль?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className={`group flex w-full items-center justify-center gap-2 rounded-sm bg-stone-800 py-3 font-medium text-white shadow-md transition-all duration-300 hover:bg-[#d4aa2a] hover:text-stone-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 ${focusClass}`}
          >
            {loading ? "Вход..." : "Войти"}

            <ArrowRightIcon
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </button>
        </form>

        <div className="mt-8 flex w-full items-end justify-between gap-4 text-center">
          <p className="text-sm text-stone-500">Нет аккаунта?</p>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className={`rounded-sm text-stone-800 underline decoration-[#d4aa2a] underline-offset-4 transition hover:text-[#d4aa2a] ${focusClass}`}
          >
            Зарегистрироваться
          </button>
        </div>
      </section>

      {isResetOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-password-title"
        >
          <section className="relative w-full max-w-md rounded-sm border border-stone-200 bg-white p-6 shadow-2xl md:p-8">
            <button
              type="button"
              onClick={closeResetModal}
              disabled={resetLoading}
              aria-label="Закрыть окно восстановления пароля"
              className={`absolute right-4 top-4 rounded-sm text-stone-400 transition hover:text-stone-800 disabled:opacity-50 ${focusClass}`}
            >
              <XMarkIcon aria-hidden="true" className="h-5 w-5" />
            </button>

            <div className="mb-6 pr-8">
              <h2
                id="reset-password-title"
                className="text-3xl font-light tracking-tight text-stone-800"
              >
                Новый пароль
              </h2>

              <div
                className="mt-3 h-0.5 w-14 rounded-sm bg-[#d4aa2a]"
                aria-hidden="true"
              />

              <p className="mt-4 text-sm leading-relaxed text-stone-500">
                Введите email аккаунта и новый пароль.
              </p>
            </div>

            {resetError && (
              <div
                role="alert"
                className="mb-5 whitespace-pre-line border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
              >
                {resetError}
              </div>
            )}

            {resetMessage && (
              <div
                role="status"
                className="mb-5 border border-[#d4aa2a]/40 bg-[#d4aa2a]/10 px-4 py-3 text-sm leading-relaxed text-stone-800"
              >
                {resetMessage}
              </div>
            )}

            <form onSubmit={handleResetSubmit} noValidate className="space-y-4">
              <div className="relative">
                <label htmlFor="reset-email" className="sr-only">
                  Email
                </label>

                <EnvelopeIcon
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
                />

                <input
                  id="reset-email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={resetForm.email}
                  onChange={handleResetChange}
                  aria-invalid={hasResetError}
                  className={inputClass}
                />
              </div>

              <div className="relative">
                <label htmlFor="reset-password" className="sr-only">
                  Новый пароль
                </label>

                <LockClosedIcon
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
                />

                <input
                  id="reset-password"
                  type={showResetPassword ? "text" : "password"}
                  name="password"
                  placeholder="Новый пароль"
                  autoComplete="new-password"
                  value={resetForm.password}
                  onChange={handleResetChange}
                  aria-invalid={hasResetError}
                  className={`${inputClass} pr-20`}
                />

                <button
                  type="button"
                  onClick={() => setShowResetPassword((prev) => !prev)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-xs text-stone-500 transition hover:text-stone-700 ${focusClass}`}
                >
                  {showResetPassword ? "Скрыть" : "Показать"}
                </button>
              </div>

              <div className="relative">
                <label htmlFor="reset-password2" className="sr-only">
                  Повторите пароль
                </label>

                <LockClosedIcon
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
                />

                <input
                  id="reset-password2"
                  type={showResetPassword2 ? "text" : "password"}
                  name="password2"
                  placeholder="Повторите пароль"
                  autoComplete="new-password"
                  value={resetForm.password2}
                  onChange={handleResetChange}
                  aria-invalid={hasResetError}
                  className={`${inputClass} pr-20`}
                />

                <button
                  type="button"
                  onClick={() => setShowResetPassword2((prev) => !prev)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-xs text-stone-500 transition hover:text-stone-700 ${focusClass}`}
                >
                  {showResetPassword2 ? "Скрыть" : "Показать"}
                </button>
              </div>

              <button
                type="submit"
                disabled={resetLoading}
                aria-busy={resetLoading}
                className={`group flex w-full items-center justify-center gap-2 rounded-sm bg-stone-800 py-3 font-medium text-white shadow-md transition-all duration-300 hover:bg-[#d4aa2a] hover:text-stone-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 ${focusClass}`}
              >
                {resetLoading ? "Сохраняем..." : "Сменить пароль"}

                <ArrowRightIcon
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
};

export default Login;

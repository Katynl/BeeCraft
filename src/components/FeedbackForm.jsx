import React, { useState } from "react";
import api from "../api";

const inputClassName = `
  w-full
  bg-stone-50
  border
  border-stone-200
  px-4
  py-4
  text-stone-800
  placeholder:text-stone-500
  outline-none
  transition
  focus:bg-white
  focus:border-[#d4aa2a]
  focus:outline-none
  focus-visible:ring-2
  focus-visible:ring-[#d4aa2a]
  focus-visible:ring-offset-2
`;

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  setPrivacyAccepted(false);

  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    text: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus({ type: "error", text: "Введите ваше имя" });
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus({ type: "error", text: "Введите корректный email" });
      return;
    }

    if (!privacyAccepted) {
      setStatus({
        type: "error",
        text: "Необходимо согласиться на обработку персональных данных.",
      });
      return;
    }

    if (!formData.message.trim()) {
      setStatus({ type: "error", text: "Напишите сообщение" });
      return;
    }

    setLoading(true);
    setStatus({ type: "", text: "" });

    try {
      await api.post("/feedback/", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      setStatus({
        type: "success",
        text: "Спасибо! Мы свяжемся с вами.",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error(err);

      setStatus({
        type: "error",
        text: "Ошибка отправки. Попробуйте позже.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="bg-stone-50 px-4 py-24 sm:px-6 md:py-32 lg:px-8"
      aria-labelledby="feedback-title"
    >
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-10 text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-[#d4aa2a]" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.28em] text-stone-600">
              Форма обратной связи
            </span>
            <div className="h-px w-10 bg-[#d4aa2a]" aria-hidden="true" />
          </div>

          <h2
            id="feedback-title"
            className="text-3xl font-light tracking-tight text-stone-800 md:text-4xl"
          >
            Остались вопросы?
          </h2>

          <p className="mt-4 leading-relaxed text-stone-600 italic">
            Напишите нам — мы поможем с выбором, заказом или материалами.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="border border-stone-200 bg-white p-6 shadow-[0_16px_50px_rgba(41,37,36,0.06)] sm:p-8 md:p-10"
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="sr-only">
                Ваше имя
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Ваше имя"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="example@mail.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                Сообщение
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Напишите сообщение..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                aria-required="true"
                className={`${inputClassName} resize-none`}
              />
            </div>

            {status.text && (
              <div
                role={status.type === "error" ? "alert" : "status"}
                aria-live="polite"
                className={`border px-4 py-3 text-sm ${
                  status.type === "success"
                    ? "border-[#d4aa2a]/40 bg-[#d4aa2a]/15 text-stone-800"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {status.text}
              </div>
            )}

            <label className="flex items-start gap-3 text-sm leading-relaxed text-stone-600">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#d4aa2a]"
              />

              <span>
                Я согласен на обработку персональных данных и принимаю{" "}
                <a
                  href="/privacy"
                  className="text-stone-800 underline decoration-[#d4aa2a] underline-offset-4 hover:text-[#b89422]"
                >
                  политику конфиденциальности
                </a>
                .
              </span>
            </label>

            <button
              type="submit"
              aria-busy={loading}
              disabled={loading}
              className="
                w-full
                bg-stone-800
                px-6
                py-4
                text-sm
                uppercase
                tracking-[0.22em]
                text-[#d4aa2a]
                transition
                duration-300
                hover:bg-[#d4aa2a]
                hover:text-stone-800
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-50
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#d4aa2a]
                focus-visible:ring-offset-2
              "
            >
              {loading ? "Отправка..." : "Отправить →"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FeedbackForm;

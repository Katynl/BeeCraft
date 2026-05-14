import React, { useState } from "react";
import api from "../api";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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
    <section className="bg-stone-50 px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-10 bg-[#d4aa2a]" />
            <span className="text-xs uppercase tracking-[0.28em] text-stone-400">
              Форма обратной связи
            </span>
            <div className="h-px w-10 bg-[#d4aa2a]" />
          </div>

          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-stone-800">
            Остались вопросы?
          </h2>

          <p className="mt-4 text-stone-500 italic leading-relaxed">
            Напишите нам — мы поможем с выбором, заказом или материалами.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-stone-200 p-6 sm:p-8 md:p-10 shadow-[0_16px_50px_rgba(41,37,36,0.06)]"
        >
          <div className="space-y-5">
            <div>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleChange}
                required
                className="
                  w-full
                  bg-stone-50
                  border
                  border-stone-200
                  px-4
                  py-4
                  text-stone-800
                  placeholder:text-stone-400
                  outline-none
                  transition
                  focus:bg-white
                  focus:border-[#d4aa2a]
                "
              />
            </div>

            <div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="
                  w-full
                  bg-stone-50
                  border
                  border-stone-200
                  px-4
                  py-4
                  text-stone-800
                  placeholder:text-stone-400
                  outline-none
                  transition
                  focus:bg-white
                  focus:border-[#d4aa2a]
                "
              />
            </div>

            <div>
              <textarea
                id="message"
                name="message"
                placeholder="Напишите сообщение..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="
                  w-full
                  resize-none
                  bg-stone-50
                  border
                  border-stone-200
                  px-4
                  py-4
                  text-stone-800
                  placeholder:text-stone-400
                  outline-none
                  transition
                  focus:bg-white
                  focus:border-[#d4aa2a]
                "
              />
            </div>

            {status.text && (
              <div
                className={`border px-4 py-3 text-sm ${
                  status.type === "success"
                    ? "border-[#d4aa2a]/40 bg-[#d4aa2a]/15 text-stone-800"
                    : "border-red-200 bg-red-50 text-red-600"
                }`}
              >
                {status.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-stone-800
                text-[#d4aa2a]
                px-6
                py-4
                text-sm
                uppercase
                tracking-[0.22em]
                transition
                duration-300
                hover:bg-[#d4aa2a]
                hover:text-stone-800
                active:scale-[0.99]
                disabled:opacity-50
                disabled:cursor-not-allowed
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

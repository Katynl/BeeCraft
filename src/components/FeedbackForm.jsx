import React, { useState } from "react";
import api from "../api";
import video from "../public/img/compressed_0_bee_daisy_1920x1080.webm";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      setStatus({ type: "success", text: "✨ Спасибо! Мы свяжемся с вами." });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", text: "Ошибка отправки. Попробуйте позже." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-stone-900">
      {/* Фоновое видео (тихое, тёмное, атмосферное) */}
      <div className="absolute inset-0 z-0">
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/90 to-stone-900" />
      </div>

      {/* Контент */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-plexsans tracking-tight text-white">
            Остались вопросы?
          </h2>
          <p className="text-stone-300 text-md mt-3 font-plexsans">
            Напишите нам, и мы ответим в ближайшее время
          </p>
          <div className="w-12 h-0.5 bg-[#f4d864] mx-auto mt-4 mb-8"></div>
        </div>

        <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm rounded-sm p-6 md:p-8 shadow-xl border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-stone-800/50 border font-plexsans border-stone-600 rounded-sm px-4 py-3 text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#f4d864] focus:border-transparent transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-stone-800/50 border font-plexsans border-stone-600 rounded-sm px-4 py-3 text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#f4d864] focus:border-transparent transition"
            />
            <textarea
              name="message"
              placeholder="Сообщение"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-stone-800/50 border font-plexsans border-stone-600 rounded-sm px-4 py-3 text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#f4d864] focus:border-transparent transition"
            ></textarea>

            {status.text && (
              <div
                className={`text-center p-3 rounded-sm text-sm ${
                  status.type === "success"
                    ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30"
                    : "bg-rose-500/20 text-rose-200 border border-rose-500/30"
                }`}
              >
                {status.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-sm font-plexsans bg-[#f4d864] text-stone-900 font-medium hover:bg-white transition duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {loading ? "Отправка..." : "Отправить →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
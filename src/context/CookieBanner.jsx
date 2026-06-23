import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 text-white p-4 backdrop-blur">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm leading-relaxed">
          Мы используем cookies и обработку персональных данных для улучшения
          работы сайта, аналитики и персонализации контента.{" "}
          <Link to="/privacy">Политика конфиденциальности</Link>
        </p>

        <div className="flex gap-3">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm rounded-lg border border-white/40 hover:bg-white/10"
          >
            Отклонить
          </button>

          <button
            onClick={acceptAll}
            className="px-4 py-2 text-sm rounded-lg bg-white text-black hover:bg-gray-200"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}

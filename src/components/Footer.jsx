import React from "react";
import { useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const focusClass =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4d864] focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900";

const Footer = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    const token = localStorage.getItem("access_token");
    const protectedRoutes = ["/profile", "/orders"];

    if (protectedRoutes.includes(path) && !token) {
      localStorage.setItem("redirectAfterLogin", path);

      if (window.confirm("Войдите или зарегистрируйтесь")) {
        navigate("/login");
      }

      return;
    }

    navigate(path);
  };

  return (
    <footer className="bg-stone-900 text-stone-300" id="footer">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12 lg:grid-cols-4">
          <div className="space-y-3">
            <h2 className="text-2xl font-medium tracking-wide text-[#f4d864]">
              BEE CRAFT
            </h2>
            <p className="text-sm leading-relaxed text-stone-400 italic">
              Вдохновляющие материалы для флористики и декора. Сделано с любовью
              к природе.
            </p>
          </div>

          <nav aria-label="Навигация в подвале">
            <h3 className="mb-4 text-sm uppercase tracking-wider text-stone-400">
              Навигация
            </h3>

            <ul className="space-y-2">
              {[
                ["Главная", "/"],
                ["Каталог", "/catalog"],
                ["Новости", "/news"],
                ["Контакты", "/contacts"],
              ].map(([label, path]) => (
                <li key={path}>
                  <button
                    type="button"
                    onClick={() => goTo(path)}
                    className={`rounded-sm transition duration-200 hover:text-[#f4d864] ${focusClass}`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-400">
              Контакты
            </h3>

            <address className="not-italic flex flex-col justify-center items-center">
              <ul className="space-y-3 flex flex-col justify-center items-center">
                <li className="flex items-center gap-2">
                  <PhoneIcon
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-stone-500"
                  />
                  <a
                    href="tel:+79502885858"
                    className={`rounded-sm transition hover:text-[#f4d864] ${focusClass}`}
                  >
                    +7 (950) 288-58-58
                  </a>
                </li>

                <li className="flex items-center gap-2">
                  <EnvelopeIcon
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-stone-500"
                  />
                  <a
                    href="mailto:beecraft@gmail.com"
                    className={`rounded-sm transition hover:text-[#f4d864] ${focusClass}`}
                  >
                    beecraft@gmail.com
                  </a>
                </li>

                <li className="flex items-start gap-2">
                  <MapPinIcon
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-stone-500"
                  />
                  <div className="space-y-1 text-sm leading-relaxed">
                    <p>г. Владивосток, ул. Светланская, 15</p>
                    <p>г. Владивосток, ул. Уткинская, 38</p>
                  </div>
                </li>
              </ul>
            </address>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-400">
              Мы в соцсетях
            </h3>

            <div className="mb-6 flex gap-4 justify-center items-center">
              <SocialLink href="https://vk.com/yourgroup" label="ВКонтакте">
                <path d="M15.07 2H8.93C3.92 2 2 3.92 2 8.93v6.14C2 20.08 3.92 22 8.93 22h6.14c5 0 6.93-1.92 6.93-6.93V8.93C22 3.92 20.08 2 15.07 2zm3.21 13.87c-.3.88-1.48 1.15-2.48.89-.53-.14-1.06-.5-1.59-.97-.49-.44-.94-.63-1.27-.63-.45 0-.74.3-.74.66 0 .25.14.52.6 1.05.58.65.45 1.06-.52 1.06-1.39 0-2.88-.88-3.99-2.18-1.44-1.68-2.3-3.97-2.41-5.94-.02-.48.38-.76.79-.76.36 0 .73.18.92.67.27.7.61 1.35.99 1.86.66.88 1.18 1.32 1.57 1.32.29 0 .44-.17.44-.6v-2.4c-.02-.96-.66-1.04-.95-1.12-.18-.04.05-.4.38-.52.63-.23 1.71-.26 2.37-.26.58 0 1.13.03 1.26.12.4.3.4 1.43.4 2.05v1.59c0 .27.19.36.35.36.29 0 .67-.23 1.3-.96.5-.59.89-1.41 1.11-2.27.05-.19.18-.3.36-.3h1c.36 0 .63.32.54.67-.23.94-.88 1.96-1.65 2.76-.72.75-.93.91-.76 1.48.15.48.43.91.7 1.25.44.57.93.98 1.39 1.23.85.46 1.3.4 1.6.14.33-.29.43-.78.48-1.13.06-.47.41-.62.74-.48.32.13.58.31.85.5.41.3.77.69.94 1.12.15.38-.09.96-.55 1.23z" />
              </SocialLink>

              <SocialLink href="https://t.me/yourgroup" label="Telegram">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.6-1.38-.97-2.23-1.56-.99-.69-.35-1.07.22-1.69.15-.16 2.85-2.62 2.91-2.84.01-.03.02-.14-.06-.2-.08-.06-.2-.04-.28-.02-.11.03-1.86 1.18-5.26 3.48-.5.34-.95.51-1.36.5-.44-.01-1.3-.25-1.93-.46-.78-.25-1.4-.38-1.35-.81.03-.22.33-.45.92-.68 2.35-1.01 5.2-2.09 7.92-3.16 1.53-.6 2.79-1 3.82-1.2.88-.17 1.6-.1 1.88.41.24.44.16 1.02.08 1.44z" />
              </SocialLink>

              <SocialLink
                href="https://instagram.com/yourgroup"
                label="Instagram"
              >
                <path d="M12 2C9.2 2 8.5 2 7 2 5 2 2 5 2 7v10c0 2 3 5 5 5h10c2 0 5-3 5-5V7c0-2-3-5-5-5h-3zM7 4h2v2H7V4zm5 2c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zm0 2c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
              </SocialLink>
            </div>

            <div className="text-xs leading-relaxed text-stone-500">
              <p>Пн–Пт: 10:00 – 20:00</p>
              <p>Сб: 11:00 – 18:00</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-800 pt-8 text-center text-sm text-stone-500">
          <p>© {new Date().getFullYear()} BEE CRAFT. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`rounded-sm text-stone-400 transition hover:-translate-y-0.5 hover:text-[#f4d864] ${focusClass}`}
    aria-label={label}
  >
    <svg
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {children}
    </svg>
  </a>
);

export default Footer;

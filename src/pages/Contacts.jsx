import React from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const CONTACTS = {
  phone: "+7 (950) 288-58-58",
  phoneHref: "tel:+79502885858",
  email: "bloomcraft@gmail.com",
  emailHref: "mailto:bloomcraft@gmail.com",
  address: "Владивосток, Светланская 15",
  address2: "Владивосток, Уткинская 38",
  workdays: "Пн–Пт: 10:00 — 20:00",
  saturday: "Сб: 11:00 — 18:00",
  sunday: "Вс — выходной",
};

const Honeycomb = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 220 160"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {[
        [30, 35],
        [72, 35],
        [114, 35],
        [156, 35],
        [51, 72],
        [93, 72],
        [135, 72],
        [177, 72],
        [30, 109],
        [72, 109],
        [114, 109],
        [156, 109],
      ].map(([x, y], index) => (
        <path
          key={index}
          d={`M${x} ${y - 18}L${x + 16} ${y - 9}V${y + 9}L${x} ${
            y + 18
          }L${x - 16} ${y + 9}V${y - 9}L${x} ${y - 18}Z`}
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
};

const ContactCard = ({ icon: Icon, eyebrow, title, children }) => {
  return (
    <div className="group relative overflow-hidden bg-white border border-stone-200 p-6 sm:p-7 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(41,37,36,0.10)] transition-all duration-500">
      <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full bg-[#d4aa2a]/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />

      <div className="relative z-10">
        <div className="w-14 h-14 rounded-full bg-[#d4aa2a]/20 flex items-center justify-center mb-6 group-hover:bg-[#d4aa2a] transition duration-300">
          <Icon className="w-7 h-7 text-stone-800" />
        </div>

        <p className="uppercase tracking-[0.25em] text-[10px] text-stone-400 mb-3">
          {eyebrow}
        </p>

        <h3 className="text-2xl font-light text-stone-800 leading-tight mb-3">
          {title}
        </h3>

        <div className="text-stone-500 leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

const Contacts = () => {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-800 overflow-hidden">
      {/* БАННЕР */}
      <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24 bg-stone-50">
        {/* мягкое медовое свечение */}
        <div className="absolute top-12 right-0 w-72 h-72 bg-[#d4aa2a]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-24 top-40 w-80 h-80 bg-stone-800/5 rounded-full blur-3xl pointer-events-none" />

        {/* соты — как лёгкий брендовый фон */}
        <Honeycomb className="absolute right-[-40px] top-24 w-56 md:w-80 text-[#d4aa2a]/20 pointer-events-none" />
        <Honeycomb className="absolute left-4 bottom-8 w-32 md:w-44 text-stone-800/[0.04] pointer-events-none" />

        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-[#d4aa2a]" />
            <span className="uppercase tracking-[0.3em] text-xs text-stone-500">
              Связь
            </span>
          </div>

          <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-[-0.05em] text-stone-800">
              Контакты мастерской
            </h1>

            <p className="mt-8 italic max-w-2xl text-center text-stone-600 text-lg md:text-xl leading-relaxed font-light">
              Напишите, позвоните или загляните к нам за материалами, оттенками
              и вдохновением. Мы поможем подобрать детали для вашей
              флористической идеи.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={CONTACTS.phoneHref}
                className="inline-flex justify-center items-center px-8 py-4 bg-stone-800 text-[#d4aa2a] uppercase tracking-[0.22em] text-xs hover:bg-[#d4aa2a] hover:text-stone-800 transition duration-300"
              >
                Позвонить
              </a>

              <a
                href={CONTACTS.emailHref}
                className="inline-flex justify-center items-center px-8 py-4 border border-stone-300 bg-white/80 text-stone-700 uppercase tracking-[0.22em] text-xs hover:border-[#d4aa2a] hover:bg-[#d4aa2a]/10 transition duration-300"
              >
                Написать письмо
              </a>
            </div>
          </div>
          <div className="absolute top-12 left-0 w-72 h-72 bg-[#d4aa2a]/25 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* КАРТОЧКИ */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ContactCard icon={PhoneIcon} eyebrow="Телефон" title="Позвонить">
              <a
                href={CONTACTS.phoneHref}
                className="hover:text-stone-800 transition"
              >
                {CONTACTS.phone}
              </a>
            </ContactCard>

            <ContactCard icon={EnvelopeIcon} eyebrow="Email" title="Написать">
              <a
                href={CONTACTS.emailHref}
                className="break-all hover:text-stone-800 transition"
              >
                {CONTACTS.email}
              </a>
            </ContactCard>

            <ContactCard icon={MapPinIcon} eyebrow="Адрес" title="Заглянуть">
              <p>{CONTACTS.address}</p>
              <p>{CONTACTS.address2}</p>
            </ContactCard>

            <ContactCard icon={ClockIcon} eyebrow="График" title="Часы работы">
              <p>{CONTACTS.workdays}</p>
              <p>{CONTACTS.saturday}</p>
              <p className="text-sm text-stone-400 mt-1">{CONTACTS.sunday}</p>
            </ContactCard>
          </div>
        </div>
      </section>

      {/* MAP + SOCIAL */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* MAP */}
          <div className="bg-white border border-stone-200 p-4 sm:p-5 shadow-[0_20px_60px_rgba(41,37,36,0.06)]">
            <div className="relative overflow-hidden bg-stone-100 h-[360px] md:h-[460px]">
              <iframe
                title="Карта — Bloom..ing Craft"
                className="absolute inset-0 w-full h-full border-0 grayscale-[0.25] contrast-[0.95]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%B2%D0%BE%D1%81%D1%82%D0%BE%D0%BA%2C%20%D1%83%D0%BB.%20%D0%9F%D1%83%D1%88%D0%BA%D0%B8%D0%BD%D0%B0%2C%2010&t=&z=15&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contacts;

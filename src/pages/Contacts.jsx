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
  email: "beecraft@gmail.com",
  emailHref: "mailto:beecraft@gmail.com",
  address: "Владивосток, Светланская 15",
  address2: "Владивосток, Уткинская 38",
  workdays: "Пн–Пт: 10:00 — 20:00",
  saturday: "Сб: 11:00 — 18:00",
  sunday: "Вс — выходной",
};

const focusClass =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4aa2a] focus-visible:ring-offset-2";

const Honeycomb = ({ className = "" }) => (
  <svg
    viewBox="0 0 220 160"
    fill="none"
    aria-hidden="true"
    focusable="false"
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

const ContactCard = ({ icon: Icon, eyebrow, title, children }) => (
  <article className="group relative overflow-hidden border border-stone-200 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(41,37,36,0.10)] sm:p-7">
    <div
      className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#d4aa2a]/20 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100"
      aria-hidden="true"
    />

    <div className="relative z-10">
      <div
        className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#d4aa2a]/20 transition duration-300 group-hover:bg-[#d4aa2a]"
        aria-hidden="true"
      >
        <Icon className="h-7 w-7 text-stone-800" />
      </div>

      <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-stone-500">
        {eyebrow}
      </p>

      <h3 className="mb-3 text-2xl font-light leading-tight text-stone-800">
        {title}
      </h3>

      <div className="leading-relaxed text-stone-600">{children}</div>
    </div>
  </article>
);

const Contacts = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-stone-50 text-stone-800">
      <section
        className="relative overflow-hidden bg-stone-50 pb-16 pt-28 md:pb-24 md:pt-36"
        aria-labelledby="contacts-title"
      >
        <div
          className="pointer-events-none absolute right-0 top-12 h-72 w-72 rounded-full bg-[#d4aa2a]/25 blur-3xl"
          aria-hidden="true"
        />

        <Honeycomb className="pointer-events-none absolute right-[-40px] top-24 w-56 text-[#d4aa2a]/20 md:w-80" />

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-4" aria-hidden="true">
            <div className="h-px w-12 bg-[#d4aa2a]" />
            <span className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Связь
            </span>
          </div>

          <div className="flex w-full flex-col items-center justify-center">
            <h1
              id="contacts-title"
              className="text-center text-5xl font-black leading-[0.9] tracking-[-0.05em] text-stone-800 sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Контакты мастерской
            </h1>

            <p className="mt-8 max-w-2xl text-center text-lg font-light italic leading-relaxed text-stone-600 md:text-xl">
              Напишите, позвоните или загляните к нам за материалами, оттенками
              и вдохновением. Мы поможем подобрать детали для вашей
              флористической идеи.
            </p>

          </div>

          <div
            className="pointer-events-none absolute left-0 top-12 h-72 w-72 rounded-full bg-[#d4aa2a]/25 blur-3xl"
            aria-hidden="true"
          />
        </div>
      </section>

      <section className="pb-20 md:pb-28" aria-labelledby="contact-cards-title">
        <h2 id="contact-cards-title" className="sr-only">
          Способы связи с Bee Craft
        </h2>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <address className="not-italic">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <ContactCard icon={PhoneIcon} eyebrow="Телефон" title="Позвонить">
                <a
                  href={CONTACTS.phoneHref}
                  className={`rounded-sm transition hover:text-stone-800 ${focusClass}`}
                >
                  {CONTACTS.phone}
                </a>
              </ContactCard>

              <ContactCard icon={EnvelopeIcon} eyebrow="Email" title="Написать">
                <a
                  href={CONTACTS.emailHref}
                  className={`break-all rounded-sm transition hover:text-stone-800 ${focusClass}`}
                >
                  {CONTACTS.email}
                </a>
              </ContactCard>

              <ContactCard icon={MapPinIcon} eyebrow="Адрес" title="Заглянуть">
                <p>{CONTACTS.address}</p>
                <p>{CONTACTS.address2}</p>
              </ContactCard>

              <ContactCard
                icon={ClockIcon}
                eyebrow="График"
                title="Часы работы"
              >
                <p>{CONTACTS.workdays}</p>
                <p>{CONTACTS.saturday}</p>
                <p className="mt-1 text-sm text-stone-500">{CONTACTS.sunday}</p>
              </ContactCard>
            </div>
          </address>
        </div>
      </section>

      <section className="pb-20 md:pb-28" aria-labelledby="map-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-4" aria-hidden="true">
            <div className="h-px w-10 bg-[#d4aa2a]" />
            <span className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Карта
            </span>
          </div>

          <h2 id="map-title" className="sr-only">
            Карта с адресом Bee Craft
          </h2>

          <div className="border border-stone-200 bg-white p-4 shadow-[0_20px_60px_rgba(41,37,36,0.06)] sm:p-5">
            <div className="relative h-[360px] overflow-hidden bg-stone-100 md:h-[460px]">
              <iframe
                title="Карта Bee Craft: Владивосток, Светланская 15"
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.25] contrast-[0.95]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2059.4043336578293!2d131.883516614013!3d43.11633900361224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5fb38df750757b13%3A0xb9b1fb16dbc5e7f!2z0YPQuy4g0KHQstC10YLQu9Cw0L3RgdC60LDRjywgMTUsINCS0LvQsNC00LjQstC-0YHRgtC-0LosINCf0YDQuNC80L7RgNGB0LrQuNC5INC60YDQsNC5LCDQoNC-0YHRgdC40Y8sIDY5MDA5MQ!5e0!3m2!1sru!2sch!4v1778937655565!5m2!1sru!2sch"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contacts;

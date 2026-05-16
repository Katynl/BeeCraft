import React from "react";
import { Link } from "react-router-dom";

const newsData = [
  {
    id: 1,
    title: "Новые декоративные ленты",
    badge: "Новинка",
    date: "20 мая 2026",
    image:
      "https://res.cloudinary.com/drkgovcn7/image/upload/v1778688192/lentaRed_koccd7.webp",
    description:
      "В коллекции появились новые ленты в скандинавском стиле четырёх цветов.",
  },

  {
    id: 2,
    title: "Открытие второго магазина",
    badge: "Важно",
    date: "15 мая 2026",
    image:
      "https://res.cloudinary.com/drkgovcn7/image/upload/v1778688415/ChatGPT_Image_14_%D0%BC%D0%B0%D1%8F_2026_%D0%B3._00_11_53_nqrrff.png",
    description:
      "Новое пространство Bee Craft в центре города уже готово встречать гостей.",
  },

  {
    id: 3,
    title: "Бесплатный мастер-класс",
    badge: "Событие",
    date: "10 мая 2026",
    image:
      "https://res.cloudinary.com/drkgovcn7/image/upload/v1778697429/front-view-woman-making-flowers-arrangement_dckuj8.jpg",
    description:
      "Онлайн-встреча о свадебной флористике и современных техниках оформления.",
  },

  {
    id: 4,
    title: "Благотворительность",
    badge: "Важные новости",
    date: "4 мая 2026",
    image:
      "https://res.cloudinary.com/drkgovcn7/image/upload/v1778697900/environmental-conservation-garden-children_glyjug.jpg",
    description: "С каждым заказом перечисляем 1% в фонд защиты растений.",
  },
];

const News = () => {
  return (
    <div className="bg-stone-50 overflow-hidden min-h-screen pb-44">
      {/* HERO */}
      <section>
        <div className="grid grid-cols-2 grid-rows-1 md:mt-16">
          <div className="mt-24 w-full border-t border-stone-200 col-start-1 col-end-3 row-start-1 h-[720px] md:h-[640px]" />
          <div className="relative md:mx-12 border-l border-stone-200 col-start-1 col-end-3 row-start-1 px-8 pt-32">
            <div className="absolute top-28 right-10 w-64 h-64 rounded-full bg-[#d4aa2a]/20 blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-[#d4aa2a]" />

                <span className="uppercase tracking-[0.25em] text-xs text-stone-500">
                  Журнал Bee Craft
                </span>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="leading-none font-black text-xl md:text-5xl lg:text-7xl xl:text-8xl">
                  НОВОСТИ
                </h1>

                <h2 className="text-stone-800 font-black text-xl md:text-5xl lg:text-7xl xl:text-8xl">
                  И СОБЫТИЯ
                </h2>
              </div>
              <div className="mt-10 grid lg:grid-cols-2 gap-8 items-end">
                <div>
                  <p className="mt-8 italic text-stone-500 text-lg leading-relaxed max-w-lg text-left">
                    Новые коллекции, вдохновение, флористические события и
                    атмосфера прямиком из нашей мастерской.
                  </p>
                </div>

                {/* image */}
                <div className="relative">
                  <div className="absolute -bottom-5 -right-5 w-full h-full border border-[#d4aa2a]/40" />

                  <video
                    src="https://res.cloudinary.com/drkgovcn7/video/upload/v1778690375/3805779-hd_1920_1080_25fps_yiyai3.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="https://res.cloudinary.com/drkgovcn7/image/upload/v1778697429/front-view-woman-making-flowers-arrangement_dckuj8.jpg"
                    className="relative z-10 h-[400px] w-full object-cover rounded-sm shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ПОСЛЕДНИЕ НОВОСТИ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* heading */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-px bg-[#d4aa2a]" />

                <span className="uppercase tracking-[0.25em] text-xs text-stone-500">
                  Последние публикации
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-stone-800">
                Новости мастерской
              </h2>
            </div>
          </div>

          {/* cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsData.map((news, index) => (
              <Link
                key={news.id}
                to={`/news/${news.id}`}
                className={`
                  group
                  bg-white
                  border
                  border-stone-200
                  overflow-hidden
                  hover:shadow-2xl
                  hover:-translate-y-1
                  transition-all
                  duration-500
                  ${index % 2 !== 0 ? "md:translate-y-12" : ""}
                `}
              >
                {/* image */}
                <div className="relative overflow-hidden h-[380px] bg-stone-800">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* badge */}
                  <div className="absolute top-5 right-5 bg-[#d4aa2a] text-stone-800 text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-2 rounded-sm">
                    {news.badge}
                  </div>

                  {/* number */}
                  <div className="absolute bottom-5 left-5 text-white/70 text-5xl font-black">
                    0{news.id}
                  </div>
                </div>

                {/* content */}
                <div className="p-8">
                  <div className="text-sm text-stone-400 tracking-wide mb-5">
                    {news.date}
                  </div>

                  <h3 className="text-3xl md:text-4xl font-light leading-tight text-stone-800 group-hover:text-black transition">
                    {news.title}
                  </h3>

                  <p className="mt-6 text-stone-500 leading-relaxed">
                    {news.description}
                  </p>

                  {/* bottom */}
                  <div className="mt-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-px bg-[#d4aa2a]" />

                      <span className="uppercase tracking-[0.25em] text-xs text-stone-400">
                        Читать
                      </span>
                    </div>

                    <span className="text-[#d4aa2a] text-xl group-hover:translate-x-1 transition">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;

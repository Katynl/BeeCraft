import React from "react";
import { Link } from "react-router-dom";

const focusClass =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4aa2a] focus-visible:ring-offset-2";

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
    <main className="min-h-screen overflow-hidden bg-stone-50 pb-44 text-stone-800">
      <section aria-labelledby="news-title">
        <div className="grid grid-cols-2 grid-rows-1 md:mt-16">
          <div
            className="col-start-1 col-end-3 row-start-1 mt-24 h-[720px] w-full border-t border-stone-200 md:h-[640px]"
            aria-hidden="true"
          />

          <div className="relative col-start-1 col-end-3 row-start-1 border-l border-stone-200 px-8 pt-32 md:mx-12">
            <div
              className="absolute right-10 top-28 h-64 w-64 rounded-full bg-[#d4aa2a]/20 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-4" aria-hidden="true">
                <div className="h-px w-12 bg-[#d4aa2a]" />
                <span className="text-xs uppercase tracking-[0.25em] text-stone-500">
                  Журнал Bee Craft
                </span>
              </div>

              <h1
                id="news-title"
                className="flex flex-wrap items-center justify-between gap-4 text-xl font-black leading-none text-stone-800 md:text-5xl lg:text-7xl xl:text-8xl"
              >
                <span>НОВОСТИ</span>
                <span>И СОБЫТИЯ</span>
              </h1>

              <div className="mt-10 grid items-end gap-8 lg:grid-cols-2">
                <p className="mt-8 max-w-lg text-left text-lg italic leading-relaxed text-stone-600">
                  Новые коллекции, вдохновение, флористические события и
                  атмосфера прямиком из нашей мастерской.
                </p>

                <div className="relative">
                  <div
                    className="absolute -bottom-5 -right-5 h-full w-full border border-[#d4aa2a]/40"
                    aria-hidden="true"
                  />

                  <video
                    src="https://res.cloudinary.com/drkgovcn7/video/upload/v1778690375/3805779-hd_1920_1080_25fps_yiyai3.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="https://res.cloudinary.com/drkgovcn7/image/upload/v1778697429/front-view-woman-making-flowers-arrangement_dckuj8.jpg"
                    className="relative z-10 h-[400px] w-full rounded-sm object-cover shadow-2xl"
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="latest-news-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-5 flex items-center gap-4" aria-hidden="true">
                <div className="h-px w-10 bg-[#d4aa2a]" />
                <span className="text-xs uppercase tracking-[0.25em] text-stone-500">
                  Последние публикации
                </span>
              </div>

              <h2
                id="latest-news-title"
                className="text-4xl font-light tracking-tight text-stone-800 md:text-5xl"
              >
                Новости мастерской
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {newsData.map((news, index) => (
              <Link
                key={news.id}
                to={`/news/${news.id}`}
                aria-label={`Читать новость: ${news.title}`}
                className={`
                  group
                  overflow-hidden
                  border
                  border-stone-200
                  bg-white
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:shadow-2xl
                  ${index % 2 !== 0 ? "md:translate-y-12" : ""}
                  ${focusClass}
                `}
              >
                <div className="relative h-[380px] overflow-hidden bg-stone-800">
                  <img
                    src={news.image}
                    alt={`Изображение новости: ${news.title}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                    aria-hidden="true"
                  />

                  <div className="absolute right-5 top-5 rounded-sm bg-[#d4aa2a] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-800">
                    {news.badge}
                  </div>

                  <div
                    className="absolute bottom-5 left-5 text-5xl font-black text-white/70"
                    aria-hidden="true"
                  >
                    0{news.id}
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-5 text-sm tracking-wide text-stone-500">
                    {news.date}
                  </div>

                  <h3 className="text-3xl font-light leading-tight text-stone-800 transition group-hover:text-black md:text-4xl">
                    {news.title}
                  </h3>

                  <p className="mt-6 leading-relaxed text-stone-600">
                    {news.description}
                  </p>

                  <div className="mt-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-px w-8 bg-[#d4aa2a]"
                        aria-hidden="true"
                      />

                      <span className="text-xs uppercase tracking-[0.25em] text-stone-500">
                        Читать
                      </span>
                    </div>

                    <span
                      className="text-xl text-[#d4aa2a] transition group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default News;

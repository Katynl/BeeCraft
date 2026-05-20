import React from "react";
import { Link, useParams } from "react-router-dom";

const focusClass =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4aa2a] focus-visible:ring-offset-2";

const newsData = {
  1: {
    title: "Новые декоративные ленты",
    category: "Новинка",
    date: "20 мая 2026",
    image:
      "https://res.cloudinary.com/drkgovcn7/image/upload/v1778688192/lentaRed_koccd7.webp",
    intro:
      "Новая коллекция лент в скандинавском уже доступна в магазине и онлайн.",
    text: `
Мы рады представить обновление коллекции декоративных лент для флористики и упаковки букетов.

В ассортименте появились новые нежные оттенки: красный, голубой, жёлтый и серый.

Нежная тканевая лента в классическую клетку с изящной волнистой окантовкой.
`,
  },
  2: {
    title: "Открытие второго магазина",
    category: "Важно",
    date: "15 мая 2026",
    image:
      "https://res.cloudinary.com/drkgovcn7/image/upload/v1778688415/ChatGPT_Image_14_%D0%BC%D0%B0%D1%8F_2026_%D0%B3._00_11_53_nqrrff.png",
    intro: "Мы открываем новое пространство Bee Craft в центре города.",
    text: `
Bee Craft открывает второе пространство в центре города на Уткинской 38!

Новый магазин станет местом для вдохновения, живого общения и знакомства с новыми коллекциями.

Вас ждут редкие материалы, уютная атмосфера и специальные предложения для первых гостей.
`,
  },
  3: {
    title: "Бесплатный мастер-класс",
    category: "Событие",
    date: "10 мая 2026",
    image:
      "https://res.cloudinary.com/drkgovcn7/image/upload/v1778697429/front-view-woman-making-flowers-arrangement_dckuj8.jpg",
    intro: "Онлайн-встреча о свадебной флористике и работе с текстурами.",
    text: `
Приглашаем флористов и всех любителей цветов на бесплатный онлайн-мастер-класс.

Мы поговорим о свадебной флористике, трендах сезона и работе с текстурами.

Количество мест ограничено.
`,
  },
  4: {
    title: "Благотворительность",
    category: "Важные новости",
    date: "4 мая 2026",
    image:
      "https://res.cloudinary.com/drkgovcn7/image/upload/v1778697900/environmental-conservation-garden-children_glyjug.jpg",
    intro:
      "С каждого заказа мы перечисляем 1% в фонд защиты растений. Покупайте флористические материалы и помогайте зелёному миру становиться здоровее. Вместе мы сила!",
    text: `
Друзья, мы тут подумали: цветы и природа дают нам столько красоты и вдохновения, что грех не сказать им спасибо. Поэтому с каждого заказа, будь то ленточка для букета или декоративная корзинка, мы откладываем 1% в специальную копилку.

Эти деньги мы перечисляем в фонд, который заботится о растениях: высаживает новые деревья, восстанавливает луга и помогает редким цветам не исчезнуть. Знаете, такая наша маленькая зелёная благодарность.
`,
  },
};

const NewsDetails = () => {
  const { id } = useParams();
  const news = newsData[id];

  if (!news) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6 text-stone-700">
        <section
          className="max-w-md border border-stone-200 bg-white p-8 text-center shadow-[0_18px_60px_rgba(41,37,36,0.06)]"
          aria-labelledby="news-not-found-title"
        >
          <div
            className="mx-auto mb-6 h-px w-16 bg-[#d4aa2a]"
            aria-hidden="true"
          />

          <h1
            id="news-not-found-title"
            className="text-3xl font-light text-stone-800"
          >
            Новость не найдена
          </h1>

          <p className="mt-4 text-stone-500">
            Возможно, ссылка устарела или материал уже сняли с публикации.
          </p>

          <Link
            to="/news"
            className={`mt-8 inline-flex items-center justify-center bg-stone-800 px-7 py-4 text-sm uppercase tracking-[0.2em] text-[#d4aa2a] transition hover:bg-[#d4aa2a] hover:text-stone-800 ${focusClass}`}
          >
            Ко всем новостям
          </Link>
        </section>
      </main>
    );
  }

  const relatedNews = Object.entries(newsData)
    .filter(([key]) => key !== id)
    .slice(0, 2);

  return (
    <main className="min-h-screen overflow-hidden bg-stone-50 text-stone-800">
      <section className="relative pb-44 pt-28 md:pt-32">
        <div
          className="pointer-events-none absolute right-0 top-16 h-72 w-72 rounded-full bg-[#d4aa2a]/15 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -left-10 top-32 hidden select-none text-[120px] font-black leading-none text-stone-200/60 md:text-[220px] lg:block"
          aria-hidden="true"
        >
          BEE
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-stone-500"
            aria-label="Хлебные крошки"
          >
            <Link
              to="/"
              className={`transition hover:text-stone-800 ${focusClass}`}
            >
              Главная
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              to="/news"
              className={`transition hover:text-stone-800 ${focusClass}`}
            >
              Новости
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-stone-700" aria-current="page">
              {news.title}
            </span>
          </nav>

          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="mb-6 flex items-center gap-4" aria-hidden="true">
                <div className="h-px w-12 bg-[#d4aa2a]" />
              </div>

              <span className="inline-flex items-center rounded-sm bg-[#d4aa2a]/20 px-4 py-2 text-xs uppercase tracking-[0.22em] text-stone-700">
                {news.category}
              </span>

              <h1 className="mt-6 text-3xl font-light leading-[0.95] tracking-tight text-stone-800 md:text-6xl lg:text-7xl">
                {news.title}
              </h1>

              <p className="mt-6 text-left text-lg italic leading-relaxed text-stone-600 md:text-center">
                {news.intro}
              </p>

              <div className="mt-8 text-sm uppercase tracking-[0.25em] text-stone-500">
                {news.date}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative">
                <div
                  className="absolute -bottom-4 -right-4 h-full w-full border border-[#d4aa2a]/40"
                  aria-hidden="true"
                />
                <img
                  src={news.image}
                  alt={`Изображение новости: ${news.title}`}
                  className="relative z-10 h-[420px] w-full object-cover shadow-[0_20px_60px_rgba(0,0,0,0.12)] md:h-[560px]"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <aside className="lg:sticky lg:top-28 lg:col-span-3">
              <div className="bg-white p-6 shadow-sm">
                <dl className="space-y-4 text-sm text-stone-500">
                  <div className="flex justify-between gap-4 border-b border-stone-100 pb-3">
                    <dt>Категория</dt>
                    <dd className="text-stone-700">{news.category}</dd>
                  </div>

                  <div className="flex justify-between gap-4 border-b border-stone-100 pb-3">
                    <dt>Дата</dt>
                    <dd className="text-stone-700">{news.date}</dd>
                  </div>

                  <div className="flex justify-between gap-4">
                    <dt>Бренд</dt>
                    <dd className="text-stone-700">Bee Craft</dd>
                  </div>
                </dl>
              </div>
            </aside>

            <article className="lg:col-span-6">
              <div className="bg-white p-6 shadow-sm md:p-10">
                <div
                  className="mb-8 flex items-center gap-4"
                  aria-hidden="true"
                >
                  <div className="h-px w-10 bg-[#d4aa2a]" />
                  <span className="text-xs uppercase tracking-[0.25em] text-stone-500">
                    Детали
                  </span>
                </div>

                <div className="mb-8 rounded-sm border-l-4 border-[#d4aa2a] bg-stone-50 px-5 py-4">
                  <p className="leading-relaxed text-stone-700 italic">
                    {news.intro}
                  </p>
                </div>

                <div className="space-y-4 text-left text-[17px] leading-[1.7] text-stone-600">
                  {news.text
                    .trim()
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>

                <div className="mt-10 flex flex-wrap justify-between gap-4">
                  <Link
                    to="/news"
                    className={`inline-flex items-center justify-center border border-stone-300 px-6 py-3 text-sm uppercase tracking-[0.2em] text-stone-700 transition hover:border-[#d4aa2a] hover:bg-[#d4aa2a]/10 ${focusClass}`}
                  >
                    ← Ко всем новостям
                  </Link>

                  <Link
                    to="/catalog"
                    className={`inline-flex items-center justify-center bg-stone-800 px-6 py-3 text-sm uppercase tracking-[0.2em] text-[#d4aa2a] transition hover:bg-[#d4aa2a] hover:text-stone-800 ${focusClass}`}
                  >
                    В каталог
                  </Link>
                </div>
              </div>
            </article>

            <aside
              className="lg:col-span-3"
              aria-label="Дополнительное изображение новости"
            >
              <div className="flex flex-col justify-between space-y-6">
                <div className="overflow-hidden shadow-sm">
                  <img
                    src={news.image}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section
        className="border-t border-stone-200 bg-stone-50 py-16 md:py-20"
        aria-labelledby="related-news-title"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px w-10 bg-[#d4aa2a]" aria-hidden="true" />
            <h2
              id="related-news-title"
              className="text-xs uppercase tracking-[0.25em] text-stone-500"
            >
              Ещё новости
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {relatedNews.map(([key, item]) => (
              <Link
                key={key}
                to={`/news/${key}`}
                aria-label={`Читать новость: ${item.title}`}
                className={`group overflow-hidden border border-stone-200 bg-white transition-all duration-500 hover:shadow-xl ${focusClass}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={`Изображение новости: ${item.title}`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute left-4 top-4 rounded-sm bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-stone-700 backdrop-blur-sm">
                    {item.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-3 text-sm text-stone-500">{item.date}</div>

                  <h3 className="text-2xl font-light leading-tight text-stone-800 transition group-hover:text-black">
                    {item.title}
                  </h3>

                  <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#b89422]">
                    Читать
                    <span
                      className="transition group-hover:translate-x-1"
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

export default NewsDetails;

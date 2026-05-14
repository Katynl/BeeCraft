import React from "react";
import { Link, useParams } from "react-router-dom";

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
    intro: "Мы открываем новое пространство Bloom..ing Craft в центре города.",
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
      <div className="min-h-screen bg-stone-50 text-stone-700 flex items-center justify-center px-6">
        Новость не найдена
      </div>
    );
  }

  const relatedNews = Object.entries(newsData)
    .filter(([key]) => key !== id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 overflow-hidden">
      {/* HERO */}
      <section className="relative pt-28 md:pt-32 pb-44">
        <div className="absolute top-16 right-0 w-72 h-72 bg-[#d4aa2a]/15 blur-3xl rounded-full pointer-events-none" />
        <div className="hidden lg:block absolute -left-10 top-32 text-[120px] md:text-[220px] font-black text-stone-200/60 leading-none select-none pointer-events-none">
          BEE
        </div>

        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-[#d4aa2a]" />
              </div>

              <span className="inline-flex items-center rounded-sm bg-[#d4aa2a]/20 px-4 py-2 text-xs uppercase tracking-[0.22em] text-stone-700">
                {news.category}
              </span>

              <h1 className="mt-6 text-3xl md:text-6xl lg:text-7xl font-light leading-[0.95] tracking-tight text-stone-800">
                {news.title}
              </h1>

              <p className="mt-6 text-center italic text-stone-500 text-lg leading-relaxed">
                {news.intro}
              </p>

              <div className="mt-8 text-sm uppercase tracking-[0.25em] text-stone-400">
                {news.date}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative">
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#d4aa2a]/40" />
                <img
                  src={news.image}
                  alt={news.title}
                  className="relative z-10 w-full h-[420px] md:h-[560px] object-cover shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* ASIDE */}
            <aside className="lg:col-span-3 lg:sticky lg:top-28">
              <div className="bg-white shadow-sm p-6">
                <div className="space-y-4 text-sm text-stone-500">
                  <div className="flex justify-between gap-4 border-b border-stone-100 pb-3">
                    <span>Категория</span>
                    <span className="text-stone-700">{news.category}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-stone-100 pb-3">
                    <span>Дата</span>
                    <span className="text-stone-700">{news.date}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Бренд</span>
                    <span className="text-stone-700">Bee Craft</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* MAIN TEXT */}
            <article className="lg:col-span-6">
              <div className="bg-white shadow-sm p-6 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-px bg-[#d4aa2a]" />
                  <span className="uppercase tracking-[0.25em] text-xs text-stone-500">
                    Детали
                  </span>
                </div>

                <div className="rounded-sm border-l-4 border-[#d4aa2a] bg-stone-50 px-5 py-4 mb-8">
                  <p className="text-stone-700 leading-relaxed italic">
                    {news.intro}
                  </p>
                </div>

                <div className="space-y-4 text-[17px] text-justify leading-[1.5] text-stone-600">
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
                    className="inline-flex items-center justify-center px-6 py-3 border border-stone-300  text-stone-700 text-sm uppercase tracking-[0.2em] hover:border-[#d4aa2a] hover:bg-[#d4aa2a]/10 transition"
                  >
                    ← Ко всем новостям
                  </Link>

                  <Link
                    to="/catalog"
                    className="inline-flex items-center justify-center px-6 py-3 bg-stone-800 text-[#d4aa2a] text-sm uppercase tracking-[0.2em] hover:bg-[#d4aa2a] hover:text-stone-800 transition"
                  >
                    В каталог
                  </Link>
                </div>
              </div>
            </article>

            {/* Картинка */}
            <div className="lg:col-span-3">
              <div className="flex flex-col justify-between space-y-6">
                <div className="overflow-hidden shadow-sm">
                  <img
                    src={news.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-16 md:py-20 border-t border-stone-200 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-px bg-[#d4aa2a]" />
            <span className="uppercase tracking-[0.25em] text-xs text-stone-500">
              Ещё новости
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {relatedNews.map(([key, item]) => (
              <Link
                key={key}
                to={`/news/${key}`}
                className="group bg-white border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-stone-700 rounded-sm">
                    {item.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-sm text-stone-400 mb-3">{item.date}</div>
                  <h3 className="text-2xl font-light leading-tight text-stone-800 group-hover:text-black transition">
                    {item.title}
                  </h3>

                  <div className="mt-6 inline-flex items-center gap-2 text-[#d4aa2a] uppercase tracking-[0.2em] text-xs">
                    Читать
                    <span className="group-hover:translate-x-1 transition">
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

export default NewsDetails;

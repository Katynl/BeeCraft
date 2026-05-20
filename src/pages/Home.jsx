import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  SparklesIcon,
  ChatBubbleLeftIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import useProducts from "../hooks/useProducts";
import ProductsCard from "../components/ProductCard";
import FeedbackForm from "../components/FeedbackForm";

const focusClass =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4aa2a] focus-visible:ring-offset-2";

// Константы вне компонента
const NEWS = [
  {
    id: 1,
    title: "Новые декоративные ленты",
    category: "Новинка",
    date: "20 мая 2026",
    image:
      "https://res.cloudinary.com/drkgovcn7/image/upload/v1778688192/lentaRed_koccd7.webp",
    description:
      "В коллекции появились новые мягкие оттенки для упаковки букетов и декора.",
  },
  {
    id: 2,
    title: "Открытие второго магазина",
    category: "Важно",
    date: "15 мая 2026",
    image:
      "https://res.cloudinary.com/drkgovcn7/image/upload/v1778688415/ChatGPT_Image_14_%D0%BC%D0%B0%D1%8F_2026_%D0%B3._00_11_53_nqrrff.png",
    description: "Новое пространство Bee Craft открылось в центре города.",
  },
  {
    id: 3,
    title: "Бесплатный мастер-класс",
    category: "Событие",
    date: "10 мая 2026",
    image:
      "https://res.cloudinary.com/drkgovcn7/image/upload/v1778697429/front-view-woman-making-flowers-arrangement_dckuj8.jpg",
    description: "Онлайн-встреча о свадебной флористике и работе с текстурами.",
  },
];

// Хелпер для оптимизации изображений Cloudinary
const getOptimizedImage = (url, width = 600, height = 400) => {
  if (!url.includes("cloudinary.com")) return url;
  // Добавляем параметры трансформации: автоформат, качество, размер
  return `${url}?w=${width}&h=${height}&fit=crop&q=80&f=auto`;
};

const Home = React.memo(() => {
  const navigate = useNavigate();
  const { products, error, loading } = useProducts();
  const [activeTab, setActiveTab] = useState("new");
  const [videoVisible, setVideoVisible] = useState(false);
  const videoRef = useRef(null);

  // Отложенная загрузка видео при попадании в область видимости
  useEffect(() => {
    if (!videoRef.current || window.innerWidth < 768) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    if (activeTab === "new")
      return products.filter((p) => p.is_new).slice(0, 4);
    if (activeTab === "popular")
      return products.filter((p) => p.is_popular).slice(0, 4);
    if (activeTab === "gifts")
      return products.filter((p) => p.is_gifts).slice(0, 4);

    return [];
  }, [products, activeTab]);

  const handleCatalogClick = useCallback(() => {
    navigate("/catalog");
  }, [navigate]);

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  if (loading) {
    return (
      <main
        className="flex min-h-screen items-center justify-center bg-stone-50 text-lg text-stone-500"
        aria-busy="true"
      >
        <div role="status" aria-live="polite">
          Загрузка...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-4 text-red-600">
        <div role="alert">{error}</div>
      </main>
    );
  }

  return (
    <main className="overflow-hidden bg-stone-50">
      {/* БАННЕР */}
      <section aria-labelledby="home-title">
        <div className="grid grid-cols-2 grid-rows-1 md:mt-16">
          <div
            className="col-start-1 col-end-3 row-start-1 mt-24 h-[500px] w-full border-t border-stone-200 md:h-[640px]"
            aria-hidden="true"
          />

          <div className="relative col-start-1 col-end-3 row-start-1 border-l border-stone-200 px-8 pt-32 md:mx-12">
            <div
              className="absolute right-10 top-28 h-64 w-64 rounded-full bg-[#d4aa2a]/20 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="flex items-center gap-4" aria-hidden="true">
                <div className="h-px w-16 bg-stone-300" />
                <span className="text-xs uppercase tracking-[0.3em] text-stone-500">
                  Онлайн-магазин
                </span>
              </div>

              <h1
                id="home-title"
                className="flex items-center justify-between gap-4 text-3xl font-black leading-none md:text-6xl lg:text-9xl"
              >
                <span className="text-[#d4aa2a]">BEE</span>
                <span className="text-stone-800">CRAFT</span>
              </h1>

              <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <p className="mt-8 max-w-lg text-left text-base italic leading-relaxed text-stone-600 sm:text-lg">
                    Пространство флористики, текстур и вдохновения. Материалы
                    для букетов, декора и творчества в эстетике тёплого
                    editorial-стиля.
                  </p>

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleCatalogClick}
                      className={`bg-stone-800 px-8 py-4 text-sm uppercase tracking-[0.2em] text-[#d4aa2a] transition duration-300 hover:bg-[#d4aa2a] hover:text-stone-800 ${focusClass}`}
                    >
                      Перейти в каталог
                    </button>

                    <Link
                      to="/news"
                      className={`border border-stone-200 px-8 py-4 text-center text-sm uppercase tracking-[0.2em] text-stone-700 transition duration-300 hover:border-[#d4aa2a] hover:bg-[#d4aa2a]/10 ${focusClass}`}
                    >
                      Читать новости
                    </Link>
                  </div>
                </div>

                <div className="relative hidden md:block">
                  <div
                    className="absolute -bottom-5 -right-5 hidden h-full w-full border border-[#d4aa2a]/40 md:block"
                    aria-hidden="true"
                  />

                  <div
                    ref={videoRef}
                    className="relative z-10 h-[400px] w-full rounded-sm object-cover shadow-2xl"
                  >
                    {videoVisible && (
                      <video
                        src="https://res.cloudinary.com/drkgovcn7/video/upload/v1778939599/compressed_0_bee_daisy_1920x1080_mgczvt.webm"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="none"
                        poster={getOptimizedImage(
                          "https://res.cloudinary.com/drkgovcn7/image/upload/v1778957864/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_558_vecrso.png",
                          800,
                          450,
                        )}
                        className="h-full w-full rounded-sm object-cover"
                        aria-hidden="true"
                        tabIndex={-1}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ МЫ */}
      <section
        className="my-24 bg-stone-800 py-24 md:py-32"
        aria-labelledby="why-title"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex items-center gap-4">
            <div className="h-px w-12 bg-[#d4aa2a]" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.3em] text-stone-400">
              Почему мы
            </span>
          </div>

          <h2 id="why-title" className="sr-only">
            Почему выбирают Bee Craft
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: SparklesIcon,
                title: "Качество материалов",
                text: "Только проверенные поставщики и свежие цветы с собственных плантаций.",
              },
              {
                icon: BuildingStorefrontIcon,
                title: "Удобный самовывоз",
                text: "Два пункта выдачи в центре города, работаем без выходных.",
              },
              {
                icon: ChatBubbleLeftIcon,
                title: "Поддержка 24/7",
                text: "Наши флористы всегда готовы помочь с выбором и ответить на вопросы.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-sm bg-stone-50 p-8 text-center transition-all duration-300 hover:shadow-xl"
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-sm bg-gradient-to-br from-[#d4aa2a]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    <div
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4aa2a]/20 transition group-hover:bg-[#d4aa2a]"
                      aria-hidden="true"
                    >
                      <Icon className="h-8 w-8 text-stone-700 group-hover:text-white" />
                    </div>

                    <h3 className="mb-2 text-xl font-medium text-stone-800">
                      {item.title}
                    </h3>

                    <p className="text-sm text-stone-600">{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* НОВОСТИ */}
      <section
        className="border-y border-stone-200 bg-stone-50 py-24"
        aria-labelledby="home-news-title"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-4 flex items-center gap-4" aria-hidden="true">
                <div className="h-px w-10 bg-[#d4aa2a]" />
                <span className="text-xs uppercase tracking-[0.3em] text-stone-500">
                  Журнал
                </span>
              </div>

              <h2
                id="home-news-title"
                className="text-4xl font-light tracking-tight text-stone-800 md:text-5xl"
              >
                Новости и события
              </h2>
            </div>

            <Link
              to="/news"
              className={`text-sm uppercase tracking-[0.2em] text-stone-600 transition hover:text-stone-800 ${focusClass}`}
            >
              Смотреть всё →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {NEWS.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.id}`}
                aria-label={`Читать новость: ${item.title}`}
                className={`group overflow-hidden border border-stone-200 bg-white transition-all duration-500 hover:shadow-2xl ${focusClass}`}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={getOptimizedImage(item.image, 600, 400)}
                    alt={`Изображение новости: ${item.title}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 rounded-sm bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-stone-700 backdrop-blur-md">
                    {item.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4 text-xs uppercase tracking-[0.2em] text-stone-500">
                    {item.date}
                  </div>

                  <h3 className="mb-4 text-2xl font-light leading-tight text-stone-800">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-stone-600">
                    {item.description}
                  </p>

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

      {/* КАТАЛОГ */}
      <section className="py-24 md:py-32" aria-labelledby="home-catalog-title">
        <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-10">
          <div className="mb-12 flex items-center gap-4">
            <div className="h-px w-10 bg-[#d4aa2a]" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Каталог
            </span>
          </div>

          <h2 id="home-catalog-title" className="sr-only">
            Товары каталога
          </h2>

          <div
            className="mb-12 flex flex-wrap gap-3 sm:justify-between md:justify-start"
            role="tablist"
            aria-label="Фильтр товаров на главной"
          >
            {[
              { id: "new", label: "Новинки" },
              { id: "popular", label: "Популярное" },
              { id: "gifts", label: "Подарки" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls="home-products-panel"
                onClick={() => handleTabChange(tab.id)}
                className={`border px-2 py-3 text-xs uppercase transition duration-300 md:px-6 md:tracking-[0.2em] ${
                  activeTab === tab.id
                    ? "border-stone-200 bg-stone-800 text-[#d4aa2a]"
                    : "border-stone-200 text-stone-600 hover:border-[#d4aa2a]"
                } ${focusClass}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div id="home-products-panel" role="tabpanel" aria-live="polite">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductsCard
                    key={product.id}
                    product={product}
                    index={0} // index не используется в компоненте, можно убрать
                  />
                ))}
              </div>
            ) : (
              <div
                className="border border-stone-200 bg-white py-20 text-center text-stone-500"
                role="status"
              >
                Пока нет товаров
              </div>
            )}
          </div>
        </div>
      </section>

      <FeedbackForm />
    </main>
  );
});

Home.displayName = "Home";

export default Home;

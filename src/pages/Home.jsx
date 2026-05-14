import React, { useState, useMemo } from "react";
import "../input.css";
import { useNavigate, Link } from "react-router-dom";
import {
  SparklesIcon,
  ChatBubbleLeftIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import useProducts from "../hooks/useProducts";
import ProductsCard from "../components/ProductCard";
import FeedbackForm from "../components/FeedbackForm";
import video from "../public/img/compressed_0_bee_daisy_1920x1080.webm";
import fialka from "../public/img/fialka.webp";

const Home = () => {
  const navigate = useNavigate();
  const { products, error, loading } = useProducts();
  const [activeTab, setActiveTab] = useState("new");

  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    let filtered = [];

    if (activeTab === "new") {
      filtered = products.filter((p) => p.is_new);
    }

    if (activeTab === "popular") {
      filtered = products.filter((p) => p.is_popular);
    }

    if (activeTab === "gifts") {
      filtered = products.filter((p) => p.is_gifts);
    }

    return filtered.slice(0, 4);
  }, [products, activeTab]);

  const news = [
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
      description:
        "Новое пространство Bloom..ing Craft открылось в центре города.",
    },

    {
      id: 3,
      title: "Бесплатный мастер-класс",
      category: "Событие",
      date: "10 мая 2026",
      image:
        "https://res.cloudinary.com/drkgovcn7/image/upload/v1778697429/front-view-woman-making-flowers-arrangement_dckuj8.jpg",
      description:
        "Онлайн-встреча о свадебной флористике и работе с текстурами.",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-500 text-lg">
        Загрузка...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-stone-50 overflow-hidden">
      {/* БАННЕР */}
      <section>
        <div className="grid grid-cols-2 grid-rows-1 md:mt-16">
          <div className="mt-24 w-full border-t border-stone-200 col-start-1 col-end-3 row-start-1 h-[720px] md:h-[640px]" />
          <div className="relative md:mx-12 border-l border-stone-200 col-start-1 col-end-3 row-start-1 px-8 pt-32">
            <div className="absolute top-28 right-10 w-64 h-64 rounded-full bg-[#d4aa2a]/20 blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-px bg-stone-300" />
                <span className="text-xs uppercase tracking-[0.3em] text-stone-400">
                  Онлайн-магазин
                </span>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-[#d4aa2a] leading-none font-black text-xl md:text-5xl lg:text-9xl">
                  BEE
                </h1>
                <h2 className="text-stone-800 font-black text-xl md:text-5xl lg:text-9xl">
                  CRAFT
                </h2>
              </div>
              <div className="mt-10 grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="mt-8 max-w-lg text-justify  text-stone-500 leading-relaxed text-base sm:text-lg">
                    Пространство флористики, текстур и вдохновения. Материалы
                    для букетов, декора и творчества в эстетике тёплого
                    editorial-стиля.
                  </p>
                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => navigate("/catalog")}
                      className="px-8 py-4 bg-stone-800 text-[#d4aa2a] uppercase tracking-[0.2em] text-sm hover:bg-[#d4aa2a] hover:text-stone-800 transition duration-300"
                    >
                      Перейти в каталог
                    </button>

                    <Link
                      to="/news"
                      className="px-8 py-4 border border-stone-200 text-stone-700 uppercase tracking-[0.2em] text-sm hover:border-[#d4aa2a] hover:bg-[#d4aa2a]/10 transition duration-300 text-center"
                    >
                      Читать новости
                    </Link>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -bottom-5 -right-5 w-full h-full border border-[#d4aa2a]/40" />

                  <video
                    src={video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={fialka}
                    className="relative z-10 h-[400px] w-full object-cover rounded-sm shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ МЫ */}
      <section className="py-24 my-24 md:py-32 bg-stone-800">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-14">
            <div className="w-12 h-px bg-[#d4aa2a]" />
            <span className="uppercase tracking-[0.3em] text-xs text-stone-400">
              Почему мы
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Карточка 1 */}
            <div className="group relative bg-stone-50 rounded-sm p-8 text-center hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#d4aa2a]/20 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#d4aa2a]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#d4aa2a] transition">
                  <SparklesIcon className="h-8 w-8 text-stone-700 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-medium text-stone-800 mb-2">
                  Качество материалов
                </h3>
                <p className="text-stone-500 text-sm">
                  Только проверенные поставщики и свежие цветы с собственных
                  плантаций.
                </p>
              </div>
            </div>
            {/* Карточка 2 */}
            <div className="group relative bg-stone-50 rounded-sm p-8 text-center hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#d4aa2a]/20 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#d4aa2a]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#d4aa2a] transition">
                  <BuildingStorefrontIcon className="h-8 w-8 text-stone-700 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-medium text-stone-800 mb-2">
                  Удобный самовывоз
                </h3>
                <p className="text-stone-500 text-sm">
                  Два пункта выдачи в центре города, работаем без выходных.
                </p>
              </div>
            </div>
            {/* Карточка 3 */}
            <div className="group relative bg-stone-50 rounded-sm p-8 text-center hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#d4aa2a]/20 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#d4aa2a]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#d4aa2a] transition">
                  <ChatBubbleLeftIcon className="h-8 w-8 text-stone-700 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-medium text-stone-800 mb-2">
                  Поддержка 24/7
                </h3>
                <p className="text-stone-500 text-sm">
                  Наши флористы всегда готовы помочь с выбором и ответить на
                  вопросы.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* НОВОСТИ */}
      <section className="py-24 bg-stone-50 border-y border-stone-200">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 mb-14 flex-wrap">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-[#d4aa2a]" />
                <span className="uppercase tracking-[0.3em] text-xs text-stone-500">
                  Журнал
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-stone-800">
                Новости и события
              </h2>
            </div>
            <Link
              to="/news"
              className="uppercase tracking-[0.2em] text-sm text-stone-500 hover:text-stone-800 transition"
            >
              Смотреть всё →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.id}`}
                className="group bg-white border border-stone-200 overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative overflow-hidden h-72">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] uppercase tracking-[0.25em] text-stone-700">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-4">
                    {item.date}
                  </div>
                  <h3 className="text-2xl font-light text-stone-800 leading-tight mb-4">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 leading-relaxed text-sm">
                    {item.description}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 uppercase tracking-[0.2em] text-xs text-[#d4aa2a]">
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

      {/* КАТАЛОГ */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-px bg-[#d4aa2a]" />
            <span className="uppercase tracking-[0.3em] text-xs text-stone-500">
              Каталог
            </span>
          </div>
          {/* Вкладки */}
          <div className="flex flex-wrap md:justify-start sm:justify-between gap-3 mb-12">
            {[
              { id: "new", label: "Новинки" },
              { id: "popular", label: "Популярное" },
              { id: "gifts", label: "Подарки" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2 md:px-6 py-3 uppercase md:tracking-[0.2em] text-xs border transition duration-300 ${
                  activeTab === tab.id
                    ? "bg-stone-800 text-[#d4aa2a] border-stone-200"
                    : "border-stone-200 text-stone-500 hover:border-[#d4aa2a]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Карточки */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product, index) => (
                <ProductsCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-stone-200 py-20 text-center text-stone-400">
              Пока нет товаров
            </div>
          )}
        </div>
      </section>

      {/* ФОРМА ОБРАТНОЙ СВЯЗИ */}
      <FeedbackForm />
    </div>
  );
};

export default Home;

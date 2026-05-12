// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

import "../index.css";
// import useProducts from "../hooks/useProducts";
// import ProductsCard from "../components/ProductCard";
// import CategoryCarousel from "../components/CategoryCarousel";
// import FeedbackForm from "../components/FeedbackForm";

// import flower from "../public/img/flowers4.webp";
// import fialka from "../public/img/fialka.webp";
// import gibiskuz from "../public/img/gibiskus.webp";
// import gipsophil from "../public/img/gipsofils.webp";
// import kalla from "../public/img/Kalla.webp";
// import pion from "../public/img/pion.webp";
// import roza from "../public/img/roza.webp";
// import convert from "../public/img/конверт3.png";
// import video from "../public/img/compressed_0_bee_daisy_1920x1080.webm";

// const Home = () => {
//   const navigate = useNavigate();
//   const { products, error, loading } = useProducts();
//   const [activeTab, setActiveTab] = useState("new");
//   // Сортировка по вкладкам
//   const getFilteredProducts = () => {
//     if (!products || !Array.isArray(products)) return [];

//     if (activeTab === "new") {
//       return products.filter((p) => p.is_new === true);
//     }
//     if (activeTab === "popular") {
//       return products.filter((p) => p.is_popular === true);
//     }
//     if (activeTab === "gifts") {
//       return products.filter((p) => p.is_gifts === true);
//     }
//     return [];
//   };
//   const filtered = getFilteredProducts();
//   // Загрузка
//   if (loading) {
//     return <div className="px-4 py-8">Загружаем...</div>;
//   }
//   // Ошибка
//   if (error) {
//     return (
//       <div className="px-4 py-8 text-center text-red-500">Ошибка: {error}</div>
//     );
//   }

//   return (
//     <div className="bg-stone-50">
//       {/* Вступление */}
//       <section>
//         <div className="grid grid-cols-2 grid-rows-1 mt-8">
//           <div className="mt-28 mb-28 w-full border-t border-b col-start-1 col-end-3 row-start-1"></div>
//           <div className="md:mx-12 border-r border-l h-screen pt-36 px-8 col-start-1 col-end-3 row-start-1">
//             <div className="flex w-full justify-between">
//               <h1 className="leading-none">BLOOM..IING</h1>
//               <h2 className="text-stone-800">CRAFT</h2>
//             </div>

//             <div className="w-full h-96 bg-gray-100 gap-4">
//               <video
//                 src={video}
//                 autoPlay
//                 loop
//                 poster={fialka}
//                 muted
//                 playsInline
//                 className="w-full h-full object-cover rounded-sm"
//               ></video>
//             </div>

//             <div className="xl:flex justify-between py-4 gap-4">
//               <p className="text-justify w-full xl:w-1/3">
//                 Ваш онлайн‑магазин флористики и декора – всегда под рукой. Мы
//                 собираем для вас лучшие материалы со всего света. Творите без
//                 границ.
//               </p>
//               <div className="w-1/3"></div>

//               <button
//                 className="mt-6 xl:mt-0 p-5 w-full xl:w-1/3 bg-stone-800  text-[#f4d864] hover:bg-[#f4d864] hover:text-stone-800 active:scale-95 transition duration-300 text-lg tracking-wide"
//                 onClick={() => navigate("/catalog")}
//                 aria-label="Перейти в каталог"
//               >
//                 Перейти в каталог
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* О нас */}
//       <section className="flex flex-col w-full min-h-screen bg-stone-800 p-6 md:p-12 lg:p-24 gap-8 md:gap-12">
//         <div className="flex justify-between items-baseline">
//           <h2>ПОЧЕМУ</h2>
//           <h2>МЫ?</h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 flex-1">
//           {/* Карточка 1 */}
//           <div className="bg-stone-100 rounded-sm shadow-xl hover:scale-105 transition duration-500 p-6 flex items-center justify-center">
//             {/* Здесь может быть текст или иконка */}
//             <p className="text-center text-stone-800">Качество материалов</p>
//           </div>
//           {/* Карточка 2 */}
//           <div className="bg-stone-100 rounded-sm shadow-xl hover:scale-105 transition duration-500 p-6 flex items-center justify-center">
//             <p className="text-center text-stone-800">Быстрая доставка</p>
//           </div>
//           {/* Карточка 3 */}
//           <div className="bg-stone-100 rounded-sm shadow-xl hover:scale-105 transition duration-500 p-6 flex items-center justify-center">
//             <p className="text-center text-stone-800">Поддержка 24/7</p>
//           </div>
//         </div>
//       </section>

//       {/* Вкладки */}
//       <section className="py-24 md:px-4">
//         <div className="lg:text-left">
//           <button
//             onClick={() => setActiveTab("new")}
//             aria-label="Новинки"
//             className={`border-r-2 border-black/20 px-1 md:px-6 text-xl md:text-4xl xl:text-5xl ${
//               activeTab === "new" ? "text-stone-800" : "text-black/20"
//             }`}
//           >
//             Новинки
//           </button>

//           <button
//             onClick={() => setActiveTab("popular")}
//             aria-label="Популярное"
//             className={`px-1 md:px-6 text-xl md:text-4xl xl:text-5xl ${
//               activeTab === "popular" ? "text-stone-800" : "text-black/20"
//             }`}
//           >
//             Популярное
//           </button>

//           <button
//             onClick={() => setActiveTab("gifts")}
//             aria-label="Подарки"
//             className={`border-l-2 border-black/20 px-1 text-xl md:px-6 md:text-4xl xl:text-5xl ${
//               activeTab === "gifts" ? "text-stone-800" : "text-black/20"
//             }`}
//           >
//             Подарки
//           </button>
//         </div>

//         {/* Карточки */}
//         {filtered.length > 0 ? (
//           <div className="py-8 grid grid-cols-2 px-2 xl:grid-cols-4 gap-4">
//             {filtered.map((product, idx) => (
//               <ProductsCard key={product.id} product={product} index={idx} />
//             ))}
//           </div>
//         ) : (
//           <p className="p-6 text-gray-400">
//             Ой-ой! Товаров в этой категории пока нет...
//           </p>
//         )}
//       </section>

//       <CategoryCarousel></CategoryCarousel>

//       <FeedbackForm></FeedbackForm>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SparklesIcon,
  TruckIcon,
  ChatBubbleLeftIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import useProducts from "../hooks/useProducts";
import ProductsCard from "../components/ProductCard";
import CategoryCarousel from "../components/CategoryCarousel";
import FeedbackForm from "../components/FeedbackForm";
import video from "../public/img/compressed_0_bee_daisy_1920x1080.webm";
import fialka from "../public/img/fialka.webp";

const Home = () => {
  const navigate = useNavigate();
  const { products, error, loading } = useProducts();
  const [activeTab, setActiveTab] = useState("new");

  const getFilteredProducts = () => {
    if (!products || !Array.isArray(products)) return [];
    let filtered = [];
    if (activeTab === "new") filtered = products.filter((p) => p.is_new);
    else if (activeTab === "popular")
      filtered = products.filter((p) => p.is_popular);
    else if (activeTab === "gifts")
      filtered = products.filter((p) => p.is_gifts);
    // Показываем не более 4 товаров, чтобы сетка всегда была красивой
    return filtered.slice(0, 4);
  };
  const filtered = getFilteredProducts();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Загрузка...
      </div>
    );
  if (error)
    return <div className="text-center text-red-500 py-20">{error}</div>;

  return (
    <div className="bg-stone-50 overflow-hidden">
      {/* Hero-секция (без изменений) */}
      <section>
        <div className="grid grid-cols-2 grid-rows-1 mt-8">
          <div className="mt-28 mb-28 w-full border-t border-b col-start-1 col-end-3 row-start-1"></div>
          <div className="md:mx-12 border-r border-l h-screen pt-36 px-8 col-start-1 col-end-3 row-start-1">
            <div className="flex w-full justify-between">
              <h1 className="leading-none font-plexsans ">BLOOM..IING</h1>
              <h2 className="text-stone-800">CRAFT</h2>
            </div>

            <div className="w-full h-96 bg-gray-100 gap-4">
              <video
                src={video}
                autoPlay
                loop
                poster={fialka}
                muted
                playsInline
                className="w-full h-full object-cover rounded-sm"
              ></video>
            </div>

            <div className="xl:flex justify-between py-4 gap-4">
              <p className="text-justify w-full xl:w-1/3">
                Ваш онлайн‑магазин флористики и декора – всегда под рукой. Мы
                собираем для вас лучшие материалы со всего света. Творите без
                границ.
              </p>
              <div className="w-1/3"></div>

              <button
                className="mt-6 xl:mt-0 p-5 w-full xl:w-1/3 bg-stone-800  text-[#f4d864] hover:bg-[#f4d864] hover:text-stone-800 active:scale-95 transition duration-300 text-lg tracking-wide"
                onClick={() => navigate("/catalog")}
                aria-label="Перейти в каталог"
              >
                Перейти в каталог
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Блок "Почему мы?" (без изменений) */}
      <section className="py-20 md:py-32 bg-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2>Почему мы?</h2>
            <div className="w-12 h-0.5 bg-[#f4d864] mx-auto mt-3"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Карточка 1 */}
            <div className="group relative bg-stone-50 rounded-sm p-8 text-center hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#f4d864]/20 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#f4d864]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#f4d864] transition">
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
              <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#f4d864]/20 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#f4d864]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#f4d864] transition">
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
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#f4d864]/20 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#f4d864]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#f4d864] transition">
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

      {/* Вкладки и карточки – элегантный редизайн */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-44">
          <div className="flex justify-center items-center space-x-1 sm:space-x-2 md:space-x-4 border-b border-stone-200 pb-0 mb-12">
            {[
              { id: "new", label: "Новинки" },
              { id: "popular", label: "Популярное" },
              { id: "gifts", label: "Подарки" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 text-sm md:text-base lg:text-lg font-medium transition-colors duration-300 ${
                  activeTab === tab.id
                    ? "text-stone-800"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#f4d864] rounded-full animate-fade-in" />
                )}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8 justify-items-center">
              {filtered.map((product, idx) => (
                <div
                  key={product.id}
                  className="transform transition-all duration-500 hover:-translate-y-1 w-full max-w-xs"
                >
                  <ProductsCard product={product} index={idx} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-stone-400 italic bg-white/50 rounded-2xl">
              Товаров в этой категории пока нет...
            </div>
          )}
        </div>
      </section>
      {/* Вкладки и карточки – «растянутая» версия */}
      {/* <section className="py-28 md:py-36 lg:py-44 bg-stone-50">
        <div className="max-w-7xl lg:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-3 sm:space-x-6 md:space-x-10 border-b border-stone-200 pb-0 mb-16">
            {[
              { id: "new", label: "Новинки" },
              { id: "popular", label: "Популярное" },
              { id: "gifts", label: "Подарки" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-7 py-4 text-xl md:text-3xl lg:text-4xl font-medium transition-colors duration-300 ${
                  activeTab === tab.id
                    ? "text-stone-800"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#f4d864] rounded-full animate-fade-in" />
                )}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-14 justify-items-center mt-14">
              {filtered.map((product, idx) => (
                <div
                  key={product.id}
                  className="transform transition-all duration-500 hover:-translate-y-2 w-full max-w-md"
                >
                  <ProductsCard product={product} index={idx} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-28 text-stone-400 italic text-2xl bg-white/50 rounded-3xl">
              Товаров в этой категории пока нет...
            </div>
          )}
        </div>
      </section> */}

      <div className="pt-12">
        <FeedbackForm />
      </div>
    </div>
  );
};

export default Home;

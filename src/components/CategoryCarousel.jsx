import { useState, useEffect } from "react";
import api from "../api";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catsRes = await api.get("/categories/");
        const cats = catsRes.data;
        const catsWithProducts = await Promise.all(
          cats.map(async (cat) => {
            const productsRes = await api.get(
              `/products/?category=${cat.slug}`,
            );
            const previewProducts = productsRes.data.slice(0, 2);
            return { ...cat, previewProducts };
          }),
        );
        setCategories(catsWithProducts);
        setLoading(false);
      } catch (err) {
        console.error("Ошибка загрузки карусели", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  if (loading)
    return <div className="text-center py-20 text-stone-400">Загрузка...</div>;
  if (!categories.length)
    return <div className="text-center py-20">Нет категорий</div>;

  const currentCategory = categories[currentIndex];

  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок и стрелки управления */}
        <div className="flex flex-wrap justify-between items-end mb-8 md:mb-12">
          <div>
            <h2
              onClick={() => navigate("/catalog")}
              className="text-3xl md:text-5xl font-light tracking-wide text-stone-800 cursor-pointer hover:text-[#f4d864] transition-colors duration-300 inline-block relative"
            >
              Каталог
              <span className="absolute -bottom-3 left-0 w-12 h-0.5 bg-[#f4d864] rounded-full transition-all duration-300 group-hover:w-full"></span>
            </h2>
            <p className="text-stone-500 mt-4 max-w-md text-sm md:text-base">
              Вдохновляющие категории для вашего творчества
            </p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button
              onClick={handlePrev}
              className="p-2 md:p-3 rounded-full bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-stone-600 hover:text-[#f4d864] focus:outline-none"
              aria-label="Предыдущая категория"
              disabled={isTransitioning}
            >
              <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 md:p-3 rounded-full bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-stone-600 hover:text-[#f4d864] focus:outline-none"
              aria-label="Следующая категория"
              disabled={isTransitioning}
            >
              <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>
        </div>

        {/* ПОЛОСКА ПРОГРЕССА (новая) */}
        <div className="w-full h-0.5 bg-stone-200 mt-2 mb-8 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#f4d864] transition-all duration-500"
            style={{
              width: `${((currentIndex + 1) / categories.length) * 100}%`,
            }}
          />
        </div>

        {/* Основной контент с анимацией при смене */}
        <div className="relative">
          <div
            className={`transition-opacity duration-500 ease-in-out ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Левая часть: большая картинка */}
              <div
                onClick={() => navigate("/catalog")}
                className="lg:w-1/2 cursor-pointer group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500"
              >
                <img
                  src={currentCategory.image}
                  alt={currentCategory.name}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ aspectRatio: "4/3", objectPosition: "50% 70%" }}
                  loading="lazy"
                />
              </div>

              {/* Правая часть: описание и примеры товаров */}
              <div className="lg:w-1/2 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-medium text-stone-800 mb-3">
                    {currentCategory.name}
                  </h3>
                  <p className="text-stone-500 leading-relaxed border-l-2 border-[#f4d864] pl-4 text-sm md:text-base">
                    {currentCategory.description ||
                      "Откройте для себя лучшие материалы для творчества. Качество, вдохновение и забота о каждой детали."}
                  </p>
                </div>

                {/* Сетка двух товаров */}
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {currentCategory.previewProducts.map((product, idx) => (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/catalog/${product.slug}`)}
                      className="group cursor-pointer"
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1">
                        <div className="aspect-square overflow-hidden bg-stone-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-3 text-center border-t border-stone-100">
                          <p className="text-xs md:text-sm font-medium text-stone-700 group-hover:text-[#f4d864] transition-colors truncate">
                            {product.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {currentCategory.previewProducts.length === 1 && (
                    <div className="bg-stone-50 rounded-xl p-4 flex items-center justify-center text-stone-400 italic border border-dashed border-stone-200">
                      <span className="text-sm">Скоро</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;

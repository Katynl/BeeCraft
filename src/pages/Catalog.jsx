import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";
import {
  ShoppingCartIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";

const CATEGORY_ALIASES = {
  lenty: ["ленты", "лента", "атласные ленты", "ribbons"],
  "dried-flowers": ["сухоцветы", "сухоцвет", "сухие цветы", "dried flowers"],
  decor: ["декор", "декоративные материалы", "decor"],
  materials: ["материалы", "расходные материалы", "флористические материалы"],
};

const normalize = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replaceAll("ё", "е");

const getProductCategory = (product) => {
  const category = product.category;

  if (!category) {
    return {
      id: "",
      name: "",
      slug: "",
    };
  }

  if (typeof category === "object") {
    return {
      id: String(category.id || ""),
      name: normalize(category.name),
      slug: normalize(category.slug),
    };
  }

  return {
    id: String(category),
    name: normalize(category),
    slug: normalize(category),
  };
};

const matchesUrlCategory = (product, activeCategory) => {
  if (!activeCategory) return true;

  const wanted = normalize(activeCategory);
  const productCategory = getProductCategory(product);

  const aliases = CATEGORY_ALIASES[wanted]?.map(normalize) || [wanted];

  return (
    productCategory.id === wanted ||
    productCategory.slug === wanted ||
    aliases.includes(productCategory.name) ||
    aliases.includes(productCategory.slug)
  );
};

const formatPrice = (price) => {
  const number = Number(price);

  if (Number.isNaN(number)) {
    return `${price} ₽`;
  }

  return `${number.toLocaleString("ru-RU")} ₽`;
};

const Catalog = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");
  const [tempSelectedCategories, setTempSelectedCategories] = useState([]);

  const [sortType, setSortType] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get("/products/"),
          api.get("/categories/"),
        ]);

        setProducts(productsRes.data || []);
        setCategories(categoriesRes.data || []);
      } catch (err) {
        console.error("Ошибка загрузки каталога", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (filterOpen) {
      setTempMinPrice(minPrice);
      setTempMaxPrice(maxPrice);
      setTempSelectedCategories(selectedCategories);
    }
  }, [filterOpen, minPrice, maxPrice, selectedCategories]);

  const urlFilteredProducts = useMemo(() => {
    return products.filter((product) =>
      matchesUrlCategory(product, activeCategory),
    );
  }, [products, activeCategory]);

  const filteredAndSorted = useMemo(() => {
    let result = [...urlFilteredProducts];

    if (selectedCategories.length > 0) {
      result = result.filter((product) => {
        const productCategory = getProductCategory(product);
        return selectedCategories.includes(Number(productCategory.id));
      });
    }

    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (!Number.isNaN(min)) {
      result = result.filter((product) => Number(product.price) >= min);
    }

    if (!Number.isNaN(max)) {
      result = result.filter((product) => Number(product.price) <= max);
    }

    if (sortType === "price_asc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortType === "price_desc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [urlFilteredProducts, selectedCategories, minPrice, maxPrice, sortType]);

  const isGrouped =
    sortType === "default" &&
    selectedCategories.length === 0 &&
    !activeCategory;

  const activeFiltersCount =
    selectedCategories.length + (minPrice ? 1 : 0) + (maxPrice ? 1 : 0);

  const getActiveCategoryTitle = () => {
    if (!activeCategory) return "Каталог";

    const wanted = normalize(activeCategory);
    const aliases = CATEGORY_ALIASES[wanted]?.map(normalize) || [];

    const matchedCategory = categories.find((category) => {
      const categoryName = normalize(category.name);
      const categorySlug = normalize(category.slug);

      return (
        categorySlug === wanted ||
        aliases.includes(categoryName) ||
        aliases.includes(categorySlug)
      );
    });

    if (matchedCategory?.name) return matchedCategory.name;

    return "Каталог";
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setTempSelectedCategories([]);
    setTempMinPrice("");
    setTempMaxPrice("");
    setSortType("default");
    setFilterOpen(false);
    setSortOpen(false);
  };

  const applyFilters = () => {
    setSelectedCategories(tempSelectedCategories);
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setFilterOpen(false);
  };

  const ProductCard = ({ product }) => (
    <article className="group overflow-hidden transition-all duration-500 hover:-translate-y-1">
      <button
        type="button"
        onClick={() => navigate(`/catalog/${product.slug}`)}
        className="relative block w-full aspect-[3/4] overflow-hidden text-left"
        aria-label={`Открыть товар ${product.name}`}
      >
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent opacity-70" />

        {product.is_new && (
          <span className="absolute left-4 top-4 bg-[#d4aa2a] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-stone-800">
            Новинка
          </span>
        )}
      </button>

      <div className="flex flex-col justify-between">
        <div>
          <div className="my-3 flex items-end justify-between gap-4">
            <h3 className="text-base font-light leading-snug text-stone-800">
              {product.name}
            </h3>

            <span className="shrink-0 text-sm md:text-xl font-light text-stone-800">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="flex w-full items-center justify-center gap-2 bg-stone-800 px-5 py-4 text-sm text-[#d4aa2a] transition duration-300 hover:bg-[#d4aa2a] hover:text-stone-800 active:scale-[0.99]"
        >
          <ShoppingCartIcon className="h-4 w-4" />
          <span>В корзину</span>
        </button>
      </div>
    </article>
  );

  const renderProducts = () => {
    if (filteredAndSorted.length === 0) {
      return (
        <div className="flex min-h-[380px] flex-col items-center justify-center px-6 py-20 text-center">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-10 bg-[#d4aa2a]" />
            <span className="text-xs uppercase tracking-[0.25em] text-stone-400">
              Ничего не найдено
            </span>
            <div className="h-px w-10 bg-[#d4aa2a]" />
          </div>

          <p className="max-w-md text-stone-500">
            По выбранным параметрам пока нет позиций. Попробуйте изменить
            фильтры или посмотреть весь каталог.
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="mt-8 bg-stone-800 px-8 py-4 text-sm uppercase tracking-[0.2em] text-[#d4aa2a] transition hover:bg-[#d4aa2a] hover:text-stone-800"
          >
            Сбросить фильтры
          </button>
        </div>
      );
    }

    if (isGrouped) {
      const grouped = categories
        .map((category) => ({
          ...category,
          products: filteredAndSorted.filter((product) => {
            const productCategory = getProductCategory(product);
            return Number(productCategory.id) === Number(category.id);
          }),
        }))
        .filter((group) => group.products.length > 0);

      return (
        <div className="space-y-20">
          {grouped.map((group, index) => (
            <section key={group.id}>
              <div className="mb-8 flex flex-col gap-4 border-b border-stone-200 pb-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-px w-10 bg-[#d4aa2a]" />
                    <span className="text-xs uppercase tracking-[0.28em] text-stone-400">
                      Раздел 0{index + 1}
                    </span>
                  </div>

                  <h2 className="text-3xl font-light tracking-tight text-stone-800 md:text-4xl">
                    {group.name}
                  </h2>
                </div>

                <p className="text-sm text-stone-400">
                  {group.products.length} позиций
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
                {group.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
        {filteredAndSorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 px-6 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 h-10 w-56 animate-pulse bg-stone-200" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white border border-stone-200 p-4">
                <div className="aspect-[3/4] animate-pulse bg-stone-200" />
                <div className="mt-5 h-5 w-3/4 animate-pulse bg-stone-200" />
                <div className="mt-3 h-4 w-1/2 animate-pulse bg-stone-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-stone-50 text-stone-800 pb-44">
      {/* БАННЕР */}
      <section className="relative border-b border-stone-200 pt-28 md:pt-32">
        <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[#d4aa2a]/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 md:pb-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-stone-800 md:text-7xl lg:text-8xl">
              {getActiveCategoryTitle()}
            </h1>
            <div className="border border-stone-200 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-stone-400">
                    Найдено позиций
                  </p>
                  <p className="mt-1 text-3xl font-light text-stone-800">
                    {filteredAndSorted.length}
                  </p>
                </div>
                <div className="h-px w-full bg-stone-200 sm:h-12 sm:w-px" />
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-stone-400">
                    Категорий
                  </p>
                  <p className="mt-1 text-3xl font-light text-stone-800">
                    {categories.length}
                  </p>
                </div>
                {activeCategory && (
                  <>
                    <div className="h-px w-full bg-stone-200 sm:h-12 sm:w-px" />

                    <button
                      type="button"
                      onClick={() => navigate("/catalog")}
                      className="text-left text-sm text-stone-500 underline decoration-[#d4aa2a] underline-offset-4 transition hover:text-stone-800"
                    >
                      Показать весь каталог
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* КОНТЕНТ */}
      <section className="px-4 py-10 sm:px-6 lg:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          {/* навбар */}
          <div className="mb-10 flex flex-col gap-5 border-b border-stone-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3">
              {categories.slice(0, 6).map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    navigate(
                      `/catalog?category=${category.slug || category.id}`,
                    )
                  }
                  className="border border-stone-200 px-4 py-3 text-xs uppercase tracking-[0.18em] text-stone-500 transition hover:border-[#d4aa2a] hover:text-stone-800"
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              {/* Сортировка */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setSortOpen((prev) => !prev);
                    setFilterOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 border border-stone-200 px-5 py-3 text-sm text-stone-700 transition hover:border-[#d4aa2a] sm:w-auto"
                >
                  <ArrowsUpDownIcon className="h-4 w-4" />
                  Сортировка
                </button>

                {sortOpen && (
                  <div className="absolute right-0 z-30 mt-2 w-[calc(100vw-2rem)] max-w-xs overflow-hidden border bg-white border-stone-200 sm:w-60">
                    {[
                      { id: "default", label: "По умолчанию" },
                      { id: "price_asc", label: "Цена: по возрастанию" },
                      { id: "price_desc", label: "Цена: по убыванию" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSortType(item.id);
                          setSortOpen(false);
                        }}
                        className={`block w-full px-5 py-3 text-left text-sm transition ${
                          sortType === item.id
                            ? "bg-[#d4aa2a]/20 text-stone-800"
                            : "text-stone-600 hover:bg-stone-50"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* FILTER */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setFilterOpen((prev) => !prev);
                    setSortOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 border border-stone-200 px-5 py-3 text-sm text-stone-700 transition hover:border-[#d4aa2a] sm:w-auto"
                >
                  <FunnelIcon className="h-4 w-4" />
                  Фильтр
                  {activeFiltersCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center bg-[#d4aa2a] px-1 text-xs text-stone-800">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {filterOpen && (
                  <div className="absolute right-0 z-30 mt-2 w-[calc(100vw-2rem)] max-w-sm border border-stone-200 bg-white p-5 shadow-[0_18px_60px_rgba(41,37,36,0.12)] sm:w-80">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-stone-400">
                          Подбор
                        </p>

                        <h3 className="mt-1 text-xl font-light text-stone-800">
                          Фильтры
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => setFilterOpen(false)}
                        aria-label="Закрыть фильтры"
                        className="text-stone-400 transition hover:text-stone-800"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mb-5">
                      <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-stone-400">
                        Цена ₽
                      </label>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          placeholder="от"
                          value={tempMinPrice}
                          onChange={(e) => setTempMinPrice(e.target.value)}
                          className="w-full border border-stone-200 bg-stone-50 px-3 py-3 text-sm outline-none transition focus:border-[#d4aa2a] focus:bg-white"
                        />

                        <input
                          type="number"
                          placeholder="до"
                          value={tempMaxPrice}
                          onChange={(e) => setTempMaxPrice(e.target.value)}
                          className="w-full border border-stone-200 bg-stone-50 px-3 py-3 text-sm outline-none transition focus:border-[#d4aa2a] focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="mb-3 block text-xs uppercase tracking-[0.2em] text-stone-400">
                        Категории
                      </label>

                      <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
                        {categories.map((category) => (
                          <label
                            key={category.id}
                            className="flex cursor-pointer items-center justify-between gap-3 border border-stone-100 bg-stone-50 px-3 py-3 transition hover:border-[#d4aa2a]/50"
                          >
                            <span className="text-sm text-stone-700">
                              {category.name}
                            </span>

                            <input
                              type="checkbox"
                              checked={tempSelectedCategories.includes(
                                category.id,
                              )}
                              onChange={() => {
                                setTempSelectedCategories((prev) =>
                                  prev.includes(category.id)
                                    ? prev.filter((id) => id !== category.id)
                                    : [...prev, category.id],
                                );
                              }}
                              className="h-4 w-4 accent-[#d4aa2a]"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={applyFilters}
                        className="bg-stone-800 px-4 py-3 text-sm text-[#d4aa2a] transition hover:bg-[#d4aa2a] hover:text-stone-800"
                      >
                        Применить
                      </button>

                      <button
                        type="button"
                        onClick={() => setFilterOpen(false)}
                        className="border border-stone-200 px-4 py-3 text-sm text-stone-600 transition hover:border-stone-200"
                      >
                        Отмена
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-4 w-full text-center text-xs uppercase tracking-[0.18em] text-stone-400 transition hover:text-stone-800"
                    >
                      Сбросить все
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Активные фильтры */}
          {(activeFiltersCount > 0 || sortType !== "default") && (
            <div className="mb-10 flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-[0.22em] text-stone-400">
                Активно:
              </span>

              {sortType !== "default" && (
                <span className="bg-white border border-stone-200 px-3 py-2 text-xs text-stone-500">
                  {sortType === "price_asc"
                    ? "Цена по возрастанию"
                    : "Цена по убыванию"}
                </span>
              )}

              {minPrice && (
                <span className="bg-white border border-stone-200 px-3 py-2 text-xs text-stone-500">
                  от {minPrice} ₽
                </span>
              )}

              {maxPrice && (
                <span className="bg-white border border-stone-200 px-3 py-2 text-xs text-stone-500">
                  до {maxPrice} ₽
                </span>
              )}

              {selectedCategories.length > 0 && (
                <span className="bg-white border border-stone-200 px-3 py-2 text-xs text-stone-500">
                  категорий: {selectedCategories.length}
                </span>
              )}

              <button
                type="button"
                onClick={resetFilters}
                className="text-xs uppercase tracking-[0.18em] text-[#b89422] transition hover:text-stone-800"
              >
                Сбросить
              </button>
            </div>
          )}
          {renderProducts()}
        </div>
      </section>
    </main>
  );
};

export default Catalog;

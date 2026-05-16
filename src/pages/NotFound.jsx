// src/pages/NotFound.jsx

import React from "react";
import { Link } from "react-router-dom";

const Honeycomb = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 260 220"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {[
        [50, 40],
        [100, 40],
        [150, 40],
        [75, 82],
        [125, 82],
        [175, 82],
        [50, 124],
        [100, 124],
        [150, 124],
      ].map(([x, y], index) => (
        <path
          key={index}
          d={`M${x} ${y} L${x + 22} ${y + 12} L${x + 22} ${
            y + 38
          } L${x} ${y + 50} L${x - 22} ${y + 38} L${x - 22} ${y + 12} Z`}
          stroke="currentColor"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
};

const NotFound = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-stone-50 text-stone-800">
      {/* glow */}
      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-[#d4aa2a]/25 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-stone-800/5 blur-3xl pointer-events-none" />

      {/* honeycomb decor */}
      <Honeycomb className="absolute -right-10 top-24 w-72 text-[#d4aa2a]/20 md:w-96 pointer-events-none" />
      <Honeycomb className="absolute left-6 bottom-10 w-40 text-stone-800/[0.05] md:w-56 pointer-events-none" />

      {/* grain */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_0.7px,transparent_0.7px)] [background-size:12px_12px] pointer-events-none" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* bee badge */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-sm border border-stone-200 bg-white shadow-[0_18px_50px_rgba(41,37,36,0.06)]">
            <span className="text-4xl" aria-hidden="true">
              🐝
            </span>
          </div>

          <div className="mb-7 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[#d4aa2a]" />
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Страница не найдена
            </p>
            <div className="h-px w-12 bg-[#d4aa2a]" />
          </div>

          <h1 className="text-[110px] font-black leading-none tracking-[-0.08em] text-stone-800 sm:text-[150px] md:text-[190px]">
            404
          </h1>

          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-stone-800 sm:text-4xl md:text-5xl">
            Эта страница улетела за мёдом
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base font-medium leading-relaxed text-stone-600 md:text-lg">
            Возможно, ссылка устарела или такой страницы больше нет. Но в
            каталоге Bee Craft точно найдутся цветы, ленты, корзины и красивые
            детали для ваших идей.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center rounded-sm bg-stone-800 px-8 py-4 text-xs font-medium uppercase tracking-[0.22em] text-[#d4aa2a] transition duration-300 hover:bg-[#d4aa2a] hover:text-stone-800"
            >
              В каталог
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-sm border border-stone-300 bg-white px-8 py-4 text-xs font-medium uppercase tracking-[0.22em] text-stone-700 transition duration-300 hover:border-[#d4aa2a] hover:bg-[#d4aa2a]/10"
            >
              На главную
            </Link>
          </div>

          <p className="mt-10 text-xs font-medium uppercase tracking-[0.25em] text-stone-400">
            Bee Craft · материалы, собранные с заботой
          </p>
        </div>
      </section>
    </main>
  );
};

export default NotFound;

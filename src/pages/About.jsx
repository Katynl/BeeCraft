import React, { useState } from "react";

const Honeycomb = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 220 160"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {[
        [30, 35],
        [72, 35],
        [114, 35],
        [156, 35],
        [51, 72],
        [93, 72],
        [135, 72],
        [177, 72],
        [30, 109],
        [72, 109],
        [114, 109],
        [156, 109],
      ].map(([x, y], index) => (
        <path
          key={index}
          d={`M${x} ${y - 18}L${x + 16} ${y - 9}V${y + 9}L${x} ${
            y + 18
          }L${x - 16} ${y + 9}V${y - 9}L${x} ${y - 18}Z`}
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
};

const stores = [
  {
    title: "Первый магазин",
    address: "Владивосток, ул. Светланская 15",
    note: "Основная точка выдачи заказов и консультаций.",
  },
  {
    title: "Второй магазин",
    address: "Владивосток, ул. Уткинская, 38",
    note: "Новое пространство в центре города.",
  },
];

const storySlides = [
  {
    id: "01",
    label: "начало",
    title: "Все начаось с мысли:",
    image:
      "https://res.cloudinary.com/drkgovcn7/image/upload/v1778698538/white-flowers-close-with-blue-background_vojyct.jpg",
    text: `«А что, если мы попробуем сами?»
Мы сидели на кухне после очередного совместного букета, перебирали ленты и крафт, и кто-то неуверенно сказал: «Слушайте, а может, откроем свой магазин? Ну, чтобы не лазить по всему городу, а взять то, что нам самим нравится».`,
  },
  {
    id: "02",
    label: "Первые успехи",
    title: "Успехи",
    image:
      "https://res.cloudinary.com/drkgovcn7/image/upload/v1778697429/front-view-woman-making-flowers-arrangement_dckuj8.jpg",
    text: `пришли не сразу и без фанфар. Просто однажды к нам пришла девушка, которая делала букет для своей лучшей подруги и сказала: «Я искала такую ленту везде, а нашла только у вас. Спасибо, что вы есть». В этот момент мы поняли, что движемся в правильном направлении.`,
  },
  {
    id: "03",
    label: "Бренд",
    title: "Мы долго сомневались",
    image:
      "https://res.cloudinary.com/drkgovcn7/image/upload/v1778698570/macro-shot-bee-with-full-pollen-basket-collecting-pollen-nectar-from-yellow-flower_a9d1i4.jpg",
    text: `ошибались и спорили на кухне. Боялись, что ничего не выйдет. Но однажды просто взяли и сделали – открыли сайт, выложили первые позиции, набрались смелости.
И когда пришёл первый заказ от незнакомого человека, мы поняли: это оно. То самое дело, ради которого стоит вставать по утрам.
Так, без громких планов, из любви к цветам, честности и желания помогать творить, и родился наш Bee Craft.`,
  },
];

const team = [
  {
    role: "Флористы-консультанты",
    text: "Помогают подобрать материалы по цвету, фактуре и задаче: букет, декор, витрина или подарок.",
  },
  {
    role: "Команда сборки",
    text: "Проверяет позиции, аккуратно упаковывает заказы и следит, чтобы материалы приезжали в хорошем состоянии.",
  },
  {
    role: "Кураторы ассортимента",
    text: "Отбирают ленты, сухоцветы и декоративные детали так, чтобы они сочетались между собой и не выглядели случайно.",
  },
];

const principles = [
  "Работам аккуратно и в указанные сроки",
  "К каждому цветочку, букетику относимся трепетно",
  "Предлагаем только качественные товары по добросовестной цене",
];

const About = () => {
  const [activeStory, setActiveStory] = useState(0);
  const currentStory = storySlides[activeStory];
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 overflow-hidden">
      {/* БАННЕР */}
      <section>
        <div className="grid grid-cols-2 grid-rows-1 md:mt-16">
          <div className="mt-24 w-full border-t border-stone-200 col-start-1 col-end-3 row-start-1 h-[760px] md:h-[700px] lg:h-[660px]" />

          <div className="relative md:mx-12 border-l border-stone-200 col-start-1 col-end-3 row-start-1 px-4 sm:px-8 pt-32">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-[#d4aa2a]" />
                <span className="text-xs uppercase tracking-[0.3em] text-stone-400">
                  О бренде
                </span>
              </div>

              <div className="flex w-full justify-between items-center gap-4">
                <h1 className="leading-none font-black text-2xl sm:text-4xl md:text-5xl lg:text-7xl tracking-[-0.04em]">
                  МЫ
                </h1>

                <h2 className="leading-none text-stone-800 font-black text-2xl sm:text-4xl md:text-5xl lg:text-7xl tracking-[-0.04em]">
                  И НАША ИСТОРИЯ
                </h2>
              </div>

              <div className="mt-8 grid lg:grid-cols-[0.92fr_1.08fr] gap-6 lg:gap-10 items-stretch">
                {/* TEXT */}
                <div className="text-stone-800 rounded-sm p-0 sm:p-0 lg:p-0 flex flex-col justify-between min-h-[440px]">
                  <div className="grid grid-rows-[1fr_auto] gap-6 h-full">
                    {/* IMAGE ABOVE TEXT */}
                    <div className="relative h-80 overflow-hidden rounded-sm bg-stone-200 group">
                      <img
                        src="https://res.cloudinary.com/drkgovcn7/image/upload/v1778697429/front-view-woman-making-flowers-arrangement_dckuj8.jpg"
                        alt="Флористическая атмосфера Bloom..ing Craft"
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="text-stone-700 leading-relaxed text-left italic">
                      Мы — Bee Craft. Изначально мы были просто кучкой
                      любителей-флористов, которые обожали цветы, но жутко
                      бесились от того, что нормальные материалы приходится
                      выискивать по всему городу (или заказывать вслепую). И
                      тогда мы подумали: «А почему бы не собрать самим то, что
                      действительно круто работает?»
                    </p>
                  </div>
                </div>

                {/* IMAGE COLLAGE */}
                <div className="hidden md:grid grid-cols-5 grid-rows-5 gap-3 h-[440px] lg:h-[440px]">
                  <div className="col-span-3 row-span-5 relative overflow-hidden rounded-sm group">
                    <img
                      src="https://res.cloudinary.com/drkgovcn7/image/upload/v1778649589/samples/imagecon-group.jpg "
                      alt="Флористическая атмосфера Bloom..ing Craft"
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="col-span-2 row-span-2 overflow-hidden rounded-sm group bg-stone-200">
                    <img
                      src="https://res.cloudinary.com/drkgovcn7/image/upload/v1778649593/samples/two-ladies.jpg"
                      alt="Ленты Bloom..ing Craft"
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.05]"
                    />
                  </div>

                  <div className="col-span-1 row-span-3 overflow-hidden rounded-sm group bg-stone-800">
                    <img
                      src="https://res.cloudinary.com/drkgovcn7/image/upload/v1778649599/samples/man-portrait.jpg"
                      alt="Цветочная деталь"
                      className="w-full h-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.06]"
                    />
                  </div>

                  <div className="col-span-1 row-span-3 bg-[#d4aa2a] rounded-sm p-4 flex items-end">
                    <p className="text-stone-800 text-left text-xs uppercase tracking-[0.22em] leading-relaxed">
                      запах
                      <br />
                      эмоции
                      <br />
                      эстетика
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY SLIDER */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-stone-50">
        {/* honey glow */}
        <div className="absolute -right-24 top-12 w-80 h-80 bg-[#f4d864]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-24 bottom-0 w-80 h-80 bg-stone-900/5 rounded-full blur-3xl pointer-events-none" />

        {/* honeycomb decor */}
        <Honeycomb className="absolute right-[-40px] top-20 w-64 md:w-96 text-[#d4aa2a]/15 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="mb-14 md:mb-20 max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#d4aa2a]" />
              <span className="uppercase tracking-[0.28em] text-xs text-stone-500">
                История
              </span>
            </div>
          </div>

          {/* MAIN */}
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-center">
            {/* IMAGE */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -bottom-4 -right-4 hidden md:block w-full h-full border border-[#d4aa2a]/35" />

              <div className="relative overflow-hidden bg-stone-200">
                <img
                  key={currentStory.image}
                  src={currentStory.image}
                  alt={currentStory.title}
                  className="w-full h-[420px] md:h-[560px] object-cover transition duration-700 hover:scale-[1.02]"
                />

                <div className="absolute left-5 top-5 bg-white/85 backdrop-blur-sm px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-stone-700">
                  {currentStory.label}
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div className="order-1 lg:order-2">
              <div className="max-w-xl">
                <p className="text-[#b89422] text-xs uppercase tracking-[0.3em] mb-5">
                  {currentStory.accent}
                </p>

                <h3
                  key={currentStory.title}
                  className="text-3xl sm:text-4xl md:text-5xl font-light leading-[1.05] tracking-[-0.04em] text-stone-900 animate-fade-in"
                >
                  {currentStory.title}
                </h3>

                <p
                  key={currentStory.text}
                  className="mt-7 text-stone-600 leading-relaxed text-base md:text-lg animate-fade-in"
                >
                  {currentStory.text}
                </p>

                {/* TABS */}
                <div className="mt-12">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {storySlides.map((slide, index) => {
                      const isActive = activeStory === index;

                      return (
                        <button
                          key={slide.id}
                          type="button"
                          onClick={() => setActiveStory(index)}
                          className={`group flex items-center justify-between gap-4 border px-5 py-4 text-left transition duration-300 ${
                            isActive
                              ? "border-stone-900 bg-stone-900 text-white"
                              : "border-stone-200 bg-white/80 text-stone-500 hover:border-[#d4aa2a] hover:bg-white"
                          }`}
                        >
                          <span className="flex items-center gap-4">
                            <span
                              className={`text-lg font-light ${
                                isActive ? "text-[#f4d864]" : "text-stone-400"
                              }`}
                            >
                              {slide.id}
                            </span>

                            <span className="text-xs uppercase tracking-[0.22em]">
                              {slide.label}
                            </span>
                          </span>

                          <span
                            className={`h-px w-8 transition ${
                              isActive ? "bg-[#f4d864]" : "bg-stone-300"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* PROGRESS */}
                  <div className="mt-6 h-px bg-stone-200 overflow-hidden">
                    <div
                      className="h-full bg-[#d4aa2a] transition-all duration-500"
                      style={{
                        width: `${((activeStory + 1) / storySlides.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="py-20 md:py-28 bg-[#d4aa2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.25fr] gap-8 lg:gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-px bg-stone-800" />
                <span className="uppercase tracking-[0.25em] text-xs text-stone-800">
                  Материалы
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black leading-[0.95] tracking-[-0.04em]">
                Откуда мы берём
                <br />
                ассортимент
              </h2>

              <p className="mt-7 text-stone-800 leading-relaxed max-w-lg">
                Мы работаем с поставщиками флористических и декоративных
                материалов, отбирая позиции по цвету, фактуре, стабильности
                качества и тому, как материал выглядит в реальной работе.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-3 md:space-y-4">
                <img
                  src="https://res.cloudinary.com/drkgovcn7/image/upload/v1778939560/roza_qwhl3q.webp"
                  alt="Цветочные материалы"
                  className="w-full h-48 md:h-72 object-cover rounded-sm border border-stone-800/15 hover:scale-[1.02] transition duration-500"
                />

                <div className="bg-stone-800 text-white rounded-sm p-5">
                  <p className="text-[#d4aa2a] text-xs uppercase tracking-[0.25em] mb-3">
                    проверяем
                  </p>
                  <p className="text-stone-300 leading-relaxed">
                    Цвет, плотность, фактуру и визуальную совместимость.
                  </p>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4 pt-10">
                <div className="bg-white rounded-sm p-5 border border-stone-800/15">
                  <p className="text-xs uppercase tracking-[0.25em] text-stone-500 mb-3">
                    выбираем
                  </p>
                  <p className="text-stone-700 leading-relaxed">
                    Не случайные позиции, а материалы, которые помогают
                    композиции выглядеть цельно.
                  </p>
                </div>

                <img
                  src="https://res.cloudinary.com/drkgovcn7/image/upload/v1778939558/pion_m1n72y.webp"
                  alt="Флористическая эстетика"
                  className="w-full h-48 md:h-72 object-cover rounded-sm border border-stone-800/15 hover:scale-[1.02] transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 md:py-28 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-px bg-[#d4aa2a]" />
                <span className="uppercase tracking-[0.25em] text-xs text-stone-500">
                  Команда
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black leading-[0.95] tracking-[-0.04em]">
                Люди, которые
                <br />
                держат ритм
              </h2>

              <p className="mt-7 text-stone-600 leading-relaxed max-w-md">
                За магазином стоит небольшая команда, которая каждый день
                работает с заказами, материалами, консультациями и визуальной
                подачей.
              </p>
            </div>

            <div className="lg:col-span-7 grid md:grid-cols-3 gap-4">
              {team.map((item, index) => (
                <article
                  key={item.role}
                  className={`bg-white border border-stone-200 rounded-sm p-6 hover:border-[#d4aa2a] hover:-translate-y-1 hover:shadow-xl transition duration-300 ${
                    index === 1 ? "md:mt-10" : ""
                  }`}
                >
                  <div className="w-10 h-10 bg-stone-800 text-[#d4aa2a] rounded-sm flex items-center justify-center text-sm font-black mb-8">
                    0{index + 1}
                  </div>

                  <h3 className="text-xl font-black text-stone-800 leading-tight mb-4">
                    {item.role}
                  </h3>

                  <p className="text-stone-600 leading-relaxed text-sm">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOGO / BEE */}
      <section className="py-20 md:py-28 bg-stone-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center">
            <div className="relative">
              <div className="text-[140px] sm:text-[190px] md:text-[240px] font-black leading-none text-[#d4aa2a] tracking-[-0.08em]">
                BEE
              </div>

              <div className="absolute bottom-4 left-4 bg-stone-800 border border-[#d4aa2a] rounded-sm px-5 py-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[#d4aa2a]">
                  знак бренда
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-px bg-[#d4aa2a]" />
                <span className="uppercase tracking-[0.25em] text-xs text-[#d4aa2a]">
                  Наш маскот
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black leading-[0.95] tracking-[-0.04em]">
                почему наш символ именно пчела?
              </h2>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="border border-stone-700 rounded-sm p-5 hover:border-[#d4aa2a] transition duration-300">
                  <p className="text-[#d4aa2a] uppercase tracking-[0.2em] text-xs mb-3">
                    труд
                  </p>
                  <p className="text-stone-300 leading-relaxed">
                    Пчёл издавна считают трудягами. Так же и мы трудимся ради
                    ваших впечатлений.
                  </p>
                </div>

                <div className="border border-stone-700 rounded-sm p-5 hover:border-[#d4aa2a] transition duration-300">
                  <p className="text-[#d4aa2a] uppercase tracking-[0.2em] text-xs mb-3">
                    связь
                  </p>
                  <p className="text-stone-300 leading-relaxed">
                    Бренд вырос вокруг флористики, поэтому пчела стала
                    естественным символом ремесла и живой природы.
                  </p>
                </div>

                <div className="sm:col-span-2 bg-[#d4aa2a] text-stone-800 rounded-sm p-5">
                  <p className="leading-relaxed">
                    Чёрный и жёлтый — наша визуальная палитра и след в цифровом
                    мире.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* LOCATIONS + POLICY */}
      <section className="py-20 md:py-28 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* STORES */}
            <div className="bg-white border border-stone-200 rounded-sm p-6 md:p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-px bg-[#d4aa2a]" />
                <span className="uppercase tracking-[0.25em] text-xs text-stone-500">
                  Магазины
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black leading-tight mb-8">
                Где нас найти
              </h2>

              <div className="space-y-4">
                {stores.map((store) => (
                  <div
                    key={store.title}
                    className="border border-stone-200 rounded-sm p-5 hover:border-[#d4aa2a] hover:bg-stone-50 transition duration-300"
                  >
                    <p className="text-sm uppercase tracking-[0.22em] text-stone-400 mb-2">
                      {store.title}
                    </p>

                    <p className="text-xl font-black text-stone-800">
                      {store.address}
                    </p>

                    <p className="mt-3 text-stone-500 leading-relaxed">
                      {store.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* POLICY */}
            <div className="grid gap-4">
              <div className="bg-stone-800 text-white rounded-sm p-6 md:p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-px bg-[#d4aa2a]" />
                  <span className="uppercase tracking-[0.25em] text-xs text-[#d4aa2a]">
                    Политика работы
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-black leading-tight">
                  спокойно
                  <br />
                  не спеша
                  <br />
                  не жужжа
                </h2>
              </div>

              <div className="grid gap-3">
                {principles.map((item, index) => (
                  <div
                    key={item}
                    className="bg-white border border-stone-200 rounded-sm p-5 flex gap-4 hover:border-[#d4aa2a] hover:shadow-lg transition duration-300"
                  >
                    <div className="shrink-0 w-9 h-9 bg-[#d4aa2a] text-stone-800 rounded-sm flex items-center justify-center text-sm font-black">
                      {index + 1}
                    </div>

                    <p className="text-stone-600 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL ARCHIVE */}
      <section className="py-20 md:py-28 bg-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-px bg-[#d4aa2a]" />
                <span className="uppercase tracking-[0.25em] text-xs text-[#d4aa2a]">
                  Визуальный архив
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
            <img
              src="https://res.cloudinary.com/drkgovcn7/image/upload/v1778939506/fialka_bqtjwc.webp"
              alt="fialka"
              className="col-span-2 md:col-span-2 h-72 md:h-96 object-cover w-full rounded-sm hover:scale-[1.01] transition duration-500"
            />

            <div className="col-span-2 md:col-span-2 grid gap-3 md:gap-4">
              <img
                src="https://res.cloudinary.com/drkgovcn7/image/upload/v1778939506/fialka_bqtjwc.webp"
                alt="fialka"
                className="h-44 object-cover w-full rounded-sm hover:scale-[1.01] transition duration-500"
              />

              <div className="bg-[#d4aa2a] rounded-sm p-6 min-h-44 flex items-end">
                <p className="text-stone-800 text-left text-2xl md:text-3xl font-black leading-tight">
                  тише меньше,
                  <br />
                  дальше больше
                </p>
              </div>
            </div>

            <img
              src="https://res.cloudinary.com/drkgovcn7/image/upload/v1778939506/fialka_bqtjwc.webp"
              alt="fialka"
              className="col-span-2 md:col-span-2 h-72 md:h-96 object-cover w-full rounded-sm hover:scale-[1.01] transition duration-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

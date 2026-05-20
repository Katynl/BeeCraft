// ... вверху убираем: const [videoVisible, setVideoVisible] = useState(false);
// ... убираем useEffect с observer
// ... в JSX заменяем блок видео на:

<div className="relative hidden md:block">
  <div
    className="absolute -bottom-5 -right-5 hidden h-full w-full border border-[#d4aa2a]/40 md:block"
    aria-hidden="true"
  />
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
    className="relative z-10 h-[400px] w-full rounded-sm object-cover shadow-2xl"
    aria-hidden="true"
    tabIndex={-1}
  />
</div>;

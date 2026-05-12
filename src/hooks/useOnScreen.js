import { useEffect, useRef, useState } from "react";

//  Анимация появляется только когда пользователь пролистывает до объкта
function useOnScreen(options = { threshold: 0.05 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current; // сохраняем текущий элемент

    if (!element) return; // если элемента нет, выходим

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return [ref, isVisible];
}

export default useOnScreen;

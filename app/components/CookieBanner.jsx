"use client";

import { useEffect, useState } from "react";

const storageKey = "cable-cookie-consent";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      setIsVisible(!localStorage.getItem(storageKey));
    } catch (error) {
      setIsVisible(true);
    }
  }, []);

  function saveChoice(value) {
    try {
      localStorage.setItem(storageKey, value);
    } catch (error) {
      // Consent can still be dismissed when storage is unavailable.
    }

    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <section className="cookie-banner" aria-label="Уведомление об использовании cookie">
      <div className="cookie-banner-copy">
        <strong>Мы используем cookie</strong>
        <p>
          Обязательные cookie нужны для корректной работы сайта. Дополнительные cookie и сервисы аналитики, включая
          Яндекс.Метрику, помогают нам улучшать сайт для посетителей. Вы можете принять все cookie или оставить только
          обязательные. Также можно отказаться от дополнительных cookie. Подробнее - в{" "}
          <a href="/politika">политике обработки персональных данных</a>.
        </p>
      </div>

      <div className="cookie-banner-actions">
        <button className="primary-button compact" type="button" onClick={() => saveChoice("all")}>
          Принять все
        </button>
        <button className="cookie-secondary-button" type="button" onClick={() => saveChoice("necessary")}>
          Только обязательные
        </button>
        <button className="cookie-secondary-button" type="button" onClick={() => saveChoice("declined")}>
          Отказаться
        </button>
      </div>
    </section>
  );
}

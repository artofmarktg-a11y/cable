"use client";

import { useEffect, useState } from "react";
import LeadModal from "../components/LeadModal";
import { catalogProducts } from "./catalog-data";

const navItems = [
  { href: "/catalog?type=power", label: "Силовые" },
  { href: "/catalog?type=connect", label: "Соединительные" },
  { href: "/catalog?type=low-current", label: "Слаботочные" },
  { href: "/#contacts", label: "Контакты" },
];

const catalogTypes = ["Все кабели", ...Array.from(new Set(catalogProducts.map((product) => product.category)))];

const catalogTypeBySlug = {
  power: "Силовые кабели",
  connect: "Соединительные кабели",
  "low-current": "Слаботочные кабели",
};

function formatPhoneNumber(value) {
  const digits = value.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
  const normalized = digits.startsWith("7") ? digits : `7${digits}`;
  const body = normalized.slice(1);
  const area = body.slice(0, 3);
  const first = body.slice(3, 6);
  const second = body.slice(6, 8);
  const third = body.slice(8, 10);
  let result = "+7";

  if (area) {
    result += ` (${area}`;
  }

  if (area.length === 3) {
    result += ")";
  }

  if (first) {
    result += ` ${first}`;
  }

  if (second) {
    result += `-${second}`;
  }

  if (third) {
    result += `-${third}`;
  }

  return result;
}

function buildFallbackMailto(formData) {
  const title = formData.get("title") || "Заказ из каталога";
  const body = [
    `Имя: ${formData.get("name") || ""}`,
    `Телефон: ${formData.get("phone") || ""}`,
    `Источник: ${formData.get("source") || ""}`,
    `Детали: ${formData.get("details") || ""}`,
  ].join("\n");

  return `mailto:komarov.pv@metallobazav.ru?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
}

function CatalogHeader() {
  return (
    <header className="site-header catalog-site-header">
      <a className="logo-link" href="../#top" aria-label="Металлобаза Волхонка">
        <img src="../assets/logo-metallobaza-volhonka.svg" alt="Металлобаза Волхонка" />
      </a>

      <input className="menu-toggle" id="catalog-menu-toggle" type="checkbox" aria-label="Открыть меню" />
      <label className="menu-button" htmlFor="catalog-menu-toggle" aria-hidden="true">
        <span />
      </label>

      <nav className="main-nav" aria-label="Основная навигация">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <a className="contact-pill" href="mailto:komarov.pv@metallobazav.ru">
          komarov.pv@metallobazav.ru
        </a>
        <a className="contact-pill" href="tel:+79218887782">
          +7 (921) 888 77 82
        </a>
      </div>
    </header>
  );
}

function RequestIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M9 4h11l5 5v19H9z" />
      <path d="M20 4v6h5" />
      <path d="M13 15h8" />
      <path d="M13 20h6" />
      <circle cx="23" cy="23" r="4" />
      <path d="m26 26 3 3" />
    </svg>
  );
}

function ProductModal({
  product,
  selectedCore,
  selectedSection,
  selectedMeters,
  onCoreChange,
  onSectionChange,
  onMetersChange,
  onClose,
}) {
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setIsOrderOpen(false);
    setIsSending(false);
    setStatus("");
  }, [product?.id]);

  if (!product) {
    return null;
  }

  const orderDetails = [
    `Товар: ${product.title}`,
    `Категория: ${product.category}`,
    `Описание: ${product.shortDescription}`,
    `Количество жил: ${selectedCore || "не выбрано"}`,
    `Сечение: ${selectedSection ? `${selectedSection} мм²` : "не выбрано"}`,
    `Метраж: ${selectedMeters || "не указан"}`,
  ].join("\n");

  async function handleOrderSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("title", "Оформить заказ");
    formData.set("source", "Попап карточки товара");
    formData.set("details", orderDetails);

    setIsSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        body: formData,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        window.location.href = result.mailto || buildFallbackMailto(formData);
        setStatus("Откроем почтовый клиент для отправки заказа.");
        return;
      }

      setStatus("Заказ отправлен. Менеджер свяжется с вами.");
      form.reset();
    } catch (error) {
      window.location.href = buildFallbackMailto(formData);
      setStatus("Откроем почтовый клиент для отправки заказа.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="product-modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="product-modal-close" type="button" aria-label="Закрыть" onClick={onClose}>
          ×
        </button>

        <div className="product-modal-image">
          <img src={product.photo} alt={product.title} />
        </div>

        <div className="product-modal-content">
          <span>{product.category}</span>
          <h2 id="product-modal-title">{product.title}</h2>
          <p className="product-modal-subtitle">{product.shortDescription}</p>

          <div className="product-options">
            {product.cores.length > 0 && (
              <fieldset>
                <legend>Количество жил</legend>
                <div className="core-options">
                  {product.cores.map((core) => (
                    <button
                      className={core === selectedCore ? "active" : ""}
                      type="button"
                      key={core}
                      onClick={() => onCoreChange(core)}
                    >
                      {core}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {product.sections.length > 0 && (
              <label className="section-select">
                <span>Сечение</span>
                <select value={selectedSection} onChange={(event) => onSectionChange(event.target.value)}>
                  {product.sections.map((section) => (
                    <option value={section} key={section}>
                      {section} мм²
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label className="meter-input">
              <span>Необходимое количество метров</span>
              <input
                type="text"
                inputMode="numeric"
                value={selectedMeters}
                maxLength="5"
                placeholder="1000"
                onChange={(event) => {
                  onMetersChange(event.currentTarget.value.replace(/\D/g, "").slice(0, 5));
                }}
              />
            </label>
          </div>

          <div className="product-description">
            {product.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {isOrderOpen ? (
            <form className="product-order-form" onSubmit={handleOrderSubmit}>
              <h3>Оформить заказ</h3>
              <p>{product.title}</p>

              <input type="hidden" name="title" value="Оформить заказ" readOnly />
              <input type="hidden" name="source" value="Попап карточки товара" readOnly />
              <input type="hidden" name="details" value={orderDetails} readOnly />

              <label>
                <span>Имя</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>

              <label>
                <span>Телефон</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+7 (___) ___-__-__"
                  onInput={(event) => {
                    event.currentTarget.value = formatPhoneNumber(event.currentTarget.value);
                  }}
                  required
                />
              </label>

              <button className="primary-button product-consult-button" type="submit" disabled={isSending}>
                {isSending ? "Отправляем..." : "Отправить заказ"}
              </button>

              {status && <p className="form-status">{status}</p>}
            </form>
          ) : (
            <button
              className="primary-button product-consult-button"
              type="button"
              onClick={() => setIsOrderOpen(true)}
            >
              Оформить заказ
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default function CatalogPage() {
  const [activeProduct, setActiveProduct] = useState(null);
  const [selectedCore, setSelectedCore] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedMeters, setSelectedMeters] = useState("");
  const [activeType, setActiveType] = useState(catalogTypes[0]);
  const [leadModal, setLeadModal] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedType = params.get("type");
    const nextType = catalogTypeBySlug[requestedType] || catalogTypes.find((type) => type === requestedType);

    if (nextType) {
      setActiveType(nextType);
    }
  }, []);

  useEffect(() => {
    if (!activeProduct && !leadModal) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [activeProduct, leadModal]);

  const filteredProducts =
    activeType === catalogTypes[0] ? catalogProducts : catalogProducts.filter((product) => product.category === activeType);

  function openProduct(product) {
    setActiveProduct(product);
    setSelectedCore(product.cores[0] || "");
    setSelectedSection(product.sections[0] || "");
    setSelectedMeters("");
  }

  function closeProduct() {
    setActiveProduct(null);
  }

  return (
    <main className="site-page catalog-page">
      <CatalogHeader />

      <section className="catalog-page-section" aria-labelledby="catalog-page-title">
        <div className="section-shell">
          <div className="catalog-page-heading">
            <div className="section-heading">
              <h1 id="catalog-page-title">Ассортимент кабельной продукции</h1>
            </div>
          </div>

          <div className="catalog-type-filter" aria-label="Фильтр по типу кабеля">
            {catalogTypes.map((type) => (
              <button
                className={type === activeType ? "active" : ""}
                type="button"
                key={type}
                onClick={() => setActiveType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="catalog-products-grid">
            {filteredProducts.map((product) => (
              <button className="product-card" type="button" key={product.id} onClick={() => openProduct(product)}>
                <span>{product.category}</span>
                <img src={product.photo} alt={product.title} />
                <strong>{product.title}</strong>
                <em>{product.shortDescription}</em>
                <small>Подробнее</small>
              </button>
            ))}
          </div>

          <div className="catalog-cta" id="request">
            <RequestIcon />
            <div>
              <h3>Не нашли нужный кабель?</h3>
              <p>
                Если вы не нашли нужный кабель на сайте - отправьте заявку и мы подберем нужную позицию по вашим параметрам.
              </p>
              <p>
                Мы поставляем как популярные, так и позиции по индивидуальным запросам клиентов. Поможем подобрать нужное сечение, конструкцию и исполнение под ваши конкретные технические требования.
              </p>
            </div>
            <button
              className="primary-button compact"
              type="button"
              onClick={() =>
                setLeadModal({
                  title: "Нет нужного кабеля",
                  source: "Страница каталога",
                  details: `Активный фильтр: ${activeType}`,
                })
              }
            >
              Нет нужного кабеля
            </button>
          </div>
        </div>
      </section>

      <ProductModal
        product={activeProduct}
        selectedCore={selectedCore}
        selectedSection={selectedSection}
        selectedMeters={selectedMeters}
        onCoreChange={setSelectedCore}
        onSectionChange={setSelectedSection}
        onMetersChange={setSelectedMeters}
        onClose={closeProduct}
      />
      <LeadModal lead={leadModal} onClose={() => setLeadModal(null)} />
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
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

function ProductModal({ product, selectedCore, selectedSection, onCoreChange, onSectionChange, onClose }) {
  if (!product) {
    return null;
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
              <input type="number" inputMode="numeric" min="1" max="99999" maxLength="5" placeholder="1000" />
            </label>
          </div>

          <div className="product-description">
            {product.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <a className="primary-button product-consult-button" href="mailto:komarov.pv@metallobazav.ru">
            Оформить заказ
          </a>
        </div>
      </section>
    </div>
  );
}

export default function CatalogPage() {
  const [activeProduct, setActiveProduct] = useState(null);
  const [selectedCore, setSelectedCore] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [activeType, setActiveType] = useState(catalogTypes[0]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedType = params.get("type");
    const nextType = catalogTypeBySlug[requestedType] || catalogTypes.find((type) => type === requestedType);

    if (nextType) {
      setActiveType(nextType);
    }
  }, []);

  const filteredProducts =
    activeType === catalogTypes[0] ? catalogProducts : catalogProducts.filter((product) => product.category === activeType);

  function openProduct(product) {
    setActiveProduct(product);
    setSelectedCore(product.cores[0] || "");
    setSelectedSection(product.sections[0] || "");
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
            <a className="primary-button compact" href="mailto:komarov.pv@metallobazav.ru">
              Нет нужного кабеля
            </a>
          </div>
        </div>
      </section>

      <ProductModal
        product={activeProduct}
        selectedCore={selectedCore}
        selectedSection={selectedSection}
        onCoreChange={setSelectedCore}
        onSectionChange={setSelectedSection}
        onClose={closeProduct}
      />
    </main>
  );
}

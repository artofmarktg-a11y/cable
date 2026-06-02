const navItems = [
  { href: "#power", label: "Силовые" },
  { href: "#connect", label: "Соединительные" },
  { href: "#low-current", label: "Слаботочные" },
  { href: "#contacts", label: "Контакты" },
];

const benefits = [
  {
    icon: "coil",
    title: "Широкий ассортимент",
    text: "Более 10 000 позиций в наличии",
  },
  {
    icon: "truck",
    title: "Быстрая отгрузка",
    text: "Отгрузка в день заказа при наличии на складе",
  },
  {
    icon: "shield",
    title: "Сертификаты качества",
    text: "Вся продукция сертифицирована и соответствует ГОСТ",
  },
  {
    icon: "pin",
    title: "Доставка по России",
    text: "Доставляем в любой регион удобной транспортной компанией",
  },
];

const catalogItems = [
  {
    id: "power",
    image: "/assets/catalog-power-cable.png",
    icon: "bolt",
    title: "Силовые кабели",
    text: "Для передачи и распределения электроэнергии в силовых сетях и оборудовании.",
  },
  {
    id: "connect",
    image: "/assets/catalog-connect-cable.png",
    icon: "link",
    title: "Соединительные кабели",
    text: "Для подключения оборудования и систем управления в промышленных и бытовых решениях.",
  },
  {
    id: "low-current",
    image: "/assets/catalog-low-cable.png",
    icon: "signal",
    title: "Слаботочные кабели",
    text: "Для передачи данных и сигналов в системах связи, безопасности и автоматизации.",
  },
];

function Icon({ name }) {
  const common = {
    viewBox: "0 0 32 32",
    "aria-hidden": true,
  };

  const paths = {
    coil: (
      <>
        <path d="M8 10c0-3 16-3 16 0s-16 3-16 0Z" />
        <path d="M8 10v12c0 3 16 3 16 0V10" />
        <path d="M8 16c0 3 16 3 16 0" />
        <path d="M8 22c0 3 16 3 16 0" />
      </>
    ),
    truck: (
      <>
        <path d="M5 11h13v10H5z" />
        <path d="M18 15h5l4 4v2h-9z" />
        <path d="M9 24a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M23 24a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M2 14h5" />
        <path d="M2 18h5" />
      </>
    ),
    shield: (
      <>
        <path d="M16 4 26 8v7c0 6-4 10-10 13C10 25 6 21 6 15V8z" />
        <path d="m11 16 3 3 7-8" />
      </>
    ),
    pin: (
      <>
        <path d="M16 4a7 7 0 0 1 7 7c0 5-7 12-7 12S9 16 9 11a7 7 0 0 1 7-7Z" />
        <path d="M16 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="m8 18-4 3v6l8-3 8 3 8-4v-6l-5 3" />
      </>
    ),
    bolt: <path d="m18 3-10 15h8l-2 11 10-16h-8z" />,
    link: (
      <>
        <path d="M13 20 9 24a5 5 0 0 1-7-7l4-4" />
        <path d="m19 12 4-4a5 5 0 0 1 7 7l-4 4" />
        <path d="m11 21 10-10" />
      </>
    ),
    signal: (
      <>
        <path d="M7 15a13 13 0 0 1 18 0" />
        <path d="M11 19a7 7 0 0 1 10 0" />
        <path d="M16 24h.01" />
      </>
    ),
    doc: (
      <>
        <path d="M8 3h11l5 5v21H8z" />
        <path d="M19 3v6h5" />
        <path d="M12 15h8" />
        <path d="M12 20h8" />
      </>
    ),
  };

  return (
    <svg {...common}>
      {paths[name]}
    </svg>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="logo-link" href="#top" aria-label="Металлобаза Волхонка">
        <img src="/assets/logo-metallobaza-volhonka.svg" alt="Металлобаза Волхонка" />
      </a>

      <input className="menu-toggle" id="menu-toggle" type="checkbox" aria-label="Открыть меню" />
      <label className="menu-button" htmlFor="menu-toggle" aria-hidden="true">
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

function HeroSection() {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <Header />
      <div className="section-shell hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">Кабельная продукция со склада и под заказ</h1>
          <p>
            Силовой кабель, контрольный, монтажный, СИП, провод и сопутствующая продукция для
            строительства, производства и энергетики.
          </p>
          <a className="primary-button" href="#request">
            <Icon name="doc" />
            Получить расчёт
          </a>
        </div>

        <div className="hero-media" aria-label="Кабели с разрядом тока">
          <img src="/assets/hero-cable-discharge.png" alt="Кабели с разрядом тока" />
        </div>
      </div>

      <div className="section-shell hero-bottom">
        <div className="benefit-grid">
          {benefits.map((item) => (
            <article className="info-card" key={item.title}>
              <Icon name={item.icon} />
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <aside className="hit-card" aria-label="Хит продаж">
          <img src="/assets/product-cable.jpg" alt="Кабель ВВГнг(А)-LS 3x2,5" />
          <div>
            <span>Хит продаж</span>
            <h2>Кабель ВВГнг(А)-LS 3x2,5</h2>
            <ul>
              <li>Низкое дымо- и газовыделение</li>
              <li>Не распространяет горение</li>
              <li>Для внутренних и наружных работ</li>
            </ul>
            <a href="#catalog">Смотреть в каталоге</a>
          </div>
        </aside>
      </div>
    </section>
  );
}

function CatalogSection() {
  return (
    <section className="catalog-section" id="catalog" aria-labelledby="catalog-title">
      <div className="section-shell">
        <div className="section-heading">
          <h2 id="catalog-title">Каталог кабельной продукции</h2>
          <p>
            В наличии и под заказ широкий ассортимент силовых, соединительных и слаботочных
            кабелей для любых задач.
          </p>
        </div>

        <div className="catalog-grid">
          {catalogItems.map((item) => (
            <article className="catalog-card" id={item.id} key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="catalog-card-body">
                <Icon name={item.icon} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <a href="#request" aria-label={`Оставить заявку: ${item.title}`}>
                  →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="catalog-cta" id="request">
          <Icon name="doc" />
          <div>
            <h3>Не нашли нужный кабель?</h3>
            <p>Оставьте заявку, подберём оптимальное решение под ваши задачи и рассчитаем стоимость.</p>
          </div>
          <a className="primary-button compact" href="mailto:komarov.pv@metallobazav.ru">
            Получить расчёт
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="site-page">
      <HeroSection />
      <CatalogSection />
      <section className="contacts-anchor" id="contacts" aria-label="Контакты" />
    </main>
  );
}

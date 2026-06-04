"use client";

import { useState } from "react";
import LeadModal from "./components/LeadModal";

const navItems = [
  { href: "/catalog?type=power", label: "Силовые" },
  { href: "/catalog?type=connect", label: "Соединительные" },
  { href: "/catalog?type=low-current", label: "Слаботочные" },
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
    href: "catalog?type=power",
    image: "assets/catalog-power-cable.png",
    icon: "bolt",
    title: "Силовые кабели",
    text: "Для передачи и распределения электроэнергии в силовых сетях и оборудовании.",
  },
  {
    id: "connect",
    href: "catalog?type=connect",
    image: "assets/catalog-connect-cable.png",
    icon: "link",
    title: "Соединительные кабели",
    text: "Для подключения оборудования и систем управления в промышленных и бытовых решениях.",
  },
  {
    id: "low-current",
    href: "catalog?type=low-current",
    image: "assets/catalog-low-cable.png",
    icon: "signal",
    title: "Слаботочные кабели",
    text: "Для передачи данных и сигналов в системах связи, безопасности и автоматизации.",
  },
];

const manufacturers = [
  { name: "Конкорд", logo: "assets/manufacturers/concord.svg" },
  { name: "Кабэкс", logo: "assets/manufacturers/kabex.svg" },
  { name: "Ивановский кабельный завод", logo: "assets/manufacturers/ivanovo.svg" },
  { name: "Альфакабель", logo: "assets/manufacturers/alpha-cable.svg" },
  { name: "Кабельный завод Цветлит", logo: "assets/manufacturers/cvetlit.svg" },
  { name: "PROconnect", logo: "assets/manufacturers/proconnect.svg" },
];

const taskTabs = [
  {
    id: "task-power",
    key: "power",
    tab: "Передать энергию",
    title: "Передать энергию для питания объектов.",
    type: "Силовые",
    image: "assets/tasks/power-cable.png",
    text: "Используются для питания объектов, оборудования и инженерных систем. Подходят для строительных площадок, производств, коммерческих и жилых зданий.",
    note: "Надёжная основа для стабильной работы - от небольших объектов до крупных проектов.",
  },
  {
    id: "task-connect",
    key: "connect",
    tab: "Связать оборудование",
    title: "Связать оборудование в единую систему.",
    type: "Соединительные",
    image: "assets/tasks/connect-cable.png",
    text: "Обеспечивают корректное подключение техники, узлов и инженерных решений. Используются в промышленности, автоматике, машиностроении и при монтаже оборудования.",
    note: "Когда важно, чтобы всё работало без сбоев и «с первого подключения».",
  },
  {
    id: "task-low-current",
    key: "low-current",
    tab: "Отправить данные",
    title: "Отправить данные и обеспечить связь.",
    type: "Слаботочные",
    image: "assets/tasks/low-current-cable.png",
    text: "Применяются в системах видеонаблюдения, сигнализации, интернете, связи и телекоммуникациях.",
    note: "Основа для современных систем управления, безопасности и коммуникации.",
  },
];

const advantages = [
  {
    title: "Консультация опытных специалистов",
    titleLines: ["Консультация", "опытных специалистов"],
    text: "Наши менеджеры с большим опытом работы с кабельной продукцией, помогут подобрать оптимальное решение с учётом технических требований, условий эксплуатации и задач проекта.",
  },
  {
    title: "Обработка заявки до 30 минут",
    titleLines: ["Обработка заявки", "до 30 минут"],
    text: "Отдел продаж, насчитывающий более 40 сотрудников, не оставит вашу заявку без внимания. Мы гарантируем оперативную обработку заявок и быстрый расчёт.",
  },
  {
    title: "Собственная служба доставки",
    titleLines: ["Собственная служба", "доставки"],
    text: "Собственная служба доставки из автомобилей грузоподъемностью от 1.5 до 20 тонн, гарантирует вам поставку материалов на объект в кратчайшие сроки.",
  },
  {
    title: "Прямые поставки от производителей",
    titleLines: ["Прямые поставки", "от производителей"],
    text: "Прямые поставки от производителей позволяют предлагать стабильные поставки и выгодные условия. Все, что вам может понадобиться - скорее всего уже есть у нас.",
  },
];

const responsibilityItems = [
  {
    title: "Чтобы кабель «подошел с первого раза»",
    lead: "Следим за соответствием техническим требованиям",
    points: ["нужное сечение и марка кабеля", "условиям эксплуатации и температуры", "соответствие проекту и ТЗ"],
  },
  {
    title: "Устали бегать по разным поставщикам",
    lead: "Ищем возможность закрыть всю вашу заявку",
    points: [
      "консультация опытных специалистов",
      "подбор аналогов или альтернатив",
      "с вас проблема - с нас решение",
    ],
  },
  {
    title: "Чтобы не было аварий и переделок на объекте",
    lead: "Обеспечиваем надежность и качество продукции",
    points: ["соответствие ГОСТ и наличие сертификатов", "реальные характеристики, а не «на бумаге»", "только проверенные производители"],
  },
  {
    title: "Вам важно получить решение, а не отказ",
    lead: "Работаем с нестандартными запросами",
    points: ["редкие позиции", "специфические характеристики", "индивидуальные заявки"],
  },
  {
    title: "Сорванные сроки работ",
    lead: "Знаем, что все доставки должны приехать вовремя",
    points: ["имеем собственный грузовой автопарк", "оперативно осуществляем догруз", "обеспечиваем возможность срочной доставки"],
  },
  {
    title: "Проблемы с проверками и сдачей объекта",
    lead: "Внимательно и оперативно готовим документы",
    points: ["сертификаты", "паспорта продукции", "закрывающие документы"],
  },
];

const audienceItems = [
  {
    icon: "/assets/audience/construction.png",
    title: "Строительные организации",
    points: [
      "Подбор кабельной продукции строго под проект и ТЗ.",
      "Возможность закрыть крупные объёмы в сжатые сроки.",
      "Поставка позиций, которых нет в открытом каталоге.",
      "Снижение рисков ошибок при закупке.",
      "Комплексные поставки вместе с другими материалами.",
    ],
  },
  {
    icon: "/assets/audience/warehouse.png",
    title: "Торгующие организации",
    points: [
      "Широкий ассортимент для перепродажи.",
      "Возможность быстро получить востребованные позиции.",
      "Гибкость по объёмам закупки.",
      "Подбор альтернативных решений под запрос клиента.",
      "Стабильные поставки без «провалов» по наличию.",
    ],
  },
  {
    icon: "/assets/audience/factory.png",
    title: "Промышленные компании и заводы",
    points: [
      "Подбор кабеля под конкретные условия эксплуатации.",
      "Работа с нестандартными и специфическими запросами.",
      "Поставка продукции с требуемыми характеристиками.",
      "Надёжные решения для бесперебойной работы оборудования.",
      "Возможность регулярных поставок.",
    ],
  },
  {
    icon: "/assets/audience/private-client.png",
    title: "ИП и частные лица",
    points: [
      "Помощь в выборе без сложной технической терминологии.",
      "Возможность купить небольшие объёмы.",
      "Подбор оптимального варианта по цене и задаче.",
      "Доступ к ассортименту, как у профессионалов.",
      "Консультация перед покупкой.",
    ],
  },
];

const orderSteps = [
  {
    number: "1",
    text: "Вы отправляете заявку на сайте любым удобным для вас способом. Форма заказа, телефон или почта.",
  },
  {
    number: "2",
    text: "Через несколько минут мы вернемся к вам, чтобы уточнить детали и подбираем нужную кабельную продукцию.",
  },
  {
    number: "3",
    text: "Готовим предложение по подходящим вам позициям.",
  },
  {
    number: "4",
    text: "Оформляем необходимые для оплаты и поставки документы. Согласовываем удобное время и сроки доставки.",
  },
];

function formatPhoneNumber(value) {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  }

  if (digits.startsWith("7")) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);

  const area = digits.slice(0, 3);
  const first = digits.slice(3, 6);
  const second = digits.slice(6, 8);
  const third = digits.slice(8, 10);

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

function AboutSection() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="section-shell">
        <div className="about-header">
          <img src="assets/logo-metallobaza-volhonka.svg" alt="Металлобаза Волхонка" />
          <div className="section-heading">
            <h2 id="about-title">О компании</h2>
            <p>Новое направление продаж кабельной продукции от Металлобазы Волхонка.</p>
          </div>
        </div>

        <div className="about-card">
          <p className="about-lead">
            Металлобаза Волхонка с 2018 года осуществляющая поставки металлопроката и строительных материалов запускает новое направление своей деятельности - продажи кабельной продукции.
          </p>
          <p>
            Мы постоянно расширяем свой ассортимент и рады предложить нашим клиентам широкий выбор силовых, соединительных и слаботочных кабелей от старейших заводов нашей страны. Теперь в "Металлобазе Волхонка" вы можете заказать не только металлопрокат и строительные материалы, но и кабельную продукцию для строительных, промышленных и инженерных задач.
          </p>
        </div>

        <div className="manufacturer-panel">
          <h3>Мы работаем с ведущими российскими производителями</h3>
          <div className="manufacturer-grid">
            {manufacturers.map((item) => (
              <article className="manufacturer-card" key={item.name}>
                <img src={item.logo} alt={item.name} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TaskSection({ onLeadRequest }) {
  return (
    <section className="task-section" id="tasks" aria-labelledby="tasks-title">
      <div className="section-shell">
        <div className="section-heading">
          <h2 id="tasks-title">Кабели под ваши задачи</h2>
          <p>Выберите тип задачи, которую нужно решить на объекте.</p>
        </div>

        <div className="task-tabs-wrap">
          {taskTabs.map((item, index) => (
            <input
              className="task-radio"
              type="radio"
              name="cable-task"
              id={item.id}
              defaultChecked={index === 0}
              key={item.id}
            />
          ))}

          <div className="task-tabs" role="tablist" aria-label="Задачи для кабелей">
            {taskTabs.map((item) => (
              <label className={`task-tab ${item.key}`} htmlFor={item.id} key={item.id}>
                {item.tab}
              </label>
            ))}
          </div>

          <div className="task-panels">
            {taskTabs.map((item) => (
              <article className={`task-panel ${item.key}`} key={item.id}>
                <div className="task-copy">
                  <span>{item.type}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <strong>{item.note}</strong>
                  <button
                    className="primary-button task-button"
                    type="button"
                    onClick={() =>
                      onLeadRequest({
                        title: "Получить консультацию",
                        source: `Блок задач: ${item.type}`,
                        details: `${item.title}\n${item.text}\n${item.note}`,
                      })
                    }
                  >
                    Получить консультацию
                  </button>
                </div>
                <div className="task-image">
                  <img src={item.image} alt={`${item.type} кабель`} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AdvantagesSection() {
  return (
    <section className="advantages-section" id="advantages" aria-labelledby="advantages-title">
      <div className="section-shell">
        <div className="section-heading advantages-heading">
          <h2 id="advantages-title">Наши преимущества</h2>
          <p>Вы получаете не просто кабель, а оперативное решение вашей задачи</p>
        </div>

        <div className="advantages-grid">
          {advantages.map((item) => (
            <article className="advantage-card" key={item.title}>
              <Icon name="bolt" />
              <h3>
                {item.titleLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResponsibilitySection() {
  return (
    <section className="responsibility-section" id="why-us" aria-labelledby="responsibility-title">
      <div className="section-shell">
        <div className="section-heading responsibility-heading">
          <h2 id="responsibility-title">Ваш результат — наша зона ответственности</h2>
          <p>Если вы хоть раз закупали кабель, вы точно сталкивались хотя бы с частью этих ситуаций.</p>
        </div>

        <div className="responsibility-grid">
          {responsibilityItems.map((item) => (
            <article className="responsibility-card" key={item.title}>
              <Icon name="bolt" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.lead}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="audience-section" id="audience" aria-labelledby="audience-title">
      <div className="section-shell">
        <div className="section-heading audience-heading">
          <h2 id="audience-title">С кем работаем</h2>
          <p>
            Поставляем кабельную продукцию под любые задачи и объёмы — от единичных закупок до комплексных поставок.
          </p>
        </div>

        <div className="audience-grid">
          {audienceItems.map((item) => (
            <article className="audience-card" key={item.title}>
              <span
                className="audience-icon"
                style={{ "--audience-icon": `url(${item.icon})` }}
                aria-hidden="true"
              />
              <h3>{item.title}</h3>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrderSection() {
  return (
    <section className="order-section" id="order" aria-labelledby="order-title">
      <div className="section-shell">
        <div className="section-heading order-heading">
          <h2 id="order-title">Как сделать заказ?</h2>
        </div>

        <div className="order-grid">
          {orderSteps.map((item) => (
            <article className="order-step" key={item.number}>
              <span className="order-step-number" aria-hidden="true">
                {item.number}
              </span>
              <span className="order-step-label">Шаг</span>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RequestSection() {
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("name", formData.get("Имя") || "");
    formData.set("phone", formData.get("Телефон") || "");
    formData.set("title", "Заявка с сайта");
    formData.set("source", "Форма в блоке заявки");
    formData.set("details", formData.get("Описание задачи") || "");

    setIsSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        body: formData,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (result.mailto) {
          window.location.href = result.mailto;
          setStatus("Откроем почтовый клиент для отправки заявки.");
          return;
        }

        setStatus("Не удалось отправить заявку. Попробуйте позже.");
        return;
      }

      setStatus("Заявка отправлена. Менеджер свяжется с вами.");
      form.reset();
    } catch (error) {
      setStatus("Не удалось отправить заявку. Попробуйте позже.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="request-section" aria-labelledby="request-title">
      <div className="section-shell request-grid">
        <div className="request-copy">
          <h2 id="request-title">
            Мы не ограничиваемся каталогом и не продаем «что есть» — мы подбираем кабель под вашу задачу.
          </h2>
          <p>
            Расскажите про свой проект: что нужно подключить, какие условия на объекте, какая нагрузка планируется и какие требования важны. Мы разберём задачу и подберём кабель, который действительно подходит — по характеристикам, условиям эксплуатации и бюджету.
          </p>
          <div className="request-points" aria-label="Преимущества заявки">
            {["Подбор по ТЗ", "Поможем с аналогами", "Ответим в течении 30 мин."].map((item) => (
              <span key={item}>
                <Icon name="bolt" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <form
          className="request-form"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <h3>Оставьте заявку</h3>

          <label>
            <span>Имя</span>
            <input type="text" name="Имя" autoComplete="name" required />
          </label>

          <label>
            <span>Телефон</span>
            <input
              type="tel"
              name="Телефон"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+7 (___) ___-__-__"
              onInput={(event) => {
                event.currentTarget.value = formatPhoneNumber(event.currentTarget.value);
              }}
              required
            />
          </label>

          <label>
            <span>Описание задачи</span>
            <textarea name="Описание задачи" rows="5" placeholder="Расскажите про ваш проект" required />
          </label>

          <label>
            <span>Загрузить документацию</span>
            <input
              type="file"
              name="Документация"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip,.rar"
              multiple
            />
          </label>

          <button className="primary-button" type="submit" disabled={isSending}>
            {isSending ? "Отправляем..." : "Отправить заявку"}
          </button>

          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </section>
  );
}

function ContactsSection() {
  const yandexCompanyUrl = "https://yandex.ru/maps/org/metallobaza_volkhonka/65739011673/";
  const mapSrc = "https://yandex.ru/map-widget/v1/?ol=biz&oid=65739011673";

  return (
    <section className="contacts-section" id="contacts" aria-labelledby="contacts-title">
      <div className="section-shell contacts-grid">
        <div className="contact-card">
          <span className="contact-eyebrow">Контакты</span>
          <h2 id="contacts-title">«Металлобаза Волхонка»</h2>

          <div className="contact-list">
            <a className="contact-row" href="tel:+79218887782" style={{ "--contact-icon": "url('/assets/contact/tel.png')" }}>
              <span className="contact-icon" aria-hidden="true" />
              <span>+7 (921) 888 77 82</span>
            </a>
            <a className="contact-row contact-mail" href="mailto:komarov.pv@metallobazav.ru" style={{ "--contact-icon": "url('/assets/contact/mail.png')" }}>
              <span className="contact-icon" aria-hidden="true" />
              <span>komarov.pv@metallobazav.ru</span>
            </a>
            <a className="contact-row" href="https://www.metallobazav.ru" target="_blank" rel="noreferrer" style={{ "--contact-icon": "url('/assets/contact/www.png')" }}>
              <span className="contact-icon" aria-hidden="true" />
              <span>www.metallobazav.ru</span>
            </a>
            <address className="contact-row" style={{ "--contact-icon": "url('/assets/contact/geo.png')" }}>
              <span className="contact-icon" aria-hidden="true" />
              <span>
                Санкт-Петербург, ул. Зольная, д.15, БЦ «Морская столица»
              </span>
            </address>
          </div>

          <a className="primary-button contact-route-button" href={yandexCompanyUrl} target="_blank" rel="noreferrer">
            Открыть карточку
          </a>
        </div>

        <div className="contact-map-card">
          <iframe
            src={mapSrc}
            title="Карта проезда к Металлобазе Волхонка"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="logo-link" href="#top" aria-label="Металлобаза Волхонка">
        <img src="assets/logo-metallobaza-volhonka.svg" alt="Металлобаза Волхонка" />
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

function HeroSection({ onLeadRequest }) {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="section-shell hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">Кабельная продукция со склада и под заказ</h1>
          <p>
            Силовой кабель, контрольный, монтажный, СИП, провод и сопутствующая продукция для
            строительства, производства и энергетики.
          </p>
          <button
            className="primary-button"
            type="button"
            onClick={() =>
              onLeadRequest({
                title: "Получить расчёт",
                source: "Первый экран",
                details: "Кнопка «Получить расчёт» на первом экране.",
              })
            }
          >
            <Icon name="doc" />
            Получить расчёт
          </button>
        </div>

        <div className="hero-media" aria-label="Кабели с разрядом тока">
          <img src="assets/hero-cable-discharge.png" alt="Кабели с разрядом тока" />
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
          <img src="assets/tasks/power-cable.png" alt="Кабель ВВГнг(А)-LS 3x2,5" />
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

function CatalogSection({ onLeadRequest }) {
  return (
    <section className="catalog-section" id="catalog" aria-labelledby="catalog-title">
      <div className="section-shell">
        <div className="catalog-heading-row">
          <div className="section-heading">
            <h2 id="catalog-title">Каталог кабельной продукции</h2>
            <p>
              В наличии и под заказ широкий ассортимент силовых, соединительных и слаботочных
              кабелей для любых задач.
            </p>
          </div>
          <a className="primary-button catalog-assortment-button" href="catalog">
            Смотреть весь ассортимент
          </a>
        </div>

        <div className="catalog-grid">
          {catalogItems.map((item) => (
            <a className="catalog-card" id={item.id} href={item.href} key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="catalog-card-body">
                <Icon name={item.icon} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <span className="catalog-card-arrow" aria-hidden="true">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="catalog-cta" id="request">
          <Icon name="doc" />
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
              onLeadRequest({
                title: "Нет нужного кабеля",
                source: "Блок каталог на главной",
                details: "Посетитель не нашёл нужный кабель на сайте.",
              })
            }
          >
            Нет нужного кабеля
          </button>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [leadModal, setLeadModal] = useState(null);

  return (
    <main className="site-page">
      <Header />
      <HeroSection onLeadRequest={setLeadModal} />
      <AboutSection />
      <TaskSection onLeadRequest={setLeadModal} />
      <CatalogSection onLeadRequest={setLeadModal} />
      <AdvantagesSection />
      <ResponsibilitySection />
      <AudienceSection />
      <OrderSection />
      <RequestSection />
      <ContactsSection />
      <LeadModal lead={leadModal} onClose={() => setLeadModal(null)} />
    </main>
  );
}

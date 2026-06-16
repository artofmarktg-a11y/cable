import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Кабельная продукция со склада и под заказ",
  description: "Каталог кабельной продукции Металлобаза Волхонка",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        {children}
        <Script src="https://cdn.callibri.ru/callibri.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

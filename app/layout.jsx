import "./globals.css";
import CookieBanner from "./components/CookieBanner";

export const metadata = {
  title: "Кабельная продукция со склада и под заказ",
  description: "Каталог кабельной продукции Металлобаза Волхонка",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}

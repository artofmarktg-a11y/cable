import "./globals.css";

export const metadata = {
  title: "Кабельная продукция со склада и под заказ",
  description: "Каталог кабельной продукции Металлобаза Волхонка",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}

// Contacts from the supplied original website: «Перая версия/контакты.png».
export const contact = {
  phone: "8 800 222-67-11",
  phoneHref: "tel:+78002226711",
  email: "906711@bk.ru",
  emailHref: "mailto:906711@bk.ru?subject=" + encodeURIComponent("Запрос предложения — ИСВО"),
};

// Null means that the new page is not built yet; never point to a dead route.
export const navigation = [
  { label: "Главная", href: "/" },
  { label: "Техника", href: null },
  { label: "О компании", href: null },
  { label: "Сервис и запчасти", href: null },
] as const;

export const heroImage = {
  sizes: "(max-width: 767px) 100vw, (max-width: 1199px) calc(83vw - 222.44px), calc(72vw - 192.96px)",
  width: 1920,
  height: 1440,
  alt: "Лента и рама овощеуборочного транспортера ИСВО НОУТ-5 в работе на капустном поле",
};

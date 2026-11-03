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

// Public origin documented in README.md; shared by Astro and structured data.
export const site = {
  name: "ИСВО",
  url: "https://933944.ru/",
  description: "Проектируем и производим технику для овощеводства с\u00a02007\u00a0года.",
};

// Contacts from the supplied original website: «Перая версия/контакты.png».
export const contact = {
  phone: "8 800 222 67 11",
  phoneHref: "tel:+78002226711",
  email: "906711@bk.ru",
  emailHref: "mailto:906711@bk.ru?subject=" + encodeURIComponent("Запрос предложения — ИСВО"),
  projectEmailHref: "mailto:906711@bk.ru?subject=" + encodeURIComponent("Индивидуальный проект — ИСВО"),
  usedEquipmentEmailHref: "mailto:906711@bk.ru?subject=" + encodeURIComponent("Предложение техники Б/У или Trade-in — ИСВО"),
  usedEquipmentAvailabilityEmailHref: "mailto:906711@bk.ru?subject=" + encodeURIComponent("Наличие техники Б/У — ИСВО"),
  sparePartsEmailHref: "mailto:906711@bk.ru?subject=" + encodeURIComponent("Подбор запасных частей — ИСВО"),
  serviceEmailHref: "mailto:906711@bk.ru?subject=" + encodeURIComponent("Сервисное обращение — ИСВО"),
};

export const equipmentNavigation = { label: "Техника", href: "/#equipment-selector" } as const;
export const usedEquipmentNavigation = { label: "Техника Б/У", href: "/used-equipment/" } as const;
export const individualProjectNavigation = { label: "Индивидуальный проект", href: "/individual-project/" } as const;
export const sparePartsNavigation = { label: "Запасные части и сервис", href: "/spare-parts-service/" } as const;
export const aboutNavigation = { label: "О компании", href: "/about/" } as const;
export const navigation = [
  { label: "Главная", href: "/" },
  equipmentNavigation,
  usedEquipmentNavigation,
  individualProjectNavigation,
  aboutNavigation,
  sparePartsNavigation,
] as const;

// Public origin documented in README.md; shared by Astro and structured data.
export const site = {
  name: "ИСВО",
  url: "https://933944.ru/",
  description: "Разрабатываем и производим технику для овощеводства. Работаем с хозяйствами с\u00a02007\u00a0года.",
};

// Contacts from the supplied original website: «Перая версия/контакты.png».
export const contact = {
  phone: "8 800 222 67 11",
  phoneHref: "tel:+78002226711",
  localPhone: "+7 (4852) 90-67-11",
  localPhoneHref: "tel:+74852906711",
  email: "906711@bk.ru",
  officeName: "Конструкторское бюро «ИСВО»",
  address: {
    postalCode: "150521",
    region: "Ярославская область",
    district: "Ярославский район",
    locality: "пос. Нагорный",
    street: "ул. Дорожная, д. 11",
    country: "RU",
  },
  // Use the hours in the original page's main contact block; its header/footer differ.
  workingHours: "Пн–Пт, 09:00–17:00",
  coordinates: { latitude: 57.564704, longitude: 39.834711 },
  emailHref: "mailto:906711@bk.ru?subject=" + encodeURIComponent("Запрос предложения — ИСВО"),
  projectEmailHref: "mailto:906711@bk.ru?subject=" + encodeURIComponent("Индивидуальный проект — ИСВО"),
  usedEquipmentEmailHref: "mailto:906711@bk.ru?subject=" + encodeURIComponent("Предложение техники Б/У или Trade-in — ИСВО"),
  usedEquipmentAvailabilityEmailHref: "mailto:906711@bk.ru?subject=" + encodeURIComponent("Наличие техники Б/У — ИСВО"),
  sparePartsEmailHref: "mailto:906711@bk.ru?subject=" + encodeURIComponent("Подбор запасных частей — ИСВО"),
  serviceEmailHref: "mailto:906711@bk.ru?subject=" + encodeURIComponent("Сервисное обращение — ИСВО"),
};

const mapPoint = `${contact.coordinates.longitude},${contact.coordinates.latitude}`;
const mapBounds = [
  contact.coordinates.longitude - .007,
  contact.coordinates.latitude - .003,
  contact.coordinates.longitude + .007,
  contact.coordinates.latitude + .003,
].map(value => value.toFixed(6)).join(",");
export const contactMap = {
  href: `https://yandex.ru/maps/?ll=${mapPoint}&z=16&pt=${mapPoint},pm2gnm`,
  routeHref: `https://yandex.ru/maps/?rtext=~${contact.coordinates.latitude},${contact.coordinates.longitude}&rtt=auto`,
  embedHref: `https://www.openstreetmap.org/export/embed.html?bbox=${mapBounds}&layer=mapnik&marker=${contact.coordinates.latitude},${contact.coordinates.longitude}`,
};

export const equipmentNavigation = { label: "Техника", href: "/#equipment-selector" } as const;
export const usedEquipmentNavigation = { label: "Техника Б/У", href: "/used-equipment/" } as const;
export const individualProjectNavigation = { label: "Индивидуальный проект", href: "/individual-project/" } as const;
export const sparePartsNavigation = { label: "Запасные части и сервис", href: "/spare-parts-service/" } as const;
export const aboutNavigation = { label: "О компании", href: "/about/" } as const;
export const contactsNavigation = { label: "Контакты", href: "/contacts/" } as const;
export const navigation = [
  { label: "Главная", href: "/" },
  equipmentNavigation,
  usedEquipmentNavigation,
  individualProjectNavigation,
  aboutNavigation,
  sparePartsNavigation,
  contactsNavigation,
] as const;

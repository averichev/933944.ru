import type { ImageMetadata } from "astro";
import { contact } from "./site";
import beltFingers from "../assets/spare-parts/conveyor-belt-fingers.jpg";
import beltFingersCoiled from "../assets/spare-parts/conveyor-belt-fingers-coiled.jpg";
import beltFingersSide from "../assets/spare-parts/conveyor-belt-fingers-side.jpg";
import beltCleats from "../assets/spare-parts/conveyor-belt-cleats.jpg";
import beltCleatsSide from "../assets/spare-parts/conveyor-belt-cleats-side.jpg";
import hydraulicMotor from "../assets/spare-parts/hydraulic-motor.jpg";
import rollerFront from "../assets/spare-parts/roller-front.jpg";
import rollerSide from "../assets/spare-parts/roller-side.jpg";
import rollerShaft from "../assets/spare-parts/roller-shaft.jpg";
import axleWithRollers from "../assets/spare-parts/axle-with-rollers.jpg";
import axleWithRollersSide from "../assets/spare-parts/axle-with-rollers-side.jpg";
import shaftDark from "../assets/spare-parts/shaft-dark.jpg";
import shaftInserts from "../assets/spare-parts/shaft-inserts.jpg";
import shaftTextured from "../assets/spare-parts/shaft-textured.jpg";
import shaftLight from "../assets/spare-parts/shaft-light.jpg";
import shaftLightSide from "../assets/spare-parts/shaft-light-side.jpg";

interface PartPhoto {
  src: ImageMetadata;
  alt: string;
}

interface SparePartGroup {
  id: string;
  title: string;
  description: string;
  selection: string;
  image: PartPhoto;
  additionalImages: PartPhoto[];
}

// Sources: Каталог/Запасные части и сервис/. Photos show examples, not a stock list.
// No commercial offer, part numbers, dimensions or compatibility data were supplied.
export const sparePartGroups: SparePartGroup[] = [
  {
    id: "conveyor-belts",
    title: "Транспортёрные ленты",
    description: "Ленты с поперечными планками, в том числе с пальцами. На фотографиях — разные исполнения и ракурсы.",
    selection: "Для подбора: ширина и длина ленты, шаг и форма планок, фото соединения.",
    image: { src: beltFingers, alt: "Свёрнутая транспортёрная лента с зелёными поперечными планками и пальцами" },
    additionalImages: [
      { src: beltFingersCoiled, alt: "Лента с поперечными планками и пальцами в свёрнутом виде" },
      { src: beltFingersSide, alt: "Лента с поперечными планками и пальцами, вид сбоку" },
      { src: beltCleats, alt: "Транспортёрная лента с поперечными планками" },
      { src: beltCleatsSide, alt: "Транспортёрная лента с поперечными планками, другой ракурс" },
    ],
  },
  {
    id: "hydraulic-motors",
    title: "Гидромотор",
    description: "Гидромотор для привода оборудования. Исполнение уточняется по маркировке и присоединительным размерам.",
    selection: "Для подбора: маркировка, размеры вала и фланца, фото гидравлических подключений.",
    image: { src: hydraulicMotor, alt: "Гидромотор с выступающим валом, крепёжным фланцем и двумя гидравлическими портами" },
    additionalImages: [],
  },
  {
    id: "rollers-axles",
    title: "Ролики и оси",
    description: "Отдельные ролики и оси с роликами. Размеры и расположение элементов подбираются под конкретный узел.",
    selection: "Для подбора: диаметр и ширина ролика, посадочный размер, длина оси и фото крепления.",
    image: { src: axleWithRollers, alt: "Металлическая ось с двумя светлыми роликами" },
    additionalImages: [
      { src: rollerFront, alt: "Отдельный светлый ролик, вид со стороны торца" },
      { src: rollerSide, alt: "Отдельный светлый ролик с выступающей осью, вид сбоку" },
      { src: rollerShaft, alt: "Светлый ролик на короткой металлической оси" },
      { src: axleWithRollersSide, alt: "Ось с двумя роликами, другой ракурс" },
    ],
  },
  {
    id: "shafts-drums",
    title: "Валы и барабаны",
    description: "Валы с гладкой и рифлёной поверхностью, с продольными вставками. На фотографиях — примеры исполнения.",
    selection: "Для подбора: длина и диаметр, размеры концов вала, фото поверхности и креплений.",
    image: { src: shaftInserts, alt: "Вал со светлой поверхностью и тёмными продольными вставками" },
    additionalImages: [
      { src: shaftDark, alt: "Вал с гладкой тёмной поверхностью" },
      { src: shaftTextured, alt: "Вал со светлой рифлёной поверхностью" },
      { src: shaftLight, alt: "Вал с гладкой светлой поверхностью" },
      { src: shaftLightSide, alt: "Вал с гладкой светлой поверхностью, другой ракурс" },
    ],
  },
];

export const partRequestHref = (title: string) => `${contact.sparePartsEmailHref}&body=${encodeURIComponent(`Здравствуйте! Нужна запасная часть: ${title}.\n\nМодель оборудования:\nМаркировка детали (если есть):\nРазмеры и количество:\nКонтактный телефон:\n\nПриложу фотографии детали и места её установки.`)}`;

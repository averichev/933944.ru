import type { ImageMetadata } from "astro";
import seeding from "../assets/hero-seeding.jpg";
import cultivator from "../assets/hero-cultivator.jpg";
import harvesting from "../assets/equipment/harvesting-nout-18.jpg";
import processing from "../assets/equipment/storage-processing.jpg";

export type EquipmentDirectionId = "seeding" | "crop-care" | "harvesting" | "storage-processing";

export interface EquipmentDirection {
  id: EquipmentDirectionId;
  title: string;
  description: string;
  image: {
    src: ImageMetadata;
    alt: string;
    focus: string;
    mobileFocus: string;
  };
}

export const directionHref = (direction: EquipmentDirectionId) => `/catalog/${direction}/`;

// Reading order follows the growing cycle, independently of the homepage layout.
export const equipmentDirections: EquipmentDirection[] = [
  {
    id: "seeding",
    title: "Посев и посадка",
    description: "Оборудование для подготовки и выполнения посевных работ.",
    image: {
      src: seeding,
      alt: "Кассета с грунтом и рабочий узел посевного оборудования ИСВО",
      focus: "50% 52%",
      mobileFocus: "50% 52%",
    },
  },
  {
    id: "crop-care",
    title: "Защита растений",
    description: "Механическая обработка междурядий и борьба с сорняками.",
    image: {
      src: cultivator,
      alt: "Рабочие органы прополочного культиватора ИСВО между рядами растений",
      focus: "56% 65%",
      mobileFocus: "50% 65%",
    },
  },
  {
    id: "harvesting",
    title: "Уборка урожая",
    description: "Техника для механизации уборки и транспортировки овощной продукции.",
    image: {
      src: harvesting,
      alt: "Транспортер НОУТ-18 на тракторе: уборка капусты и подача урожая в прицеп",
      focus: "50% 44%",
      mobileFocus: "50% 44%",
    },
  },
  {
    id: "storage-processing",
    title: "Хранение и переработка",
    description: "Очистка, калибровка и перемещение овощей при подготовке к продаже после хранения.",
    image: {
      src: processing,
      alt: "Линия подготовки капусты: оборачиватели контейнеров, посты очистки и транспортеры ИСВО",
      focus: "48% 50%",
      mobileFocus: "50% 50%",
    },
  },
];

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
  catalogTitle: string;
  catalogDescription: string;
  selectionAdvice: string;
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
    catalogTitle: "Оборудование для посева в рассадные кассеты",
    catalogDescription: "Кассетная сеялка СКР-144, маркер МКР-144 и посевной стол СП-1-144 для подготовки кассет и высева семян овощных и цветочных культур. Производство ИСВО.",
    selectionAdvice: "Для подбора посевного оборудования укажите культуру, размер кассеты и число ячеек. СКР-144 и МКР-144 рассчитаны на кассеты на 144 ячейки; совместимость с вашими кассетами и калибр отверстий высевающего лотка стоит уточнить перед заказом.",
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
    catalogTitle: "Культиваторы для междурядной обработки",
    catalogDescription: "Междурядные культиваторы ИСВО: КПМ «Эко-корректор» для прополки вокруг растений и КПП-4 для рыхления междурядий. Характеристики и подбор под схему посадки.",
    selectionAdvice: "Выбор культиватора зависит от культуры, ширины междурядий и расстояния между растениями. КПМ выпускается для обработки от одного до четырёх рядов. КПП-4 обрабатывает четыре ряда с междурядьями 60–80 см. При обращении укажите схему посадки и модель трактора.",
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
    catalogTitle: "Техника для уборки овощей",
    catalogDescription: "Овощеуборочные транспортеры НОУТ, платформа ПВУ-18 и транспортер ТУС-9П для уборки салатов. Сравните рабочую ширину, способ установки и характеристики техники ИСВО.",
    selectionAdvice: "Для подбора уборочной техники важны культура, площадь поля, рабочая ширина и способ подачи урожая. Укажите модель трактора и прицепа, размеры контейнеров и необходимость очистки или фасовки в поле. Эти данные помогут выбрать транспортер или платформу и уточнить комплектацию.",
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
    catalogTitle: "Оборудование для послеуборочной подготовки овощей",
    catalogDescription: "Очистка капусты и подготовка овощей к продаже: пост ПО-1, линии ЛЧ-2 и ЛЧ-4, калибратор, наклонный транспортер и оборачиватель контейнеров. Оборудование ИСВО.",
    selectionAdvice: "Начните с нужных операций: выгрузка из контейнера, очистка капусты, калибровка или перемещение продукции. ПО-1 можно использовать отдельно или в составе линии. Для подбора состава и компоновки сообщите культуру, требуемую производительность, размеры помещения и контейнеров.",
    image: {
      src: processing,
      alt: "Линия подготовки капусты: оборачиватели контейнеров, посты очистки и транспортеры ИСВО",
      focus: "48% 50%",
      mobileFocus: "50% 50%",
    },
  },
];

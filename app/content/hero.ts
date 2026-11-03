import cabbage from "../assets/hero-cabbage-field.jpg";
import cultivator from "../assets/hero-cultivator.jpg";
import platform from "../assets/hero-harvest-platform.jpg";
import seeding from "../assets/hero-seeding.jpg";
import salad from "../assets/hero-salad-conveyor.jpg";

export const heroGallery = {
  holdMs: 6000,
  fadeMs: 1600,
  sizes: "(max-width: 559px) calc(100vw - 48px), (max-width: 767px) 512px, (max-width: 1199px) 83vw, calc(72vw - 192.96px)",
};

// Cropped copies of catalog originals; sources and crop coordinates are in README.md.
// Focus is set per photograph so replacing a slide never requires changing the layout.
export const heroPhotos = [
  { id: "cabbage", label: "Овощеуборочный транспортер НОУТ-5 на уборке капусты", image: cabbage, focus: "85% 50%", mobileFocus: "50% 60%" },
  { id: "cultivator", label: "Прополочный культиватор", image: cultivator, focus: "90% 50%", mobileFocus: "70% 50%" },
  { id: "platform", label: "Платформа выборочной уборки ПВУ-18", image: platform, focus: "95% 50%", mobileFocus: "85% 50%" },
  { id: "seeding", label: "Кассетный посев", image: seeding, focus: "85% 50%", mobileFocus: "85% 50%" },
  { id: "salad", label: "Транспортер уборки салатов ТУС-9П", image: salad, focus: "85% 50%", mobileFocus: "85% 50%" },
] as const;

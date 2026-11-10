import type { ImageMetadata } from "astro";
import type { Product, ProductImage } from "./products";
import skr14401 from "../assets/products/details/skr-144/01.jpg";
import skr14402 from "../assets/products/details/skr-144/02.jpg";
import skr14403 from "../assets/products/details/skr-144/03.jpg";
import skr14404 from "../assets/products/details/skr-144/04.jpg";
import mkr14401 from "../assets/products/details/mkr-144/01.jpg";
import mkr14402 from "../assets/products/details/mkr-144/02.jpg";
import mkr14403 from "../assets/products/details/mkr-144/03.jpg";
import sp114401 from "../assets/products/details/sp-1-144/01.jpg";
import sp114402 from "../assets/products/details/sp-1-144/02.jpg";
import sp114403 from "../assets/products/details/sp-1-144/03.jpg";
import kpm01 from "../assets/products/details/kpm/01.jpg";
import kpm02 from "../assets/products/details/kpm/02.jpg";
import kpm03 from "../assets/products/details/kpm/03.jpg";
import kpm04 from "../assets/products/details/kpm/04.jpg";
import kpm05 from "../assets/products/details/kpm/05.jpg";
import kpp401 from "../assets/products/details/kpp-4/01.jpg";
import kpp402 from "../assets/products/details/kpp-4/02.jpg";
import kpp403 from "../assets/products/details/kpp-4/03.jpg";
import kpp404 from "../assets/products/details/kpp-4/04.jpg";
import kpp405 from "../assets/products/details/kpp-4/05.jpg";
import nout1801 from "../assets/products/details/nout-18/01.jpg";
import nout1802 from "../assets/products/details/nout-18/02.jpg";
import nout1803 from "../assets/products/details/nout-18/03.jpg";
import nout1804 from "../assets/products/details/nout-18/04.jpg";
import nout1805 from "../assets/products/details/nout-18/05.jpg";
import pvu1801 from "../assets/products/details/pvu-18/01.jpg";
import pvu1802 from "../assets/products/details/pvu-18/02.jpg";
import pvu1803 from "../assets/products/details/pvu-18/03.jpg";
import pvu1804 from "../assets/products/details/pvu-18/04.jpg";
import pvu1805 from "../assets/products/details/pvu-18/05.jpg";
import pvu1806 from "../assets/products/details/pvu-18/06.jpg";
import tus9p01 from "../assets/products/details/tus-9p/01.jpg";
import tus9p02 from "../assets/products/details/tus-9p/02.jpg";
import tus9p03 from "../assets/products/details/tus-9p/03.jpg";
import tus9p04 from "../assets/products/details/tus-9p/04.jpg";
import tus9p05 from "../assets/products/details/tus-9p/05.jpg";
import tus9p06 from "../assets/products/details/tus-9p/06.jpg";
import nout301 from "../assets/products/details/nout-3/01.jpg";
import nout302 from "../assets/products/details/nout-3/02.jpg";
import nout303 from "../assets/products/details/nout-3/03.jpg";
import nout304 from "../assets/products/details/nout-3/04.jpg";
import nout501 from "../assets/products/details/nout-5/01.jpg";
import nout502 from "../assets/products/details/nout-5/02.jpg";
import nout503 from "../assets/products/details/nout-5/03.jpg";
import nout504 from "../assets/products/details/nout-5/04.jpg";
import nout601 from "../assets/products/details/nout-6/01.jpg";
import nout602 from "../assets/products/details/nout-6/02.jpg";
import nout603 from "../assets/products/details/nout-6/03.jpg";
import nout604 from "../assets/products/details/nout-6/04.jpg";
import nout101 from "../assets/products/details/nout-1/01.jpg";
import lch201 from "../assets/products/details/lch-2/01.jpg";
import lch202 from "../assets/products/details/lch-2/02.jpg";
import lch401 from "../assets/products/details/lch-4/01.jpg";
import calibrator01 from "../assets/products/details/calibrator/01.jpg";
import calibrator02 from "../assets/products/details/calibrator/02.jpg";
import calibrator03 from "../assets/products/details/calibrator/03.jpg";
import calibrator04 from "../assets/products/details/calibrator/04.jpg";
import inclineconveyor01 from "../assets/products/details/incline-conveyor/01.jpg";
import inclineconveyor02 from "../assets/products/details/incline-conveyor/02.jpg";
import containertipper01 from "../assets/products/details/container-tipper/01.jpg";
import containertipper02 from "../assets/products/details/container-tipper/02.jpg";
import containertipper03 from "../assets/products/details/container-tipper/03.jpg";
import containertipper04 from "../assets/products/details/container-tipper/04.jpg";
import containertipper05 from "../assets/products/details/container-tipper/05.jpg";
import containertipper06 from "../assets/products/details/container-tipper/06.jpg";
import po107 from "../assets/products/po-1/07.jpg";
import po104 from "../assets/products/po-1/04.jpg";
import po105 from "../assets/products/po-1/05.jpg";
import po106 from "../assets/products/po-1/06.jpg";
import po103 from "../assets/products/po-1/03.jpg";
import po101 from "../assets/products/po-1/01.jpg";
import po102 from "../assets/products/po-1/02.jpg";

// Sources and brochure extraction bounds: product-media-sources.json.
// Video IDs are verified on the manufacturer's channel; omit unavailable media.
const photo = (src: ImageMetadata, alt: string): ProductImage => ({ src, alt });

export const productMedia: Record<string, Pick<Product, "image" | "gallery" | "video">> = {
  "skr-144": {
    image: photo(skr14401, "Ручная кассетная сеялка СКР-144"),
    gallery: [
      photo(skr14402, "Высевающие лотки и корпус сеялки СКР-144"),
      photo(skr14403, "Работа с высевающим лотком сеялки"),
      photo(skr14404, "Сеялка, маркер и принадлежности для посева в кассеты"),
    ],
    video: { youtubeId: "GxiaN1x9vJY", title: "СКР-144, МКР-144 и СП-1-144: инструкция и ответы на вопросы", poster: photo(skr14401, "Ручная кассетная сеялка СКР-144") },
  },
  "mkr-144": {
    image: photo(mkr14401, "Маркер МКР-144 с полимерными конусами"),
    gallery: [
      photo(mkr14402, "Маркер над рассадной кассетой на посевном столе"),
      photo(mkr14403, "Маркер в комплекте с кассетной сеялкой"),
    ],
    video: { youtubeId: "GxiaN1x9vJY", title: "СКР-144, МКР-144 и СП-1-144: инструкция и ответы на вопросы", poster: photo(mkr14401, "Маркер МКР-144 с полимерными конусами") },
  },
  "sp-1-144": {
    image: photo(sp114401, "Посевной стол СП-1-144 с оборудованием для кассет"),
    gallery: [
      photo(sp114402, "Рабочая поверхность посевного стола в теплице"),
      photo(sp114403, "Посевной стол СП-1-144 среди рассадных кассет"),
    ],
    video: { youtubeId: "GxiaN1x9vJY", title: "СКР-144, МКР-144 и СП-1-144: инструкция и ответы на вопросы", poster: photo(sp114401, "Посевной стол СП-1-144 с оборудованием для кассет") },
  },
  "kpm": {
    image: photo(kpm01, "Культиватор КПМ на тракторе в поле"),
    gallery: [
      photo(kpm02, "Рабочие секции и роторы культиватора КПМ"),
      photo(kpm03, "Ротор культиватора КПМ возле растения"),
      photo(kpm04, "Операторы направляют секции КПМ между растениями"),
      photo(kpm05, "Рабочее место оператора культиватора КПМ"),
    ],
    video: { youtubeId: "YGNmd7U4qkM", title: "Прополка капусты культиваторами КПМ", poster: photo(kpm01, "Культиватор КПМ на тракторе в поле") },
  },
  "kpp-4": {
    image: photo(kpp401, "Прополочный культиватор КПП-4 на тракторе"),
    gallery: [
      photo(kpp402, "КПП-4 на посадках капусты"),
      photo(kpp403, "Рабочие органы КПП-4 между растениями"),
      photo(kpp404, "Четырёхрядный культиватор КПП-4"),
      photo(kpp405, "Бункер комплектации КПП-4 с внесением удобрений"),
    ],
    video: { youtubeId: "DfZM8d1a6oA", title: "Культиватор пропашной прополочный КПП", poster: photo(kpp401, "Прополочный культиватор КПП-4 на тракторе") },
  },
  "nout-18": {
    image: photo(nout1801, "НОУТ-18 на уборке овощей с подачей урожая в прицеп"),
    gallery: [
      photo(nout1802, "НОУТ-18 со сложенными рабочими крыльями"),
      photo(nout1803, "Передача брокколи с крыла НОУТ-18 на продольную ленту"),
      photo(nout1804, "Схема основной части транспортера НОУТ-18"),
      photo(nout1805, "Схема НОУТ-18 с протяжным транспортером ТП-9"),
    ],
    video: { youtubeId: "Il3Z62EHaao", title: "Уборка брокколи транспортером НОУТ-18", poster: photo(nout1801, "НОУТ-18 на уборке овощей с подачей урожая в прицеп") },
  },
  "pvu-18": {
    image: photo(pvu1801, "Платформа ПВУ-18 с рабочим крылом на уборке овощей"),
    gallery: [
      photo(pvu1802, "Платформа ПВУ-18 возле производственного корпуса"),
      photo(pvu1803, "Рабочее место для подготовки овощей внутри ПВУ-18"),
      photo(pvu1804, "Подготовка овощей на платформе ПВУ-18"),
      photo(pvu1805, "Схема ПВУ-18 с продольным транспортером"),
      photo(pvu1806, "Вариант ПВУ-18 с селекционным столом"),
    ],
    video: { youtubeId: "kfiFARWxUOQ", title: "Уборка перца платформой ПВУ-18", poster: photo(pvu1801, "Платформа ПВУ-18 с рабочим крылом на уборке овощей") },
  },
  "tus-9p": {
    image: photo(tus9p01, "Транспортер ТУС-9П на уборке салатов"),
    gallery: [
      photo(tus9p02, "Узел передачи продукции с крыла ТУС-9П на платформу"),
      photo(tus9p03, "ТУС-9П со сложенным рабочим крылом"),
      photo(tus9p04, "Схема комплекта транспортера ТУС-9П"),
      photo(tus9p05, "ТУС-9П на полуприцепе в рабочем положении"),
      photo(tus9p06, "ТУС-9П на полуприцепе в транспортном положении"),
    ],
    video: { youtubeId: "1d9wL5_fXDA", title: "Уборка салата Айсберг транспортером ТУС-9П", poster: photo(tus9p01, "Транспортер ТУС-9П на уборке салатов") },
  },
  "nout-3": {
    image: photo(nout301, "Транспортер НОУТ-3 подаёт капусту с поля"),
    gallery: [
      photo(nout302, "НОУТ-3 на навеске трактора"),
      photo(nout303, "НОУТ-3 установлен на прицепе"),
      photo(nout304, "НОУТ-3 при уборке овощей с погрузкой в прицеп"),
    ],
    video: { youtubeId: "0lLsDNaHNdI", title: "Уборка цукини транспортером НОУТ-3", poster: photo(nout301, "Транспортер НОУТ-3 подаёт капусту с поля") },
  },
  "nout-5": {
    image: photo(nout501, "НОУТ-5 на уборке капусты с погрузкой в прицеп"),
    gallery: [
      photo(nout502, "Работа НОУТ-5 в поле, вид сбоку"),
      photo(nout503, "Рабочая лента комплекта НОУТ-5"),
      photo(nout504, "Подача овощей транспортером НОУТ-5 в прицеп"),
    ],
    video: { youtubeId: "Bs5x2sj_kJk", title: "Уборка капусты транспортером НОУТ-5", poster: photo(nout501, "НОУТ-5 на уборке капусты с погрузкой в прицеп") },
  },
  "nout-6": {
    image: photo(nout601, "Навесной транспортер НОУТ-6 на уборке капусты"),
    gallery: [
      photo(nout602, "Капуста на ленте рабочего крыла НОУТ-6"),
      photo(nout603, "Выгрузная часть НОУТ-6 подаёт капусту в прицеп"),
      photo(nout604, "НОУТ-6 со сложенными крыльями на тракторе"),
    ],
    video: { youtubeId: "9GodS-nJdCI", title: "Транспортер НОУТ-6.1: инструкция по эксплуатации", poster: photo(nout601, "Навесной транспортер НОУТ-6 на уборке капусты") },
  },
  "nout-1": {
    image: photo(nout101, "Лента НОУТ-1 поднимает мешки с поля к прицепу"),
    video: { youtubeId: "Go6uRHFVOpk", title: "Уборка мешков с картофелем транспортером НОУТ-1", poster: photo(nout101, "Лента НОУТ-1 поднимает мешки с поля к прицепу") },
  },
  "lch-2": {
    image: photo(lch201, "Схема линии ЛЧ-2 с контейнерами, двумя постами очистки и транспортерами"),
    gallery: [
      photo(lch202, "Схема модулей линии ЛЧ-2 без контейнерных оборачивателей"),
    ],
  },
  "lch-4": {
    image: photo(lch401, "Схема линии ЛЧ-4 с четырьмя постами очистки"),
  },
  "calibrator": {
    image: photo(calibrator01, "Калибратор ИСВО с ленточным транспортером и приёмными столами"),
    gallery: [
      photo(calibrator02, "Приёмные столы и рабочие узлы калибратора"),
      photo(calibrator03, "Калибратор с другого ракурса"),
      photo(calibrator04, "Лента, роликовые узлы и столы калибратора"),
    ],
  },
  "incline-conveyor": {
    image: photo(inclineconveyor01, "Наклонный ленточный транспортер ИСВО на колёсных опорах"),
    gallery: [
      photo(inclineconveyor02, "Рабочая лента наклонного транспортера с поперечными планками"),
    ],
  },
  "container-tipper": {
    image: photo(containertipper01, "Оборачиватель овощных контейнеров ИСВО с гидравлическим приводом"),
    gallery: [
      photo(containertipper02, "Поворотная рама оборачивателя контейнеров"),
      photo(containertipper03, "Оборачиватель контейнеров с поднятой рамой"),
      photo(containertipper04, "Привод и пульт оборачивателя контейнеров"),
      photo(containertipper05, "Оборачиватель контейнеров, вид сбоку"),
      photo(containertipper06, "Схема установки и опрокидывания контейнера"),
    ],
  },
  "po-1": {
    image: photo(po107, "ПО-1 в три четверти: два воздуховода, роликовый стол и турбовоздуходувки"),
    gallery: [
      photo(po104, "ПО-1 спереди: рабочие места и две турбовоздуходувки"),
      photo(po105, "ПО-1 с обратной стороны: шкаф автоматики и роликовый стол"),
      photo(po106, "ПО-1 сверху: рабочая поверхность и желоб для удаления листьев"),
      photo(po103, "Два оператора очищают капусту на посту ПО-1"),
      photo(po101, "Пост ПО-1 в работе на линии предпродажной подготовки капусты"),
      photo(po102, "Пост ПО-1 в помещении для хранения и подготовки капусты"),
    ],
    video: { youtubeId: "egFz48Rl3DM", title: "Пост очистки овощей ПО-1. Инструкция по эксплуатации", poster: photo(po103, "Два оператора очищают капусту на посту ПО-1") },
  },
};

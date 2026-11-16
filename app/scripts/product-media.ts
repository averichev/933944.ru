import "glightbox/dist/css/glightbox.min.css";
import "./product-media.css";
import type GLightboxFactory from "glightbox";

// Load the viewer only when someone opens media. Astro inlines its small stylesheet.
let library: Promise<typeof GLightboxFactory> | undefined;
const loadLibrary = () => library ??= import("glightbox")
  .then(module => module.default).catch(error => { library = undefined; throw error; });

for (const media of document.querySelectorAll<HTMLElement>("[data-product-media]")) {
  let viewer: ReturnType<typeof GLightboxFactory> | undefined;
  let opener: HTMLAnchorElement | null = null;
  let opening = false;
  let background: HTMLElement[] = [];

  const trapFocus = (event: KeyboardEvent) => {
    if (event.key !== "Tab") return;
    const modal = document.querySelector<HTMLElement>("#glightbox-body");
    if (!modal) return;
    const controls = [...modal.querySelectorAll<HTMLElement>("button, a[href], iframe")]
      .filter(node => node.getClientRects().length && !node.classList.contains("disabled"));
    event.preventDefault();
    event.stopImmediatePropagation();
    const index = controls.indexOf(document.activeElement as HTMLElement);
    controls[(index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length]?.focus();
  };

  media.addEventListener("click", async event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("[data-product-photo], [data-product-video]") : null;
    if (!link) return;
    event.preventDefault();
    if (opening || document.querySelector("#glightbox-body")) return;
    opening = true;
    media.setAttribute("aria-busy", "true");
    opener = link;

    try {
      const GLightbox = await loadLibrary();
      if (!viewer) {
        const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
        viewer = GLightbox({
          elements: [],
          skin: "isvo",
          openEffect: reducedMotion ? "none" : "fade",
          closeEffect: reducedMotion ? "none" : "fade",
          slideEffect: reducedMotion ? "none" : "slide",
          touchNavigation: true,
          keyboardNavigation: true,
          zoomable: true,
          loop: true,
          preload: false,
          moreLength: 0,
          lightboxHTML: `<div id="glightbox-body" class="glightbox-container" tabindex="-1" role="dialog" aria-modal="true" aria-label="Просмотр фото и видео оборудования">
            <div class="gloader visible"></div><div class="goverlay"></div>
            <div class="gcontainer"><div id="glightbox-slider" class="gslider"></div>
              <button class="gclose gbtn" aria-label="Закрыть просмотр" data-taborder="3">{closeSVG}</button>
              <button class="gprev gbtn" aria-label="Предыдущее фото" data-taborder="2">{prevSVG}</button>
              <button class="gnext gbtn" aria-label="Следующее фото" data-taborder="1">{nextSVG}</button>
            </div></div>`,
          slideHTML: `<div class="gslide"><div class="gslide-inner-content"><div class="ginner-container">
            <div class="gslide-media"></div><div class="gslide-description"><div class="gdesc-inner">
              <p class="gslide-title"></p><div class="gslide-desc"></div>
            </div></div></div></div></div>`,
        });
        viewer.on("open", () => {
          const modal = document.querySelector<HTMLElement>("#glightbox-body")!;
          background = [...document.body.children].filter((node): node is HTMLElement => node instanceof HTMLElement && node !== modal && !node.inert);
          background.forEach(node => { node.inert = true; });
          window.addEventListener("keydown", trapFocus, true);
          modal.querySelector<HTMLButtonElement>(".gclose")?.focus({ preventScroll: true });
        });
        viewer.on("close", () => {
          background.forEach(node => { node.inert = false; });
          background = [];
          window.removeEventListener("keydown", trapFocus, true);
          opener?.focus({ preventScroll: true });
        });
      }

      const isVideo = link.hasAttribute("data-product-video");
      if (isVideo) {
        // Load the manufacturer's RUTUBE player only after an explicit click.
        // The inline slide and its iframe are removed when the viewer closes.
        const content = document.createElement("div");
        content.className = "product-lightbox-video";
        const frame = document.createElement("iframe");
        frame.src = `https://rutube.ru/play/embed/${link.dataset.videoId}?autoplay=true`;
        frame.title = link.dataset.mediaTitle ?? "Видео об оборудовании";
        frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        frame.allowFullscreen = true;
        frame.referrerPolicy = "strict-origin-when-cross-origin";
        content.append(frame);
        const directLink = document.createElement("a");
        directLink.className = "product-lightbox-video__link";
        directLink.href = link.href;
        directLink.target = "_blank";
        directLink.rel = "noopener noreferrer";
        directLink.textContent = "Смотреть на RUTUBE ↗";
        directLink.setAttribute("aria-label", "Смотреть видео на RUTUBE в новой вкладке");
        content.append(directLink);
        viewer.setElements([{ type: "inline", content, title: link.dataset.mediaTitle, width: "960px", height: "auto" }]);
      } else {
        const photos = [...media.querySelectorAll<HTMLAnchorElement>("[data-product-photo]")];
        viewer.setElements(photos.map((photo, index) => ({ href: photo.href, type: "image", alt: photo.dataset.mediaTitle, title: `${index + 1} / ${photos.length} · ${photo.dataset.mediaTitle}` })));
      }
      link.blur();
      const index = isVideo ? 0 : [...media.querySelectorAll("[data-product-photo]")].indexOf(link);
      viewer.openAt(index);
    } catch (error) {
      console.error("Не удалось открыть просмотр медиа", error);
      window.location.assign(link.href);
    } finally {
      opening = false;
      media.removeAttribute("aria-busy");
    }
  });
}

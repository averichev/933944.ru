function initGallery(gallery: HTMLElement) {
  const first = gallery.querySelector<HTMLPictureElement>("picture");
  const templates = [...gallery.querySelectorAll<HTMLTemplateElement>("template[data-hero-slide]")];
  if (!first || !templates.length) return;

  const pictures: (HTMLPictureElement | undefined)[] = [first];
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = window.matchMedia("(min-width: 768px)");
  const holdMs = Number(gallery.dataset.hold);
  const fadeMs = Number(gallery.dataset.fade);
  let current = first;
  let candidate = 0;
  let visible = false;
  let busy = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let fade: Animation | undefined;

  const canRun = () => desktop.matches && visible && !document.hidden && !motion.matches;
  const schedule = () => {
    clearTimeout(timer);
    if (canRun() && !busy) timer = setTimeout(advance, holdMs);
  };

  async function advance() {
    if (!canRun()) return;
    busy = true;
    candidate = (candidate + 1) % (templates.length + 1);
    let next = pictures[candidate];
    if (!next) {
      next = templates[candidate - 1].content.firstElementChild!.cloneNode(true) as HTMLPictureElement;
      pictures[candidate] = next;
      gallery.append(next);
    }

    try {
      // Only mount the next image when needed. Keep the current one fully visible
      // until the replacement is downloaded and decoded, including on slow networks.
      await next.querySelector("img")!.decode();
      if (!canRun() || next === current) return;
      next.classList.add("is-incoming");
      fade = next.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: fadeMs,
        easing: "ease-in-out",
        fill: "forwards",
      });
      await fade.finished;
      current.classList.remove("is-active");
      current.setAttribute("aria-hidden", "true");
      next.classList.add("is-active");
      next.removeAttribute("aria-hidden");
      current = next;
    } catch {
      // A failed download or a cancelled animation must never blank the background.
    } finally {
      fade?.cancel();
      fade = undefined;
      next.classList.remove("is-incoming");
      busy = false;
      schedule();
    }
  }

  function syncPlayback() {
    if (!canRun()) fade?.cancel();
    // Returning from a desktop layout must restore the same static mobile photo.
    if (!desktop.matches) {
      current.classList.remove("is-active");
      current.setAttribute("aria-hidden", "true");
      first!.classList.add("is-active");
      first!.removeAttribute("aria-hidden");
      current = first!;
      candidate = 0;
    }
    schedule();
  }

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    syncPlayback();
  }).observe(gallery);
  document.addEventListener("visibilitychange", syncPlayback);
  motion.addEventListener("change", syncPlayback);
  desktop.addEventListener("change", syncPlayback);
}

document.querySelectorAll<HTMLElement>("[data-hero-gallery]").forEach(initGallery);

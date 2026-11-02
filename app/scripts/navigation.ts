export type InquiryDetail = { source: string; intent: "proposal" | "selection" };

declare global {
  interface DocumentEventMap { "isvo:inquiry": CustomEvent<InquiryDetail> }
}

const menu = document.querySelector<HTMLDialogElement>("#mobile-menu")!;
const inquiry = document.querySelector<HTMLDialogElement>(".inquiry-dialog")!;
const menuToggle = document.querySelector<HTMLButtonElement>(".menu-toggle")!;
const inquiryTitle = document.querySelector<HTMLElement>("#inquiry-title")!;
let returnFocus: HTMLElement | null = null;

function closeMenu() {
  menu.close();
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  menu.showModal();
  menuToggle.setAttribute("aria-expanded", "true");
});
menu.addEventListener("close", () => menuToggle.setAttribute("aria-expanded", "false"));
inquiry.addEventListener("close", () => returnFocus?.focus({ preventScroll: true }));

for (const dialog of [menu, inquiry]) {
  dialog.querySelector<HTMLButtonElement>("[data-close-dialog]")!.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
}

document.addEventListener("click", (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const clicked = event.target instanceof Element ? event.target : null;
  const target = clicked?.closest<HTMLElement>("[data-inquiry], [data-equipment-selector]");
  if (!target) {
    if (clicked?.closest("a") && menu.contains(clicked)) closeMenu();
    return;
  }
  event.preventDefault();
  const selection = target.hasAttribute("data-equipment-selector");
  if (selection) {
    const section = document.getElementById("equipment-selector");
    if (section) {
      closeMenu();
      section.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
      if (!section.hasAttribute("tabindex")) section.setAttribute("tabindex", "-1");
      section.focus({ preventScroll: true });
      return;
    }
  }
  const intent = selection ? "selection" : "proposal";
  returnFocus = menu.contains(target) ? menuToggle : target;
  closeMenu();
  // A future form can cancel this event to replace the contact dialog.
  const useFallback = document.dispatchEvent(new CustomEvent<InquiryDetail>("isvo:inquiry", {
    cancelable: true,
    detail: { source: target.dataset.inquiry ?? "hero-selector", intent },
  }));
  if (useFallback) {
    inquiryTitle.textContent = selection ? "Подберём технику под вашу задачу" : "Обсудим ваше хозяйство";
    inquiry.showModal();
  }
});

matchMedia("(min-width: 768px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

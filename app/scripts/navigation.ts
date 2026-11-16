export type InquiryDetail = { source: string; intent: "proposal" | "selection"; product?: string };

declare global {
  interface DocumentEventMap { "isvo:inquiry": CustomEvent<InquiryDetail> }
}

const menu = document.querySelector<HTMLDialogElement>("#mobile-menu")!;
const inquiry = document.querySelector<HTMLDialogElement>(".inquiry-dialog")!;
const menuToggle = document.querySelector<HTMLButtonElement>(".menu-toggle")!;
const inquiryTitle = document.querySelector<HTMLElement>("#inquiry-title")!;
const inquiryDescription = document.querySelector<HTMLElement>("#inquiry-description")!;
const inquiryEmail = document.querySelector<HTMLAnchorElement>("[data-inquiry-email]")!;
const defaultEmailHref = inquiryEmail.href;
let returnFocus: HTMLElement | null = null;

function restoreVisibleFocus(target: HTMLElement) {
  // The opener can disappear when the window crosses a navigation breakpoint.
  const fallback = menuToggle.getClientRects().length ? menuToggle :
    document.querySelector<HTMLElement>(".site-navigation .navigation-links a[href]") ??
    document.querySelector<HTMLElement>(".site-navigation .brand");
  (target.getClientRects().length ? target : fallback)?.focus({ preventScroll: true });
}

function closeMenu() {
  menu.close();
  menu.classList.remove("is-closing");
  menuToggle.setAttribute("aria-expanded", "false");
}

function dismissDialog(dialog: HTMLDialogElement) {
  if (!dialog.open || dialog.classList.contains("is-closing")) return;
  dialog.classList.add("is-closing");
  // CSS controls timing; reduced motion produces no animations and closes immediately.
  void Promise.allSettled(dialog.getAnimations().map((animation) => animation.finished)).then(() => {
    if (!dialog.classList.contains("is-closing")) return;
    dialog.close();
    // Safari does not always focus a tapped opener, so native restoration can miss it.
    if (dialog === menu) restoreVisibleFocus(menuToggle);
  });
}

menuToggle.addEventListener("click", () => {
  menu.showModal();
  menuToggle.setAttribute("aria-expanded", "true");
});
menu.addEventListener("close", () => {
  menuToggle.setAttribute("aria-expanded", "false");
});
inquiry.addEventListener("close", () => { if (returnFocus) restoreVisibleFocus(returnFocus); });

for (const dialog of [menu, inquiry]) {
  const dismiss = () => dismissDialog(dialog);
  dialog.addEventListener("close", () => dialog.classList.remove("is-closing"));
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    dismiss();
  });
  dialog.querySelector<HTMLButtonElement>("[data-close-dialog]")!.addEventListener("click", dismiss);
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dismiss();
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
  const product = target.dataset.inquiryProduct;
  const useFallback = document.dispatchEvent(new CustomEvent<InquiryDetail>("isvo:inquiry", {
    cancelable: true,
    detail: { source: target.dataset.inquiry ?? "hero-selector", intent, product },
  }));
  if (useFallback) {
    inquiryTitle.textContent = selection ? "Подберём технику под вашу задачу" : "Получить предложение";
    inquiryDescription.textContent = product
      ? `Вас интересует ${product}. Наши специалисты уточнят комплектацию и подготовят предложение. Позвоните нам или отправьте письмо.`
      : "Наши специалисты помогут подобрать оборудование и комплектацию. Позвоните нам или отправьте письмо с описанием задачи.";
    const email = new URL(defaultEmailHref);
    if (product) email.search = `?subject=${encodeURIComponent(`Запрос предложения — ${product}`)}`;
    inquiryEmail.href = email.href;
    inquiry.showModal();
  }
});

matchMedia("(min-width: 768px)").addEventListener("change", (event) => {
  if (event.matches && menu.open) {
    closeMenu();
    restoreVisibleFocus(menuToggle);
  }
});

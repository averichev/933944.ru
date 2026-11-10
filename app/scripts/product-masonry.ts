for (const container of document.querySelectorAll<HTMLElement>("[data-product-thumbnails]")) {
  // The CSS column layout remains usable before initialization and without JavaScript.
  void import("masonry-layout").then(({ default: Masonry }) => {
    container.classList.add("is-masonry");
    const grid = new Masonry(container, {
      itemSelector: ".product-media__photo",
      columnWidth: ".product-media__photo",
      gutter: 10,
      percentPosition: true,
      transitionDuration: 0,
    });
    // Intrinsic image dimensions reserve space; remeasure after loading, including lazy images.
    for (const image of container.querySelectorAll("img")) {
      if (!image.complete) image.addEventListener("load", () => grid.layout?.(), { once: true });
    }
  }).catch(error => {
    container.classList.remove("is-masonry");
    console.error("Не удалось включить раскладку фотографий", error);
  });
}

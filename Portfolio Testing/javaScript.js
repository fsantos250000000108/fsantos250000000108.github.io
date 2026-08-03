(() => {
  // Scoped slider handler — finds the slider + value display inside
  // the .br-frm wrapper only, so multiple demos can render on the
  // same page without colliding on element IDs.
  const root = document.querySelector(".br-frm");
  if (!root) return;
  const slider = root.querySelector("[data-br-frm-slider]");
  const valEl = root.querySelector("[data-br-frm-slider-val]");
  if (!slider || !valEl) return;
  function paint() {
    const dollars = Math.round(slider.value * 1000);
    valEl.textContent = "$" + dollars.toLocaleString();
  }
  slider.addEventListener("input", paint);
  paint();
})();

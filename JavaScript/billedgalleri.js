// billedgalleri.js
// Simpelt modal-galleri til sal-billederne

document.addEventListener("DOMContentLoaded", () => {
  // DOM: find alle sal-billederne
  const galleryImages = Array.from(
    document.querySelectorAll(".locus__images img")
  );

  // Hvis der ikke er billeder, gør ingenting (kontrolstruktur + debugging-sikkerhed)
  if (galleryImages.length === 0) {
    console.log("Ingen galleri-billeder fundet");
    return;
  }

  // Variabel + type (let) – holder styr på hvilket billede vi er på
  let currentIndex = 0;

  // Opret modal-HTML via JS (DOM-manipulation)
  const modal = document.createElement("div");
  modal.classList.add("image-modal");
  modal.innerHTML = `
    <div class="image-modal__overlay"></div>
    <div class="image-modal__content">
      <button class="image-modal__close" aria-label="Luk galleri">&times;</button>
      <img class="image-modal__img" src="" alt="">
      <button class="image-modal__arrow image-modal__arrow--prev" aria-label="Forrige billede">&#10094;</button>
      <button class="image-modal__arrow image-modal__arrow--next" aria-label="Næste billede">&#10095;</button>
    </div>
  `;
  document.body.appendChild(modal);

  const overlay = modal.querySelector(".image-modal__overlay");
  const closeBtn = modal.querySelector(".image-modal__close");
  const modalImg = modal.querySelector(".image-modal__img");
  const prevBtn = modal.querySelector(".image-modal__arrow--prev");
  const nextBtn = modal.querySelector(".image-modal__arrow--next");

  // Funktion: viser det billede, der hører til currentIndex
  function showImage(index) {
    // operatorer + kontrolstruktur
    currentIndex = (index + galleryImages.length) % galleryImages.length;

    const img = galleryImages[currentIndex];
    modalImg.src = img.src;
    modalImg.alt = img.alt || "Billede fra salen Locus";
  }

  // Funktion: åbner modalen
  function openModal(index) {
    showImage(index);
    modal.classList.add("image-modal--visible");
  }

  // Funktion: lukker modalen
  function closeModal() {
    modal.classList.remove("image-modal--visible");
  }

  // Funktion: skift billede (next/prev)
  function changeImage(step) {
    showImage(currentIndex + step);
  }

  // EVENTS: klik på sal-billederne åbner modalen
  galleryImages.forEach((img, index) => {
    img.style.cursor = "pointer"; // lille UX-detalje

    img.addEventListener("click", () => {
      openModal(index);
    });
  });

  // EVENTS: luk via overlay + kryds
  overlay.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);

  // EVENTS: pilene skifter billede
  prevBtn.addEventListener("click", () => changeImage(-1));
  nextBtn.addEventListener("click", () => changeImage(1));

  // EVENTS: tastaturstyring (ESC + piletaster)
  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("image-modal--visible")) return;

    if (event.key === "Escape") {
      closeModal();
    } else if (event.key === "ArrowLeft") {
      changeImage(-1);
    } else if (event.key === "ArrowRight") {
      changeImage(1);
    }
  });

  console.log("Modal-galleri er sat op med", galleryImages.length, "billeder");
});

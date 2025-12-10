// gallery-modal.js
// Simpelt billedgalleri med modal til Hesselgaard (ligger i ekstern fil og kan versionsstyres i git/github)

document.addEventListener("DOMContentLoaded", () => {
  // DOMContentLoaded bruges så koden først kører, når HTML'en er klar

  // DOM: lle billeder i galleriet
  const galleryImages = document.querySelectorAll(".locus__images img");
  const body = document.body;

  // Array + objekter
  const imageArray = Array.from(galleryImages).map((img) => {
    return {
      src: img.src,
      alt: img.alt || "Billede fra Salen Locus",
    };
  });

  // let bruges i stedet for var (let er block scoped, var er function scoped)
  let currentIndex = 0; 

  // modalens DOM-struktur 
  const modal = document.createElement("div");
  modal.classList.add("image-modal");
  modal.innerHTML = `
    <div class="image-modal__overlay"></div>
    <div class="image-modal__content">
      <button class="image-modal__close" aria-label="Luk galleri">&times;</button>
      <img class="image-modal__img" src="" alt="">
      <button class="image-modal__arrow image-modal__arrow--prev" aria-label="Forrige billede">&#8592;</button>
      <button class="image-modal__arrow image-modal__arrow--next" aria-label="Næste billede">&#8594;</button>
    </div>
  `;
  body.appendChild(modal);

  const modalImg = modal.querySelector(".image-modal__img");
  const closeBtn = modal.querySelector(".image-modal__close");
  const overlay = modal.querySelector(".image-modal__overlay");
  const prevBtn = modal.querySelector(".image-modal__arrow--prev");
  const nextBtn = modal.querySelector(".image-modal__arrow--next");

  // Funktion (function declaration) til at åbne modal
  function openModal(index) {
    // if-else: tjek at index er gyldigt
    if (index < 0 || index >= imageArray.length) {
      console.warn("Index uden for arrayet"); // fejlfinding/debugging
      return;
    }

    currentIndex = index;
    const imageObject = imageArray[currentIndex]; // objekt med src/alt

    modalImg.src = imageObject.src;
    modalImg.alt = imageObject.alt;
    modal.classList.add("image-modal--visible");
  }

  // Funktion (arrow function) til at lukke modal
  const closeModal = () => {
    modal.classList.remove("image-modal--visible");
  };

  // Funktion til at skifte billede (viser også operatorer)
  function showNext(step) {
    let newIndex = currentIndex + step; // + er en aritmetisk operator

    if (newIndex < 0) {
      newIndex = imageArray.length - 1;
    } else if (newIndex >= imageArray.length) {
      newIndex = 0;
    }

    openModal(newIndex);
  }

  // Loop: tilføj click-event på alle billeder i galleriet
  imageArray.forEach((imageObj, index) => {
    // index og imageObj lever kun inde i denne callback (variable scope)
    galleryImages[index].addEventListener("click", () => {
      openModal(index);
    });
  });

  // Events på modal-elementer
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  prevBtn.addEventListener("click", () => showNext(-1));
  nextBtn.addEventListener("click", () => showNext(1));

  // Keyboard events til accessibility
  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("image-modal--visible")) return;

    if (event.key === "Escape") {
      closeModal();
    } else if (event.key === "ArrowRight") {
      showNext(1);
    } else if (event.key === "ArrowLeft") {
      showNext(-1);
    }
  });

  // Simpel debugging-hjælp
  console.log(
    "Galleri-modal er initialiseret med",
    imageArray.length,
    "billeder"
  );
});
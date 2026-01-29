const cards = document.querySelectorAll(".card");
const modal = document.getElementById("cardModal");
const closeModal = document.getElementById("closeModal");
const overlay = document.querySelector(".modal__overlay");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    modal.classList.add("modal--active");
  });
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("modal--active");
});

// (Opcional) cerrar modal haciendo click en el overlay
// overlay.addEventListener("click", () => {
//   modal.classList.remove("modal--active");
// });

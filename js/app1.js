// const modal = document.getElementById("cardModal");
// const modalTitle = document.getElementById("modalTitle");
// const modalDescription = document.getElementById("modalDescription");
// const overlay = modal.querySelector(".modal__overlay");

// document.addEventListener("click", (e) => {
//   const card = e.target.closest(".card");
//   if (!card) return;

//   // modalTitle.textContent = card.title;
//   // modalDescription.textContent = card.dataset.description;

//   modal.classList.add("active");
// });

// // Cerrar modal
// overlay.addEventListener("click", () => {
//   modal.classList.remove("active");
// });

// console.log("Conectado");

// MODAL CLOSE
const modal = document.getElementById("cardModal");

document.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  modal.classList.add("active");
  // if (card && card.dataset.modal){
    // modal.classList.add("modal--open");
  // }
  if (e.target.closest(".closeModal")){
    e.target.closest(".modal").classList.remove("modal--open")
  }
});
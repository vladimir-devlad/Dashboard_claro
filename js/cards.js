const container = document.getElementById("cardsContainer");
const modal = document.getElementById("cardModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalButton = modal.querySelector(".btn--primary");
const closeModal = document.getElementById("closeModal");
const overlay = document.querySelector(".modal__overlay");

fetch("json/data.json")
  .then((response) => response.json())
  .then((data) => {
    container.innerHTML = "";
    data.forEach((item) => createCard(item));
  })
  .catch((error) => console.error("Error cargando JSON:", error));

function createCard(item) {
  const card = document.createElement("article");
  card.classList.add("card");

  const keywordsHTML = item.keywords
    .split(",")
    .map((k) => `<span class="card__tag">${k.trim()}</span>`)
    .join("");

  card.innerHTML = `
    <figure class="card__media">
      <img src="${item["url-portada"]}" alt="${item.title}" class="card__image">
    </figure>

    <div class="card__content">
      <h3 class="card__title">${item.title}</h3>
      <div class="card__tags">${keywordsHTML}</div>
    </div>
  `;

  // Abrir modal con data
  card.addEventListener("click", () => {
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;
    modalButton.href = item["url-dashboard"];

    modal.classList.add("modal--active");
  });

  container.appendChild(card);
}

// Cerrar modal
closeModal.addEventListener("click", () => {
  modal.classList.remove("modal--active");
});

overlay.addEventListener("click", () => {
  modal.classList.remove("modal--active");
});

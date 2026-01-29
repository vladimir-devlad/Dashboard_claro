// =====================
// ELEMENTOS DOM
// =====================
const container = document.getElementById("cardsContainer");

const modal = document.getElementById("cardModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalButton = modal.querySelector(".btn--primary");
const closeModal = document.getElementById("closeModal");
const overlay = document.querySelector(".modal__overlay");

const sidebarList = document.getElementById("sidebarList");

const categoryTitle = document.querySelector(".cards-powerbi__title");


let allData = [];

// =====================
// FETCH DATA
// =====================
fetch("json/data.json")
  .then((response) => response.json())
  .then((data) => {
    allData = data;
    renderSidebar(data);
    renderCards(data); // mostrar todo al inicio
  })
  .catch((error) => console.error("Error cargando JSON:", error));

// =====================
// SIDEBAR
// =====================
function renderSidebar(data) {
  sidebarList.innerHTML = "";

  
  const categories = [...new Set(data.map((item) => item.Herramienta))];

  categories.forEach((Herramienta, index) => {
    const li = document.createElement("li");
    li.className = "dashboard__sidebar-item";

    li.innerHTML = `
      <a href="#" class="dashboard__sidebar-link ${index === 0 ? "dashboard__sidebar-link--active" : ""}">
        <span class="dashboard__sidebar-icon"></span>
        <span class="dashboard__sidebar-label">${Herramienta}</span>
      </a>
    `;

    li.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveLink(li);
      filterByCategory(Herramienta);
      categoryTitle.textContent = Herramienta;
    });

    sidebarList.appendChild(li);
  });
}

function setActiveLink(activeItem) {
  document
    .querySelectorAll(".dashboard__sidebar-link")
    .forEach((link) =>
      link.classList.remove("dashboard__sidebar-link--active"),
    );

  activeItem
    .querySelector(".dashboard__sidebar-link")
    .classList.add("dashboard__sidebar-link--active");
}

// =====================
// CARDS
// =====================

function filterByCategory(Herramienta) {
  const filtered = allData.filter(item => item.Herramienta === Herramienta);
  categoryTitle.textContent = Herramienta; // 👈 actualiza el H2
  renderCards(filtered);
}

function renderCards(data) {
  container.innerHTML = "";
  data.forEach((item) => createCard(item));
}

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

  card.addEventListener("click", () => {
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;
    modalButton.href = item["url-dashboard"];
    modal.classList.add("modal--active");
  });

  container.appendChild(card);
}

// =====================
// MODAL
// =====================
closeModal.addEventListener("click", () => {
  modal.classList.remove("modal--active");
});

overlay.addEventListener("click", () => {
  modal.classList.remove("modal--active");
});

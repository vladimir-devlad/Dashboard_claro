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
const modalButtons = modal.querySelectorAll("button, a");

const sidebarList = document.getElementById("sidebarList");
const categoryTitle = document.querySelector(".cards-powerbi__title");
const searchInput = document.getElementById("searchInput");

// =====================
// ESTADO
// =====================
let allData = [];
let activeCategory = null;

// =====================
// FETCH DATA
// =====================
fetch("json/data.json")
  .then((response) => response.json())
  .then((data) => {
    allData = data;
    renderSidebar(data);

    if (data.length > 0) {
      const firstCategory = data[0].stream;
      filterByCategory(firstCategory);
    }
  })
  .catch((error) => console.error("Error cargando JSON:", error));

// =====================
// SIDEBAR
// =====================
function renderSidebar(data) {
  sidebarList.innerHTML = "";

  const categories = [...new Set(data.map((item) => item.stream))];

  categories.forEach((stream, index) => {
    const li = document.createElement("li");
    li.className = "dashboard__sidebar-item";

    li.innerHTML = `
      <a href="#" class="dashboard__sidebar-link ${
        index === 0 ? "dashboard__sidebar-link--active" : ""
      }">
        <span class="dashboard__sidebar-icon"></span>
        <span class="dashboard__sidebar-label">${stream}</span>
      </a>
    `;

    li.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveLink(li);
      filterByCategory(stream);
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
// CARDS + FILTROS
// =====================
function filterByCategory(stream) {
  activeCategory = stream;

  searchInput.value = "";

  const filtered = allData.filter((item) => item.stream === stream);

  categoryTitle.textContent = stream;
  renderCards(filtered);
}

function renderCards(data) {
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `<p class="cards-powerbi__empty">No hay resultados</p>`;
    return;
  }

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
      <i class="card__eye ph ph-eye"></i>
    </figure>

    <div class="card__content">
      <div class="card__information">
        <h3 class="card__title">${item.title}</h3>
        <p class="card__creator" >por <span id="cardCreator">Alan Medina</span></p>
      </div>
      
      <span class="card__info" data-tooltip="Más información">
  <i class="card__info ph ph-info"></i>
</span>
      
    </div>
  `;

  card.addEventListener("click", () => {
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;
    // modalButton.href = item["url-tablero"];
    // modal.classList.add("modal--active");
    const urlTablero = item["url-tablero"];
    if (!urlTablero || urlTablero.trim() === "") {
    // 🔒 DESHABILITAR BOTÓN
    modalButton.removeAttribute("href");
    modalButton.classList.add("btn--disabled");
    modalButton.setAttribute("aria-disabled", "true");
    modalButton.style.pointerEvents = "none";
  } else {
    // ✅ HABILITAR BOTÓN
    modalButton.href = urlTablero;
    modalButton.setAttribute("target", "_blank");
    modalButton.classList.remove("btn--disabled");
    modalButton.removeAttribute("aria-disabled");
    modalButton.style.pointerEvents = "auto";
  }

  modal.classList.add("modal--active");
});

  // });

  container.appendChild(card);
}

// =====================
// SEARCH (solo categoría activa)
// =====================
searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();

  if (!activeCategory) return;

  const filtered = allData.filter(
    (item) =>
      item.stream === activeCategory && item.title.toLowerCase().includes(term),
  );

  renderCards(filtered);
});

// =====================
// MODAL
// =====================
closeModal.addEventListener("click", () => {
  modal.classList.remove("modal--active");
});

overlay.addEventListener("click", () => {
  modal.classList.remove("modal--active");
});

modalButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.remove("modal--active");
  });
});

// (opcional UX)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("modal--active");
  }
});

const sidebar = document.getElementById("dashboardSidebar");
const toggle = sidebar.querySelector(".dashboard__sidebar-toggle");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("dashboard__sidebar--open");
});

function renderSidebar(data) {
  sidebarList.innerHTML = "";

  const categories = [...new Set(data.map((item) => item.stream))];

  categories.forEach((stream, index) => {
    const li = document.createElement("li");
    li.className = "dashboard__sidebar-item";

    li.innerHTML = `
      <a href="#" class="dashboard__sidebar-link ${
        index === 0 ? "dashboard__sidebar-link--active" : ""
      }">
        <span class="dashboard__sidebar-icon"></span>
        <span class="dashboard__sidebar-label">${stream}</span>
      </a>
    `;

    const link = li.querySelector(".dashboard__sidebar-link");

    // Listener click en cada link
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Activar categoría
      setActiveLink(li);
      filterByCategory(stream);

      // Cerrar menú en mobile
      if (window.innerWidth < 1024) {
        sidebar.classList.remove("dashboard__sidebar--open");
      }
    });

    sidebarList.appendChild(li);
  });
}

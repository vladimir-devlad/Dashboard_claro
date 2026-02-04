import { store } from "../store/dashboardStore.js";

const sidebarList = document.getElementById("sidebarList");

export function renderSidebar() {
  console.log("renderSidebar → data:", store.data);

  sidebarList.innerHTML = "";

  const streams = [...new Set(store.data.map(item => item.stream))]
    .sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }));

  streams.forEach(stream => {
    const li = document.createElement("li");
    li.className = "dashboard__sidebar-item";

    li.innerHTML = `
      <a href="#" class="dashboard__sidebar-link">
        <span class="dashboard__sidebar-label">${stream}</span>
      </a>
    `;

    sidebarList.appendChild(li);
  });
}

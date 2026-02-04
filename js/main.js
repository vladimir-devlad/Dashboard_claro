import { loadDashboardData } from "./services/dataService.js";
import { store } from "./store/dashboardStore.js";
import { renderSidebar } from "./components/sidebar.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("MAIN cargado");

  store.data = await loadDashboardData();
  console.log("DATA:", store.data);

  renderSidebar();
});

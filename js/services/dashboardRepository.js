import { fetchDashboards } from "./dataService.js";
import { mapDashboard } from "../store/dashboardModel.js";

let cache = [];

export async function getDashboards() {
  if (cache.length) return cache;

  const rawData = await fetchDashboards();
  cache = rawData.map(mapDashboard);

  return cache;
}

export async function getDashboardByCodigo(codigo) {
  const dashboards = await getDashboards();
  return dashboards.find(d => d.codigo === codigo);
}

export async function getDashboardsByStream(stream) {
  const dashboards = await getDashboards();
  return dashboards.filter(d => d.stream === stream);
}

export async function getStreams() {
  const dashboards = await getDashboards();

  const streams = dashboards
    .map(d => d.stream)
    .filter(Boolean);

  // eliminar duplicados
  const uniqueStreams = [...new Set(streams)];

  // ordenar alfabéticamente
  return uniqueStreams.sort((a, b) =>
    a.localeCompare(b, "es", { sensitivity: "base" })
  );
}


export async function loadDashboardData() {
  const res = await fetch("json/data.json");
  return await res.json();
}
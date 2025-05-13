import React from "react";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
//id_14
// Función para obtener métricas globales desde el backend (GET /metrics/overview).
// Esta función debe ejecutarse al montar el componente del dashboard.
// Mostrar métricas como:
// - Habilidades dominantes (gráfico de barras)
// - Empleados por proyecto (gráfico circular)
// - Etapas de carrera profesional (línea o embudo)
// Implementar filtros dinámicos por departamento o equipo.
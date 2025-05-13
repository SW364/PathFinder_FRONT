import React from "react";
import {UserView} from "../components/UserView";
import { TfsView } from "../components/TfsView";
import { ManagerView } from "../components/ManagerView";


export default function Assignation() {
  const level = localStorage.getItem("userLevel");
  //const token = localStorage.getItem("authToken");
  return (
    <div>
      {level === "Usuario" && <UserView />}
      {level === "TFS" && <TfsView />}
      {level === "Manager" && <ManagerView />}
    </div>
  );
}
// id_12
// Desde el rol de staff
// Función para obtener roles sugeridos desde el backend (GET /suggested-roles).
// Este llamado debe realizarse cuando el componente se monta y mostrar la lista en la interfaz.
// Mostrar los roles sugeridos
// Esta información debe presentarse de forma clara al usuario para ayudarle a tomar decisiones
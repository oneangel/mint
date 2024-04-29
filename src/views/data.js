import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";

const today = new Date();

export const animals = [
  {
    label: "Esta semana",
    value: "esta-semana",
    startDate: startOfWeek(today),
    endDate: endOfWeek(today)
  },
  {
    label: "Este mes",
    value: "este-mes",
    startDate: startOfMonth(today),
    endDate: endOfMonth(today)
  },
  {
    label: "Un año",
    value: "un-ano",
    startDate: startOfYear(today),
    endDate: endOfYear(today)
  },
];

export const columns = [
  {
    key: "createdAt",
    label: "Fecha",
  },
  {
    key: "type",
    label: "Tipo",
  },
  {
    key: "description",
    label: "Descripción",
  },
  {
    key: "amount",
    label: "Cantidad",
  },
  {
    key: "acciones",
    label: "Acciones",
  },
];

export const columns2 = [
  {
    key: "finalDate",
    label: "Fecha Limite",
  },
  {
    key: "description",
    label: "Descripción",
  },
  {
    key: "amountGoal",
    label: "Meta",
  },
  {
    key: "state",
    label: "Estado",
  },
  {
    key: "acciones",
    label: "Acciones",
  },
];

export const inputs = [
  {
    type: "text",
    label: "Descripción",
    name: "description",
  },
  {
    type: "number",
    label: "Cantidad",
    name: "amount",
  },
  {
    type: "date",
    label: "Fecha",
    name: "createdAt",
  },
];

export const inputsAdd = [
  {
    type: "number",
    label: "Cantidad",
    name: "amount",
  },
];

export const inputs2 = [
  {
    type: "text",
    label: "Descripción",
    name: "description",
  },
  {
    type: "number",
    label: "Cantidad",
    name: "amountGoal",
  },
  {
    type: "date",
    label: "Fecha",
    name: "finalDate",
  },
];
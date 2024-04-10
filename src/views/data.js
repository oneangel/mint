import React from "react";
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
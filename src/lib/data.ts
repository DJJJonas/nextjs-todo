"use client";

import { type Todo } from "./definitions";

export function getTodos(): Todo[] | null {
  return localStorage.getItem("todos") as Todo[] | null;
}

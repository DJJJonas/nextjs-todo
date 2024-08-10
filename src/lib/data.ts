"use client";

import { type Todo } from "./definitions";
import { uuidv4 } from "./utils";

export function addTodo(todo: Omit<Todo, "id">) {
  const todos = getTodos();
  //@ts-expect-error setting id
  todo.id = uuidv4();
  if (todos) {
    setTodos([...todos, todo as Todo]);
  } else {
    setTodos([todo as Todo]);
  }
  return todo as Todo;
}

export function getTodos(): Todo[] {
  const todos = localStorage.getItem("todos");
  return todos ? (JSON.parse(todos) as Todo[]) : [];
}

export function updateTodo(todo: Todo) {
  const todos = getTodos();
  const index = todos.findIndex((t) => t.id === todo.id);
  if (index === -1) {
    throw new Error("Todo not found");
  }
  todos[index] = { ...todos[index], ...todo };
  setTodos(todos);
}

export function deleteTodo(id: string) {
  const todos = getTodos();
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error("Todo not found");
  }
  todos.splice(index, 1);
  setTodos(todos);
}

export function setTodos(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

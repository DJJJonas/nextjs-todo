"use client";

import TodoList from "~/components/todo-list";
// import { getTodos } from "~/lib/data";
import { Todo } from "~/lib/definitions";

export default function HomePage() {
  const todos: Todo[] = [
    {
      id: 1,
      title: "Todo 1",
      completed: false,
      createdAt: new Date("2024-05-03T04:17:42.122Z"),
    },
    {
      id: 2,
      title: "Todo 2",
      completed: false,
      createdAt: new Date("2024-05-06T02:32:12.547Z"),
    },
  ];
  return <div>
    {todos && <TodoList todos={todos} />}
  </div>;
}

"use client";

import { ArrowDown } from "lucide-react";
import { useState } from "react";
import TodoList from "~/components/todo-list";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { addTodo, getTodos } from "~/lib/data";

export default function HomePage() {
  const [todos, setTodos] = useState(getTodos());
  const [itemInput, setItemInput] = useState("");

  function addTodoHandler(data: FormData) {
    const itemInput = data.get("item") as string;
    addTodo({
      order: todos.length + 1,
      title: itemInput.trimEnd(),
      completed: false,
      createdAt: new Date().toISOString(),
    });
    // Refresh list
    setTodos(getTodos());
    // Clear input
    setItemInput("");
  }

  return (
    <div className="flex grow flex-col py-6">
      {/* Item list section */}
      <div className="grow">
        {todos?.length ? (
          <TodoList todos={todos} setTodos={setTodos} />
        ) : (
          <div className="grid h-full grid-rows-2 items-end">
            <p className="text-center text-foreground opacity-40">
              Add a new item using the input below
            </p>
            <ArrowDown className="mx-auto mb-4 text-foreground opacity-40" />
          </div>
        )}
      </div>

      {/* Input section */}
      <form action={addTodoHandler} className="mx-4 flex gap-2">
        <Input
          name="item"
          autoComplete="off"
          value={itemInput}
          onChange={(e) => setItemInput(e.target.value.trimStart())}
          placeholder="Insert a new item"
        />
        <Button disabled={!itemInput}>Add</Button>
      </form>
    </div>
  );
}

import { type Todo } from "~/lib/definitions";
import { Checkbox } from "./ui/checkbox";

export default function TodoList({ todos }: Readonly<{ todos: Todo[] }>) {
  return (
    <ul className="mx-6">
      {todos.map((todo) => (
        <li key={todo.id} className="my-6 flex items-center gap-4 text-lg">
          <Checkbox />{" "}
          <div className="flex w-full items-center justify-between">
            <span className="text-lg">{todo.title}</span>
            <span className="text-xs opacity-40">
              {todo.createdAt.toUTCString()}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

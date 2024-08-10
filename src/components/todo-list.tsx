import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { deleteTodo, updateTodo } from "~/lib/data";
import { type Todo } from "~/lib/definitions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

export default function TodoList({
  todos,
  setTodos,
}: Readonly<{ todos: Todo[]; setTodos: (todos: Todo[]) => void }>) {
  const [toDelete, setToDelete] = useState<Todo | null>(null);

  function handleDelete() {
    if (toDelete === null) return;

    deleteTodo(toDelete.id);
    setTodos(todos.filter((t) => t.id !== toDelete.id));
    setToDelete(null);
  }

  function handleCheck(todo: Todo) {
    return () => {
      todo.completed = !todo.completed;
      updateTodo(todo);
      setTodos([...todos]);
    };
  }

  return (
    <AlertDialog>
      <ul className="mx-2 flex flex-col gap-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex select-none items-center gap-4 rounded px-2 text-lg transition-[hover] hover:bg-muted/20 active:bg-muted/10"
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={handleCheck(todo)}
            />
            <div className="grow">
              <p className="text-base leading-7 [&:not(:first-child)]:mt-6">
                {todo.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(todo.createdAt).toUTCString()}
              </p>
            </div>
            {/* Options menu */}
            <DropdownMenu>
              {/* Show options button */}
              <DropdownMenuTrigger asChild>
                <Button
                  className="h-8 w-8 rounded-full"
                  variant="ghost"
                  size="icon"
                >
                  <MoreHorizontal />
                  <span className="sr-only">Options</span>
                </Button>
              </DropdownMenuTrigger>

              {/* Options */}
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>

                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => setToDelete(todo)}
                  >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ))}

        {/* Dialog for deleting an item */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              The item &quot;{toDelete?.title}&quot; will be permanently
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </ul>
    </AlertDialog>
  );
}

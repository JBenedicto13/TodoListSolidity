"use client";

type TodoItemProps = {
  id: Number;
  name: string;
  completed: boolean;
  //   toggleTodo: (id: Number, completed: boolean) => void;
};

export function TodoItem({ id, name, completed }: TodoItemProps) {
  return (
    <li className="flex gap-1 items-center">
      <input
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={completed}
        // onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      <label className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500">
        {name}
      </label>
    </li>
  );
}

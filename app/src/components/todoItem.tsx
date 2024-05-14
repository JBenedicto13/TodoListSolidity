"use client";

import { ethers } from "ethers";
import { contractABI } from "@/contractABI/contractABI";
import { contractAddress } from "@/contractABI/contractAddress";

type TodoItemProps = {
  id: Number;
  name: string;
  completed: boolean;
  signer: any,
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean; // Add the isLoading prop
};

export function TodoItem({ id, name, completed, signer, setIsLoading, isLoading }: TodoItemProps) {
  async function toggleTodo(_id:any) {
    if (isLoading) {
      return;
    }
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    try {
      setIsLoading(true);
      await contract.toggleTask(_id+1);
      setIsLoading(false);
      console.log("Task toggled successfully");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }
  return (
    <li className="flex gap-1 items-center">
      <input
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={completed}
        onChange={(e) => toggleTodo(id)}
      />
      <label className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500">
        {name}
      </label>
    </li>
  );
}

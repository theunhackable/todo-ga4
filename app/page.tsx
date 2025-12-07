"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TodoInsertType } from "@/db/schemas";
import { TodoInputs } from "@/types";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function TodoContainer({ todo }: { todo: TodoInsertType }) {
  return (
    <div>
      <h3 className="text-xl font-medium"> {todo.title}</h3>
      <p className="text-gray-500"> {todo.description}</p>
    </div>
  );
}
export default function Home() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TodoInsertType>();

  const [todos, setTodos] = useState<TodoInsertType[]>();

  const onSubmit: SubmitHandler<TodoInsertType> = async (data) => {
    console.log(data);
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 201) {
      setTodos((prev) => {
        if (!prev) {
          return [data];
        }
        return [...prev, data];
      });
    }
  };
  return (
    <div className="mt-4 p-10 rounded-2xl min-h-screen items-center max-w-7xl mx-auto justify-center font-sans dark:bg-black">
      <h2 className="text-xl font-medium mb-4">Add Todo </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 space-x-2"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title*</Label>
          <Input {...register("title", { required: true })} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">
            Description <i className="text-gray-400">(optional)</i>
          </Label>
          <Textarea {...register("description", { required: false })} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <div className="my-10">
        {todos ? (
          todos.map((todo, i) => (
            <TodoContainer key={`todo-${i}`} todo={todo} />
          ))
        ) : (
          <p>You have no tasks.</p>
        )}
      </div>
    </div>
  );
}

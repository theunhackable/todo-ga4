"use client";
import { UserInsertType } from "@/db/schemas";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function SignUpPage() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserInsertType>();

  console.log("errors: ", errors);

  const onSubmit: SubmitHandler<UserInsertType> = async (data) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      toast.success("Signup success!");
      router.push("/login");
      return;
    }
    toast.error("Login failed.");
  };

  return (
    <main className="mx-auto my-10 max-w-7xl">
      <h1 className="font-bold text-2xl text-center">Login to your account.</h1>
      <div className="max-w-xl mx-auto my-10 p-10 rounded-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10 w-full"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name:</Label>
            <Input {...register("name")} placeholder="Jhon Wick" />

            {errors.name && <p> {errors.name.message} </p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="age">Age:</Label>

            {errors.age && <p> {errors.age.message} </p>}
            <Input {...register("age")} placeholder="22" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email:</Label>
            <Input {...register("email")} placeholder="jhonwick@example.com" />

            {errors.email && <p> {errors.email.message} </p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password:</Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="********"
            />
            {errors.password && <p> {errors.password.message} </p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Password:</Label>
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="********"
            />
            {errors.password && <p> {errors.password.message} </p>}
          </div>
          <Button type="submit">Signup</Button>
        </form>
      </div>
    </main>
  );
}

export default SignUpPage;

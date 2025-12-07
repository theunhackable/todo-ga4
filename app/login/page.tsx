"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserLoginType, UserSelectType } from "@/db/schemas";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

function LoginPage() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserLoginType>();
  const onSubmit: SubmitHandler<UserLoginType> = async (data) => {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      toast.success("Login success!");
      const body = (await res.json()) as {
        message: string;
        user: UserSelectType;
      };
      localStorage.setItem("user", JSON.stringify(body.user));
      router.push("/");
      return;
    }
    toast.error("Login failed.");
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
  }, []);
  return (
    <main className="mx-auto my-10 max-w-7xl">
      <h1 className="font-bold text-2xl text-center">Login to your account.</h1>
      <div className="max-w-xl mx-auto my-10 p-10 rounded-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10 w-full"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email:</Label>
            <Input {...register("email")} placeholder="jhonwick@example.com" />
            {errors.email && <p> {errors.email.message} </p>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="hashedPassword">Password:</Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="********"
            />
            {errors.password && <p> {errors.password.message} </p>}
          </div>
          <Button type="submit">Login</Button>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;

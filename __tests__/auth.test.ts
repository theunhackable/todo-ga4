import { describe, test, expect } from "bun:test";

const api = "http://localhost:3000/api";
const random = Math.random().toString(36).substring(7);

describe("Auth", () => {
  test("should create a new user", async () => {
    const res = await fetch(`${api}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "test",
        age: 20,
        email: `${random}@test.com`,
        password: "password",
        confirmPassword: "password",
      }),
    });
    expect(res.status).toBe(201);
  });

  test("should return an error if user already exists", async () => {
    const res = await fetch(`${api}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "test",
        age: 20,
        email: `${random}@test.com`,
        password: "password",
        confirmPassword: "password",
      }),
    });
    expect(res.status).toBe(409);
  });

  test("should log in a user and return a token", async () => {
    const res = await fetch(`${api}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${random}@test.com`,
        password: "password",
      }),
    });
    expect(res.status).toBe(200);
    const cookies = res.headers.get("Set-Cookie");
    expect(cookies).toContain("Authorization");
  });

  test("should get user info", async () => {
    const login = await fetch(`${api}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${random}@test.com`,
        password: "password",
      }),
    });
    const cookie = login.headers.get("Set-Cookie");
    const res = await fetch(`${api}/users`, {
      headers: {
        Cookie: cookie as string,
      },
    });
    expect(res.status).toBe(200);
    const { user } = await res.json();
    expect(user).not.toHaveProperty("password");
    expect(user.email).toBe(`${random}@test.com`);
  });

  test("should get todos", async () => {
    const login = await fetch(`${api}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${random}@test.com`,
        password: "password",
      }),
    });
    const cookie = login.headers.get("Set-Cookie");
    const res = await fetch(`${api}/todos`, {
      headers: {
        Cookie: cookie as string,
      },
    });
    expect(res.status).toBe(200);
  });

  test("should create a todo", async () => {
    const login = await fetch(`${api}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${random}@test.com`,
        password: "password",
      }),
    });
    const cookie = login.headers.get("Set-Cookie");
    const res = await fetch(`${api}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie as string,
      },
      body: JSON.stringify({
        title: "test todo",
        description: "test todo description",
      }),
    });
    expect(res.status).toBe(201);
  });
});

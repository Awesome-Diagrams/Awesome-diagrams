import { Form, useActionData, redirect } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { json } from "@remix-run/node";

export default function LoginPage() {
  const actionData = useActionData(); // Для получения ошибок, если они есть

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Вход</h1>
        <Form method="post" className="flex flex-col gap-2">
          <Input name="email" type="email" placeholder="Email" />
          <Input name="password" type="password" placeholder="Пароль" />
          <Button type="submit">Войти</Button>
        </Form>
        {actionData?.error && <p className="text-red-500">{actionData.error}</p>} {/* Выводим ошибку */}
        <div className="flex gap-2">
          <Form action="/register">
            <Button variant="outline">Регистрация</Button>
          </Form>
          <Form action="/diagram">
            <Button variant="ghost">Продолжить как гость</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}


export async function action({ request }: any) {
  const formData = new URLSearchParams(await request.text());
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return json({ error: "Пожалуйста, заполните все поля." }, { status: 400 });
  }

  // Отправляем запрос к серверу для логина
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: email, password }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    return json({ error: errorMessage || "Неверные данные для входа" }, { status: 400 });
  }


  return redirect("/diagram");
}

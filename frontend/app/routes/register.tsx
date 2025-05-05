import { Form, useActionData, redirect } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { json } from "@remix-run/node";

export default function RegisterPage() {
  const actionData = useActionData(); // Для получения ошибок, если они есть

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Регистрация</h1>
        <Form method="post" className="flex flex-col gap-2">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" id="email" required />
          </div>
          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input type="password" name="password" id="password" required />
          </div>
          <Button type="submit">Создать аккаунт</Button>
        </Form>
        {actionData?.error && <p className="text-red-500">{actionData.error}</p>} {/* Выводим ошибку */}

        <div className="text-sm text-muted-foreground">
          Уже есть аккаунт?{" "}
          <Form action="/login" className="inline">
            <Button variant="link" type="submit" className="px-1 h-auto">
              Войти
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

// Добавляем action для обработки POST-запроса
export async function action({ request }: any) {
  const formData = new URLSearchParams(await request.text());
  const email = formData.get("email");
  const password = formData.get("password");

  // Проверка на заполненность полей
  if (!email || !password) {
    return json({ error: "Пожалуйста, заполните все поля." }, { status: 400 });
  }

  // Отправка запроса на бэкенд для регистрации
  const response = await fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: email, password }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    return json({ error: errorMessage || "Не удалось зарегистрировать аккаунт" }, { status: 400 });
  }

  // Если регистрация успешна, перенаправляем на страницу логина или на нужную страницу
  return redirect("/login"); // Здесь можно перенаправить на страницу входа
}

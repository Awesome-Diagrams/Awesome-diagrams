import { redirect, LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";

// Примерная проверка cookie
export async function loader({ request }: LoaderFunctionArgs) {
  const cookie = request.headers.get("cookie");
  const isAuth = cookie?.includes("token="); // Можно сделать точнее

  if (isAuth) {
    return redirect("/diagram");
  }

  return null;
}

export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Добро пожаловать в Awesome Diagrams</h1>
        <div className="flex gap-4">
          <Form action="/login">
            <Button type="submit">Войти</Button>
          </Form>
          <Form action="/diagram">
            <Button type="submit" variant="outline">
              Продолжить как гость
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

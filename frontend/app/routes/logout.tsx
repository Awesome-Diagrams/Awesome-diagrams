import { ActionFunctionArgs, LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  await fetch("http://localhost:8080/logout", {
    method: "POST",
    credentials: "include",
  });

  return redirect("/login", {
    headers: {
      "Set-Cookie": "token=; Path=/; HttpOnly; Max-Age=0; SameSite=Strict; Secure",
    },
  });
};

export async function action({ request }: ActionFunctionArgs) {
  await fetch("http://localhost:8080/logout", {
    method: "POST",
    credentials: "include",
  });

  return redirect("/login", {
    headers: {
      "Set-Cookie": "token=; Path=/; HttpOnly; Max-Age=0; SameSite=Strict; Secure",
    },
  });
}

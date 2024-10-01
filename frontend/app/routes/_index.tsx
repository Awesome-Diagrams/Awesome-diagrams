import type { MetaFunction } from "@remix-run/node";
import { Diagram } from "~/internal/component/Diagram";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center text-black">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-black">
            Welcome to awesome diagram
          </h1>
        </header>

        <Diagram />
      </div>
    </div>
  );
}

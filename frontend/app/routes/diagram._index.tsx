import { Workspace } from "~/internal/component/Workspace";

export default function DiagramIndex() {

    
  return (
    <div className="flex text-black flex-col gap-10">
        <header className="flex justify-center">
          <h1 className="leading text-2xl font-bold text-black">
            Welcome to awesome diagram
          </h1>
        </header>

        <Workspace />
    </div>
  );
}
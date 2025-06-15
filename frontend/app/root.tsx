import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { useLocation } from "@remix-run/react";

import "./tailwind.css";
import { SvgContextProvider } from "./components/contexts/SvgContextProvider";
import { DiagramContextProvider } from "./components/contexts/DiagramContextProvider";
import { AppSidebar } from "./components/AppSidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { CombinedShapeSidebar } from "./components/CombinedShapeSidebar";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isDiagramRoute = location.pathname.startsWith("/diagram");
  const isCombinedShapeRoute = location.pathname.startsWith("/combinedshape");

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full min-h-screen bg-white dark:bg-gray-950 m-0 p-0">
        <SvgContextProvider>
          <DiagramContextProvider>
            <SidebarProvider>
              <div className="flex flex-row h-full min-h-screen w-full">
                {isCombinedShapeRoute && <CombinedShapeSidebar />}
                {isDiagramRoute && <AppSidebar />}
                <div className="flex-1 overflow-auto">{children}</div>
              </div>
            </SidebarProvider>
          </DiagramContextProvider>
        </SvgContextProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

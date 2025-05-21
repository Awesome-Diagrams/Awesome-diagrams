import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem
} from "~/components/ui/sidebar"
import { AddShapeMenu } from "./tools/edit/AddShapeMenu"
import { CreateDiagramCard } from "./tools/file/CreateDiagramCard"
import { ExportDiagramCard } from "./tools/file/ExportDiagramCard"
import { ImportDiagramCard } from "./tools/file/ImportDiagramCard"
import { AddConnectorButton } from "./tools/edit/AddConnectorButton"
import { ZoomControls } from "./tools/zoom/ZoomWorkspace"
import { DeleteButton } from "./tools/edit/DeleteButton"
import { SaveOnlineButton } from "./tools/file/SaveOnlineButton"
import { EditElemDialog } from "./tools/edit/EditElemdDialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"
import { Form, redirect, useFetcher } from "@remix-run/react"
import { useUser } from "~/hooks/useUser"
import { useEffect } from "react"
import { CreateCustomSchemaButton } from "./tools/schema/CreateCustomSchemaButton"

const items = [
  {
    title: "Create new diagram",
    content: <CreateDiagramCard />,
  },
  {
    title: "Create custom schema",
    content: <CreateCustomSchemaButton />,
  },
  {
    title: "Save diagram online",
    content: <SaveOnlineButton />,
  },
  {
    title: "Add shape",
    content: <AddShapeMenu />,
  },
  {
    title: "Add connector",
    content: <AddConnectorButton />,
  },
  {
    title: "Delete",
    content: <DeleteButton />
  },
  {
    title: "Export diagram",
    content: <ExportDiagramCard />,
  },
  {
    title: "Import diagram",
    content: <ImportDiagramCard />,
  },
  {
    title: "edit",
    content: <EditElemDialog />,
  },
  {
    title: "scale",
    content: <ZoomControls />,
  },
]

export function AppSidebar() {
  const username = useUser()
  return (
    <Sidebar>
      <SidebarContent>
        {/* User info + logout */}
        <div className="p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                {username ?? "Гость"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => {
                  window.location.href = "/logout"
                }}>
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Main menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Awesome diagram</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <div key={item.title}>
                    {item.content}
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

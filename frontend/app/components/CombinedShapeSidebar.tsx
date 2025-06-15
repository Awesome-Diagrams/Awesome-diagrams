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
import { CombineButton } from "./tools/elem/CombineButton"
import { ExcludeButton } from "./tools/elem/ExcludeButton"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"
import { useUser } from "~/hooks/useUser"
import { SaveCombinedShapeButton } from "./tools/shape/SaveCombinedShape"

const items = [
  {
    title: "Add shape",
    content: <AddShapeMenu />,
  },
  {
    title: "edit",
    content: <EditElemDialog />,
  },
  {
    title: "combine",
    content: <CombineButton />
  },
  {
    title: "exclude",
    content: <ExcludeButton />
  },
  {
    title: "save combined shape",
    content: <SaveCombinedShapeButton />
  },
]

export function CombinedShapeSidebar() {
  const username = useUser()?.username
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
                <DropdownMenuItem onClick={() => {window.location.href = "/diagram/mine"}}>
                  My diagrams
                </DropdownMenuItem>
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

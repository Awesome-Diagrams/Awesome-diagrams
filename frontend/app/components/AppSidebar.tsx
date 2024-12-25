 
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
 
// Menu items.
const items = [
  {
    title: "Create new diagram",
    content: <CreateDiagramCard />,
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
  return (
    <Sidebar>
      <SidebarContent>
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
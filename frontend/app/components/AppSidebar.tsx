import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "~/components/ui/sidebar"
import { AddShapeMenu } from "./tools/edit/AddShapeMenu"
import { CreateDiagramCard } from "./tools/file/CreateDiagramCard"
import { ExportDiagramCard } from "./tools/file/ExportDiagramCard"
import { ImportDiagramCard } from "./tools/file/ImportDiagramCard"
 
// Menu items.
const items = [
  {
    title: "Create new diagram",
    content: <CreateDiagramCard />,
  },
  {
    title: "Add shape",
    content: <AddShapeMenu />,
  },
  {
    title: "Export diagram",
    content: <ExportDiagramCard />,
  },
  {
    title: "Import diagram",
    content: <ImportDiagramCard />,
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
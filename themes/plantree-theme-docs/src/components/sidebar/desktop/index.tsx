import { ISidebar } from ".."
import { SidebarItem } from "../sidebarItem"

interface Props {
  activePath: string
  sidebar: ISidebar[]
}

export function DocSidebarDesktop({ activePath, sidebar }: Props) {

  return <nav>
    <ul>
      {sidebar.map((item, index) => (
        <SidebarItem
          key={index}
          item={item}
          activePath={activePath}
          index={index} />
      ))}
    </ul>
  </nav>
}
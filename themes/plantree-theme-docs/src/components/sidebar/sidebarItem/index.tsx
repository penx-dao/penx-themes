import { ISidebar } from "..";
import { ItemCategory } from "./category";
import { ItemLink } from "./link";

interface Props {
  activePath: string;
  item: ISidebar;
  index: number;
}

export const SidebarItem = ({ item, index, activePath }: Props) => {
  const { type = 'link' } = item

  switch (type) {
    case 'category':
      return <ItemCategory item={item} index={index} activePath={activePath} />;
    case 'link':
      return <ItemLink item={item} index={index} activePath={activePath} />;
    default:
      <div>Error</div>
  }
}
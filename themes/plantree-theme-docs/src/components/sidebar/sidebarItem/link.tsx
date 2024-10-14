import { ISidebar } from "..";
import { cn } from "../../../lib/utils";
import Link from "../../Link";

interface Props {
  item: ISidebar;
  index: number;
  activePath: string;
}

export const ItemLink = ({ item, activePath }: Props) => {

  const { href, label } = item

  return <li>
    <Link
      href={href}
      className={cn('block w-full',activePath === href && 'text-primary-500')}
    >
      {label}
    </Link>
  </li>
}

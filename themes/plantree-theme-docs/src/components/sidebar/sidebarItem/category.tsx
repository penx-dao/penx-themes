import { ISidebar } from "..";
import clsx from 'clsx';
import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { SidebarItem } from ".";
import { isActiveSidebarItem } from "../utils";
import styles from '../sidebar.module.css';

interface Props {
  activePath: string;
  item: ISidebar;
  index: number;
}

export function useCollapsible({
  initialState,
}: {
  /** The initial state. Will be non-collapsed by default. */
  initialState?: boolean | (() => boolean);
}): {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  toggleCollapsed: () => void;
} {
  const [collapsed, setCollapsed] = useState(initialState ?? false);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((expanded) => !expanded);
  }, []);

  return {
    collapsed,
    setCollapsed,
    toggleCollapsed,
  };
}

export const ItemCategory = ({ item, activePath }: Props) => {

  const isActive = isActiveSidebarItem(item, activePath);

  const { collapsed, setCollapsed } = useCollapsible({
    initialState: () => {

      return isActive ? false : true;
    },
  });

  const updateCollapsed = (toCollapsed = !collapsed) => {
    setCollapsed(toCollapsed);
  };

  return <li>
    <div
      className={clsx('flex cursor-pointer',styles.menuLink, {
        [styles.menucaret]: collapsed,
      })}
      onClick={(e) => {
        e.preventDefault();
        updateCollapsed();
      }}
    >
      {item.label}
    </div>

    <ul className="mt-1 pl-2">
      {!collapsed && Array.isArray(item.items) && item.items.map((cell, i) => (
        <SidebarItem
          key={i}
          item={cell}
          activePath={activePath}
          index={i} />
      ))}
    </ul>
  </li>
}
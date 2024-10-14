import { ISidebar } from ".";

/**
 * Compare the 2 paths, case insensitive and ignoring trailing slash
 */
export function isSamePath(
  path1: string | undefined,
  path2: string | undefined,
): boolean {
  const normalize = (pathname: string | undefined) =>
    (!pathname || pathname.endsWith('/')
      ? pathname
      : `${pathname}/`
    )?.toLowerCase();
  return normalize(path1) === normalize(path2);
}

const isActive = (testedPath: string | undefined, activePath: string) =>
  typeof testedPath !== 'undefined' && isSamePath(testedPath, activePath);

const containsActiveSidebarItem = (
  items: ISidebar[],
  activePath: string,
) => items.some((subItem) => isActiveSidebarItem(subItem, activePath));

/**
 * Checks if a sidebar item should be active, based on the active path.
 */
export function isActiveSidebarItem(
  item: ISidebar,
  activePath: string,
): boolean {
  // TODO: HACK item.type === undefined
  if (item.type === 'link' || item.type === undefined) {
    return isActive(item.href, activePath);
  }

  if (item.type === 'category') {
    return (
      isActive(item.href, activePath) ||
      containsActiveSidebarItem(item?.items || [], activePath)
    );
  }

  return false;
}

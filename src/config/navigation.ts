export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "About" },
  { href: "/publications", label: "Publications" },
  { href: "/people", label: "People" },
  { href: "/projects", label: "Projects" },
  { href: "/join", label: "Join" },
];

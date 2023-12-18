// Required for client components to use React hooks
"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import Box from "./Box";
import SidebarItem from "./SidebarItem";

// Interface SidebarProps contains ReactNode children
interface SidebarProps {
  children: React.ReactNode;
}

// Sidebar component accepts ReactNode children from SidebarProps interface
const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  // Use a React hook that allows you to read the current URL's pathname
  const pathname = usePathname();

  // Create an array of possible routes for site navigation
  // The "Home" label will be active any time the pathname isn't "/search"
  // The state of "pathname" is added to the list of dependency arrays
  const routes = useMemo(() => [
    {
      label: "Home",
      active: pathname !== "/search",
      href: "/",
      icon: HiHome,
    },
    {
      label: "Search",
      active: pathname === "/search",
      href: "/search",
      icon: BiSearch,
    }
  ], [pathname]);

  // Render Box components in the sidebar
  // The first Box component iterates over the routes array
  // and renders a SidebarItem for each possible route
  // The second Box component contains the user's music library
  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 h-full w-[300px] p-2 bg-black">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">
          Song Library
        </Box>
      </div>
    </div>
  );
}

export default Sidebar;

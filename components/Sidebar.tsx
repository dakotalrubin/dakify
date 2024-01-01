// Required for client components to use React hooks
"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

// SidebarProps interface contains ReactNode children and array of user songs
interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

// Sidebar component accepts ReactNode children and array of user songs
// from SidebarProps interface
const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  // Use a React hook that allows you to read the current URL's pathname
  const pathname = usePathname();

  // Create a player instance with default values from the usePlayer hook
  const player = usePlayer();

  // Create an array of possible routes for site navigation
  // The "Home" label will be active any time the pathname isn't "/search"
  // The state of "pathname" is added to the list of dependencies
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

  // Render Box components in the sidebar and children in the center
  // of the screen. The first Box component iterates over the routes array
  // and renders a SidebarItem for each possible route. The second Box
  // component contains the user's music library. The Player component
  // doesn't hide SongItem components near the bottom of the screen, thanks
  // to twMerge.
  return (
    <div className={twMerge("flex h-full",
      player.activeID && "h-[calc(100%-80px)]")}>
      <div className="hidden md:flex flex-col gap-y-2 h-full w-[300px] 
        p-2 bg-black">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">
        {children}
      </main>
    </div>
  );
}

export default Sidebar;

import { IconType } from "react-icons";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

// SidebarItemProps interface contains an icon, label, href
// and optional active bool
interface SidebarItemProps {
  icon: IconType;
  label: string;
  href: string;
  active?: boolean;
}

// SidebarItem component accepts an icon, label, href and optional active bool
// from SidebarItemProps interface
const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon, label, href, active }) => {
  // The active SidebarItem is highlighted white
  return (
    <Link href={href} className={twMerge(`flex flex-row h-auto items-center 
      w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white 
      transition text-neutral-400 py-1`,
      active && `text-white`)}>
      <Icon size={26} />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
}

export default SidebarItem;

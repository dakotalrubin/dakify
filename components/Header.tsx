// Required for client component to use React hooks
"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft } from "react-icons/rx";

// Interface HeaderProps contains ReactNode children
// and optional className string
interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

// Header component accepts ReactNode children and optional className string
// from HeaderProps interface
const Header: React.FC<HeaderProps> = ({ children, className }) => {
  // Use a React hook that allows you to handle page routing state
  const router = useRouter();

  // Allow the user to log out of their account
  const handleLogout = () => {
    // Handle logging out here!
  }

  // Render the app header bar
  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, 
      className)}>
      <div className="w-full mb-4 flex justify-between items-center">
        <div className="hidden md:flex gap-x-2 items-center">
          <button>
            <RxCaretLeft size={35} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

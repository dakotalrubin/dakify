// Required for client component to use React hooks
"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";

// HeaderProps interface contains ReactNode children
// and optional className string
interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

// Header component accepts ReactNode children and optional className string
// from HeaderProps interface
const Header: React.FC<HeaderProps> = ({ children, className }) => {
  // Extract the onOpen method from useAuthModal hook
  const { onOpen } = useAuthModal();

  // Use a React hook that allows you to handle page routing state
  const router = useRouter();

  // Allow the user to log out of their account
  const handleLogout = () => {
    // Handle logging out here!
  }

  // Render the app header bar: includes back and forward page routing buttons,
  // along with Sign Up and Log In buttons
  // The second chunk of code below shows page routing buttons for mobile view
  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, 
      className)}>
      <div className="w-full mb-4 flex justify-between items-center">
        <div className="hidden md:flex gap-x-2 items-center">
          <button className="rounded-full flex justify-center items-center 
          bg-black hover:opacity-75 transition" 
          onClick={() => router.back()}>
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button className="rounded-full flex justify-center items-center 
          bg-black hover:opacity-75 transition" 
          onClick={() => router.forward()}>
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>

        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 flex justify-center items-center 
          bg-white hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 flex justify-center items-center 
          bg-white hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>

        <div className="flex justify-between items-center gap-x-4">
          <>
            <div>
              <Button className="font-medium bg-transparent text-neutral-300"
                onClick={onOpen}>
                Sign Up
              </Button>
            </div>
            <div>
              <Button className="px-6 py-2 bg-white"
                onClick={onOpen}>
                Log In
              </Button>
            </div>
          </>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Header;

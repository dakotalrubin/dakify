// Required for client component to use React hooks
"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import usePlayer from "@/hooks/usePlayer";

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

  // Get Supabase client methods from useSupabaseClient hook
  const supabaseClient = useSupabaseClient();

  // Extract user data from useUser hook to check subscription status
  const { user, subscription } = useUser();

  // Create a player instance with default values from the usePlayer hook
  const player = usePlayer();

  // Allow the user to log out of their account
  const handleLogout = async () => {
    // Wait for a Promise to be returned
    const { error } = await supabaseClient.auth.signOut();

    // Reset any song playing after logging out and refresh the page
    player.reset();
    router.refresh();

    // If there's a logout error, show the user a notification
    // with the error message. Otherwise show a success message.
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logout successful.");
    }
  }

  // Render the app header bar: includes back and forward page routing buttons,
  // along with Sign Up and Login buttons.
  // The second chunk of code below shows page routing buttons for mobile view.
  // If a user is logged in, render an account details button and
  // a Logout button instead of Sign Up and Login buttons.
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
          {user ? (
            <div className="flex items-center gap-x-4">
              <Button className="px-6 py-2 bg-white"
                onClick={handleLogout}>
                Logout
              </Button>
              <Button className="bg-white"
                onClick={() => router.push("/account")}>
                <FaUserAlt />
              </Button>
            </div>
          ) : (
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
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Header;

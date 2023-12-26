// Required for client component to use React hooks
"use client";

import { useRouter } from "next/navigation";
import {
  useSupabaseClient,
  useSessionContext
} from "@supabase/auth-helpers-react";

import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";

// AuthModal component extracts Supabase session info and renders
// the authentication modal for users to register or log in to their account
const AuthModal = () => {
  // Get router methods from useRouter hook
  const router = useRouter();

  // Get Supabase client methods from useSupabaseClient hook
  const supabaseClient = useSupabaseClient();

  // Extract Supabase session info from useSessionContext hook
  const { session } = useSessionContext();

  // Extract the isOpen boolean and onClose method from useAuthModal hook
  const { isOpen, onClose } = useAuthModal();

  // Run this block any time the session or router gets updated
  // or the onClose method gets called
  useEffect(() => {
    // Refresh the current page and close the authentication modal if there's
    // an active user session
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  // onChange method accepts an open boolean and closes the auth modal
  // if it was open
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  // Render the auth modal with defined settings
  return (
    <Modal
      title="Welcome back!"
      description="Sign in to your account."
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        supabaseClient={supabaseClient}
        providers={["github"]}
        magicLink
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22C55E"
              }
            }
          }
        }}
      />
    </Modal>
  );
}

export default AuthModal;

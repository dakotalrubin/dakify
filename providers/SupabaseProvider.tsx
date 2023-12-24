// Required for client component to use React hooks
"use client";

import { useState } from "react";

import { Database } from "@/types_db";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

// SupabaseProviderProps interface contains ReactNode children
interface SupabaseProviderProps {
  children: React.ReactNode;
}

// SupabaseProvider component accepts ReactNode children
// from SupabaseProviderProps interface
const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  // Create a new variable to track Supabase client state
  const [supabaseClient] = useState(() => 
    createClientComponentClient<Database>());

  // Render ReactNode children within a SessionContextProvider user session
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
}

export default SupabaseProvider;

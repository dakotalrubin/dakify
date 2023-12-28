import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

// Asynchronous function accepts a NextRequest and returns a NextResponse.
// This function will add restrictions for authenticated users such that
// this program will only load songs and playlists associated with a 
// specific user.
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Refresh user session for access to secure data
  await supabase.auth.getSession();

  return res;
}

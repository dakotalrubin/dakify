import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

// Asynchronously retrieve a user's updated list of songs by user ID:
// return a Promise with the current array of songs
const getSongsByUserID = async (): Promise<Song[]> => {
  // Define a Supabase instance with cookies to communicate with the database
  const supabase = createServerComponentClient({ cookies: cookies });

  // Get user session data and error info from Supabase
  const {
    data: userSessionData,
    error: userSessionError
  } = await supabase.auth.getSession();

  // If problem occurs during data fetch, log error and return an empty array
  if (userSessionError) {
    console.log(userSessionError.message);
    return [];
  }

  // Fetch a user's songs and playlists in descending order
  const { data, error } = await supabase.from("songs").select("*")
    .eq("user_id", userSessionData.session?.user.id)
    .order("created_at", { ascending: false });

  // If problem occurs during song fetch, log error
  if (error) {
    console.log(error.message);
  }

  // Return whatever data was found or an empty array
  return (data as any) || [];
}

export default getSongsByUserID;

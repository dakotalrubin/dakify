import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

// Asynchronously retrieve the updated list of liked songs:
// return a Promise with the current array of liked songs
const getLikedSongs = async (): Promise<Song[]> => {
  // Define a Supabase instance with cookies to communicate with the database
  const supabase = createServerComponentClient({ cookies: cookies });

  // Get current session data
  const {
    data: {
      session
    }
  } = await supabase.auth.getSession();

  // Extract liked song and error info from user session with a
  // descending order query
  const { data, error } = await supabase.from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", session?.user.id)
    .order("created_at", { ascending: false });

  // If there's a problem fetching liked songs, return an empty array
  if (error || !data) {
    return [];
  }

  // Return a spread of the relation of liked songs from the first liked song
  return data.map((item) => ({ ...item.songs }));
}

export default getLikedSongs;

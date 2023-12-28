import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";
import getSongs from "./getSongs";

// Asynchronously retrieve the updated list of songs by title:
// return a Promise with the current array of songs
const getSongsByTitle = async (title: string): Promise<Song[]> => {
  // If no title has been provided, fetch all the user's songs
  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  // Define a Supabase instance with cookies to communicate with the database
  const supabase = createServerComponentClient({ cookies: cookies });

  // Extract song and error info from descending order query
  // The "ilike" PostgreSQL filter method pattern-matches the provided string
  const { data, error } = await supabase.from("songs").select("*")
    .ilike("title", `%%${title}%`)
    .order("created_at", { ascending: false });

  // Return whatever data was found or an empty array
  return (data as any) || [];
}

export default getSongsByTitle;

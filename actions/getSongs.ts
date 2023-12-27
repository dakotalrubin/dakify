import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Asynchronously retrieve the updated list of songs:
// returns a Promise with the current array of songs
const getSongs = async (): Promise<Song[]> => {
  // Define a Supabase instance with cookies to communicate with the database
  const supabase = createServerComponentClient({ cookies: cookies });

  // Extract song and error info from descending order query
  const { data, error } = await supabase.from("songs").select("*")
    .order("created_at", { ascending: false });

  // Return whatever data was found or an empty array
  return (data as any) || [];
}

export default getSongs;

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

// useLoadSongUrl hook accepts a song and returns the fetched song URL
const useLoadSongUrl = (song: Song) => {
  // Get Supabase client methods from useSupabaseClient hook
  const supabaseClient = useSupabaseClient();

  // If there's no song data, return an empty string for the song URL
  if (!song) {
    return "";
  }

  // Extract song URL from the "songs" table in the database
  const { data: songData } = supabaseClient.storage.from("songs")
    .getPublicUrl(song.song_path);

  // Return fetched song URL
  return songData.publicUrl;
}

export default useLoadSongUrl;

import { useState, useEffect, useMemo } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

import { Song } from "@/types";

// useGetSongByID hook accepts an optional id string
const useGetSongByID = (id?: string) => {
  // Create variable to track loading state
  const [isLoading, setIsLoading] = useState(false);

  // Create variable to track state of current song
  const [song, setSong] = useState<Song | undefined>(undefined);

  // Extract Supabase session info from useSessionContext hook
  const { supabaseClient } = useSessionContext();

  // Call useEffect any time the id or supabaseClient updates
  useEffect(() => {
    // Exit the function if there's no song id string
    if (!id) {
      return;
    }

    // Load, then fetch song
    setIsLoading(true);

    const fetchSong = async () => {
      // Extract song data and error info from "songs" table in Supabase
      const { data, error } = await supabaseClient.from("songs")
        .select("*").eq("id", id).single();

      // If there's a problem fetching song data, notify the user
      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      // Set current song data and deload
      setSong(data as Song);
      setIsLoading(false);
    }

    // Call fetchSong when useEffect gets triggered
    fetchSong();
  }, [id, supabaseClient]);

  // Only runs when isLoading or song data updates
  // Caches the return value so it doesn't need to be recalculated
  return useMemo(() => ({ isLoading, song }), [isLoading, song]);
}

export default useGetSongByID;

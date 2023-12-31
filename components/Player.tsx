// Required for client component to use React hooks
"use client";

import usePlayer from "@/hooks/usePlayer";
import useGetSongByID from "@/hooks/useGetSongByID";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import PlayerContent from "./PlayerContent";

// Player component renders the music player
const Player = () => {
  // Create a player instance with default values from the usePlayer hook
  const player = usePlayer();

  // Extract song data from the useGetSongByID hook
  const { song } = useGetSongByID(player.activeID);

  // Load the proper mp3 file URL from the "songs" table in the database.
  // "!" is the non-null assertion operator in TypeScript, and it tells the
  // compiler to ignore the possibility of the argument being undefined.
  const songUrl = useLoadSongUrl(song!);

  // If the song or player are missing any attributes, don't load the player
  if (!song || !songUrl || !player.activeID) {
    return null;
  }

  // Render all player content. The key prop is necessary to destroy and
  // recreate the Player component every time the song URL changes, so
  // users will have the ability to skip songs, seamlessly updating the player
  // before loading the new song.
  return (
    <div className="fixed bottom-0 h-[80px] w-full px-4 py-2 bg-black">
      <PlayerContent
        song={song}
        songUrl={songUrl}
        key={songUrl}
      />
    </div>
  );
}

export default Player;

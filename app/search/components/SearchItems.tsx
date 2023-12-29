// Required for client component to use React hooks
"use client";

import { Song } from "@/types";
import LibraryItem from "@/components/LibraryItem";
import LikeButton from "@/components/LikeButton";

// SearchItemsProps interface contains an array of Songs
interface SearchItemsProps {
  songs: Song[];
}

// SearchItems component accepts an array of Songs
// from SearchItemsProps interface
const SearchItems: React.FC<SearchItemsProps> = ({ songs }) => {
  // If no songs were found, notify the user
  if (songs.length === 0) {
    return (
      <div className="flex flex-col w-full px-6 gap-y-2 text-neutral-400">
        No songs were found!
      </div>
    );
  }

  // Return the fetched list of songs
  return (
    <div className="flex flex-col w-full px-6 gap-y-2">
      {songs.map((song) => (
        <div 
          className="flex items-center w-full gap-x-4"
          key={song.id}
        >
          <div className="flex-1">
            <LibraryItem
              data={song}
              onClick={() => {}}
            />
          </div>
          <LikeButton songID={song.id} />
        </div>
      ))}
    </div>
  );
}

export default SearchItems;

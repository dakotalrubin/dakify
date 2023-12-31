// Required for client component to use React hooks
"use client";

import { Song } from "@/types";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";

// PageContentProps interface contains a songs array
interface PageContentProps {
  songs: Song[];
}

// PageContent component accepts a songs array from PageContentProps interface
const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  // Create on-click functionality for the player from the useOnPlay hook
  const onPlay = useOnPlay(songs);

  // Check if the songs array is empty
  if (songs.length < 1) {
    return (
      <div className="text-neutral-400 mt-4">
        No songs available.
      </div>
    );
  }

  // Render the proper number of columns per row depending on device
  // screen size. Also render each individual song in the song array.
  return (
    <div className="grid grid-cols-2 gap-4 mt-4 lg:grid-cols-4 md:grid-cols-3 
      sm:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8">
      {songs.map((item) => (
        <SongItem data={item} key={item.id}
          onClick={(id: string) => onPlay(id)}
        />
      ))}
    </div>
  );
}

export default PageContent;

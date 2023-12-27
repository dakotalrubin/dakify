// Required for client component to use React hooks
"use client";

import { Song } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";

// SongItemProps interface contains song data and an onClick method
interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

// SongItem component accepts song data and an onClick method
// from SongItemProps interface
const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  // Get the song item's image path from useLoadImage hook
  const imagePath = useLoadImage(data);

  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative flex flex-col justify-center items-center 
        group rounded-md gap-x-4 p-3 overflow-hidden bg-neutral-400/5 
        cursor-pointer hover:bg-neutral-400/10 transition">
      Song
    </div>
  );
}

export default SongItem;

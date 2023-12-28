// Required for client component to use React hooks
"use client";

import Image from "next/image";

import { Song } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";
import PlayButton from "./PlayButton";

// SongItemProps interface contains song data and an onClick method
interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

// SongItem component accepts song data and an onClick method
// from SongItemProps interface
const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  // Get the song item's image path from the useLoadImage hook
  const imagePath = useLoadImage(data);

  // Render an individual song item
  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative flex flex-col justify-center items-center 
        group rounded-md gap-x-4 p-3 overflow-hidden bg-neutral-400/5 
        cursor-pointer hover:bg-neutral-400/10 transition">
      <div className="relative rounded-md h-full w-full aspect-square 
        overflow-hidden">
        <Image src={imagePath || "@/public/images/liked.png"}
          className="object-cover" fill alt="Image" />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="w-full font-semibold truncate">
          {data.title}
        </p>
        <p className="pb-4 w-full text-sm text-neutral-400 truncate">
          {data.author}
        </p>
      </div>
      <div className="absolute right-4 bottom-24">
        <PlayButton />
      </div>
    </div>
  );
}

export default SongItem;

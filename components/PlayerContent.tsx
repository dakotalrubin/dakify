// Required for client component to use React hooks
"use client";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";

import { Song } from "@/types";
import LibraryItem from "./LibraryItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";

// PlayerContentProps interface contains a song and a song URL string
interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

// PlayerContent component accepts a song and a song URL string from
// the PlayerContentProps interface
const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  // Change the play button and volume button icons in the music player
  // depending on whether the song is playing or paused
  const Icon = false ? BsPauseFill : BsPlayFill;
  const VolumeIcon = false ? HiSpeakerXMark : HiSpeakerWave;

  // Render all the different parts of the music player
  return (
    <div className="grid grid-cols-2 h-full md:grid-cols-3">
      <div className="w-full flex justify-start">
        <div className="flex items-center gap-x-4">
          <LibraryItem data={song} />
          <LikeButton songID={song.id} />
        </div>
      </div>
      <div className="flex w-full justify-end items-center col-auto md:hidden">
        <div 
          className="h-10 w-10 flex justify-center items-center p-1 rounded-full 
            bg-white cursor-pointer"
          onClick={() => {}}
        >
        <Icon
          className="text-black"
          size={30}
        />
        </div>
      </div>

      <div className="hidden h-full w-full md:flex justify-center items-center 
        max-w-[722px] gap-x-6">
        <AiFillStepBackward
          className="text-neutral-400 curson-pointer hover:text-white 
            transition"
          size={30}
          onClick={() => {}}
        />
        <div 
          className="flex justify-center items-center h-10 w-10 rounded-full
            p-1 cursor-pointer bg-white"
          onClick={() => {}}
          >
          <Icon
            className="text-black"
            size={30}
          />
        </div>
        <AiFillStepForward
          className="text-neutral-400 curson-pointer hover:text-white 
            transition"
          size={30}
          onClick={() => {}}
        />
      </div>

      <div className="hidden md:flex justify-end w-full pr-2">
        <div className="flex items-center w-[120px] gap-x-2">
          <VolumeIcon
            className="cursor-pointer"
            size={34}
            onClick={() => {}}
          />
          <Slider />
        </div>
      </div>
    </div>
  );
}

export default PlayerContent;

// Required for client component to use React hooks
"use client";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { useState, useEffect } from "react";
import useSound from "use-sound";

import { Song } from "@/types";
import LibraryItem from "./LibraryItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";

// PlayerContentProps interface contains a song and a song URL string
interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

// PlayerContent component accepts a song and a song URL string from
// the PlayerContentProps interface
const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  // Create a player instance with default values from the usePlayer hook
  const player = usePlayer();

  // Create state variables to track volume level (default volume is maxed out)
  const [volume, setVolume] = useState(1);
  const [storedVolume, setStoredVolume] = useState(1);

  // Create state variable to track whether a song is playing
  const [isPlaying, setIsPlaying] = useState(false);

  // Change the play button and volume button icons in the music player
  // depending on whether the song is playing or paused
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = (volume === 0) ? HiSpeakerXMark : HiSpeakerWave;

  // Determine which song to play next
  const onPlayNext = () => {
    // Check if there's an active list of songs to play
    if (player.ids.length === 0) {
      return;
    }

    // Get the index of the song that's playing right now
    const currentIndex = player.ids.findIndex((id) => id === player.activeID);

    // Get the index of the next song
    const nextSong = player.ids[currentIndex + 1];

    // If the last song is playing, then play the first song in the playlist.
    // Otherwise play the next song.
    if (!nextSong) {
      return player.setID(player.ids[0]);
    }

    // Update the song being played
    player.setID(nextSong);
  }

  // Determine which previous song to play
  const onPlayPrev = () => {
    // Check if there's an active list of songs to play
    if (player.ids.length === 0) {
      return;
    }

    // Get the index of the song that's playing right now
    const currentIndex = player.ids.findIndex((id) => id === player.activeID);

    // Get the index of the previous song
    const prevSong = player.ids[currentIndex - 1];

    // If the first song is playing, then play the last song in the playlist.
    // Otherwise play the previous song.
    if (!prevSong) {
      return player.setID(player.ids[player.ids.length - 1]);
    }

    // Update the song being played
    player.setID(prevSong);
  }

  // Extract play, pause and sound data from the useSound hook.
  // Define volume level, song format and behavior for playing,
  // pausing and ending songs.
  const [play, { pause, sound }] = useSound(
    songUrl,
    {
      volume: volume,
      format: ["mp3"],
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onend: () => {
        setIsPlaying(false);
        onPlayNext();
      }
    }
  );

  // Play a song when the player component loads on-screen
  // Call useEffect every time "sound" updates
  useEffect(() => {
    // Play a song if one exists
    sound?.play();

    // Unload the song and exit the function
    return () => {
      sound?.unload();
    }
  }, [sound]);

  // The play button toggles the play and pause methods
  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  }

  // The mute button stores the previous volume and toggles on or off
  const toggleMute = () => {
    if (volume === 0) {
      setVolume(storedVolume);
    } else {
      setStoredVolume(volume);
      setVolume(0);
    }
  }

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
          onClick={handlePlay}
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
          onClick={onPlayPrev}
        />
        <div 
          className="flex justify-center items-center h-10 w-10 rounded-full
            p-1 cursor-pointer bg-white"
          onClick={handlePlay}
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
          onClick={onPlayNext}
        />
      </div>

      <div className="hidden md:flex justify-end w-full pr-2">
        <div className="flex items-center w-[120px] gap-x-2">
          <VolumeIcon
            className="cursor-pointer"
            size={34}
            onClick={toggleMute}
          />
          <Slider
            value={volume}
            onChange={(value) => setVolume(value)}
          />
        </div>
      </div>
    </div>
  );
}

export default PlayerContent;

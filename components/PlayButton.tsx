import { FaPlay } from "react-icons/fa";

// PlayButton component
const PlayButton = () => {
  return (
    <button className="flex items-center rounded-full opacity-0 bg-green-500 
      p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 
      group-hover:translate-y-0 hover:scale-110 transition">
      <FaPlay className="text-black" />
    </button>
  );
}

export default PlayButton;

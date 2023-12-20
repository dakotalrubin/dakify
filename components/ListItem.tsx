// Required for client component to use React hooks
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

// ListItemProps interface contains image, name and href string
interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

// ListItem component accepts image, name and href strings
// from ListItemProps interface
const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  // Use a React hook that allows you to handle page routing state
  const router = useRouter();

  // Navigate to the provided href
  const onClick = () => {
    // Add authentication before pushing here!
    router.push(href);
  }

  // Render a playlist button for the user's liked songs
  return (
    <button className="relative group flex items-center rounded-md 
      overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 
      transition pr-4" onClick={onClick}>
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image className="object-cover" fill src={image} alt="Image" />
      </div>
      <p className="truncate py-5 font-medium">
        {name}
      </p>
      <div className="absolute flex justify-center items-center rounded-full 
        opacity-0 bg-green-500 p-4 drop-shadow-md right-5 transition 
        group-hover:opacity-100 hover:scale-110">
        <FaPlay className="text-black"/>
      </div>
    </button>
  );
}

export default ListItem;

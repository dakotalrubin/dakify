// Required for client component to use React hooks
"use client";

import { BounceLoader } from "react-spinners";

import Box from "@/components/Box";

// Loading component displays a loading effect
const Loading = () => {
  return (
    <Box className="flex justify-center items-center h-full">
    `<BounceLoader size={40} color="#22C55E"/>
    </Box>
  );
}

export default Loading;

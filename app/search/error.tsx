// Required for client component to use React hooks
"use client";

import Box from "@/components/Box";

// Error component handles any uncaught exceptions
const Error = () => {
  return  (
    <Box className="flex justify-center items-center h-full">
      <div className="text-neutral-400">
        Something went wrong!
      </div>
    </Box>
  );
}

export default Error;

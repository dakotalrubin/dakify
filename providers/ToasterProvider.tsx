// Required for client component to use React hooks
"use client";

import { Toaster } from "react-hot-toast";

// Add some basic notification styles
const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#333333",
          color: "#FFFFFF"
        }
      }}
    />
  );
}

export default ToasterProvider;

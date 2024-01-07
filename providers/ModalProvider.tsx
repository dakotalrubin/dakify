// Required for client component to use React hooks
"use client";

import { useState, useEffect } from "react";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import SubscribeModal from "@/components/SubscribeModal";
import { ProductAndPrice } from "@/types";

// ModalProviderProps interface contains an array of products and prices
interface ModalProviderProps {
  products: ProductAndPrice[];
}

// ModalProvider component accepts an array of products and prices, and
// only renders client-side modals
const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
  // Create a state variable to track whether a modal has been mounted
  const [isMounted, setIsMounted] = useState(false);

  // Server-side rendering can cause "hydration" errors with modals.
  // HTML rendered by the server needs to find matching client-side HTML nodes.
  // To sidestep this, only render a modal from the client side: if useEffect
  // block runs, then we're on the client side and can safely render a modal.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If something is going to be rendered server-side, just return null instead
  if (!isMounted) {
    return null;
  }

  // Render AuthModal and UploadModal components
  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products}/>
    </>
  );
}

export default ModalProvider;

// Required for client component to use React hooks
"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import { ProductAndPrice } from "@/types";
import Button from "@/components/Button";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import { Price } from "@/types";
import useSubscribeModal from "@/hooks/useSubscribeModal";

// Format a price in USD for display in the subscribe modal
const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
}

// SubscribeModalProps interface contains an array of products and prices
interface SubscribeModalProps {
  products: ProductAndPrice[];
}

// SubscribeModal component accepts an array of products and prices, and
// extracts Supabase session info and renders the subscribe modal for users
// to sign up for premium features
const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
  // Create variable to track price ID loading state
  const [priceIDLoading, setPriceIDLoading] = useState<string>();

  // Extract user, isLoading and subscription info from custom useUser hook
  const { user, isLoading, subscription } = useUser();

  // Create a subscribe modal and enable onOpen and onClose methods
  const subscribeModal = useSubscribeModal();

  // Handle whether the subscribe modal is open or closed
  const onChange = (open: boolean) => {
    // Remove the subscribe modal if closed
    if (!open) {
      subscribeModal.onClose();
    }
  }

  // Allow the user to subscribe through Stripe
  const handleCheckout = async (price: Price) => {
    // Update the price ID loading state with the current price ID
    setPriceIDLoading(price.id);

    // If the user isn't logged in, reset the price ID loading state
    // and notify the user
    if (!user) {
      setPriceIDLoading(undefined);
      return toast.error("You need to log in!");
    }

    // If the user has already subscribed, reset the price ID loading state
    // and notify the user
    if (subscription) {
      setPriceIDLoading(undefined);
      return toast("You have already subscribed!");
    }

    // Try to create a checkout session
    try {
      // Extract session ID from the response to a POST request
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price }
      });

      // Create a Stripe object
      const stripe = await getStripe();

      // Create a custom checkout screen for the currently logged-in user
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      // Notify the user of any errors
      return toast.error((error as Error)?.message);
    } finally {
      // Reset the price ID loading state
      setPriceIDLoading(undefined);
    }
  };

  // Populate the subscribe modal with content
  let content = (
    <div className="text-center">
      No products available.
    </div>
  );

  // Update the subscribe modal's content if the products array isn't empty
  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          // If prices aren't available, notify the user
          if (!product.prices?.length) {
            return (
              <div key={product.id}>
                No price available.
              </div>
            );
          }

          // Render the price for each product
          return product.prices.map((price) => (
            <Button
              className="mb-4 outline-none"
              key={price.id}
              disabled={isLoading || price.id === priceIDLoading}
              onClick={() => handleCheckout(price)}
            >
              {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
            </Button>
          ));
        })}
      </div>
    );
  }

  // Update the subscribe modal's content if the user has already subscribed
  if (subscription) {
    content = (
      <div className="text-center">
        You have already subscribed!
      </div>
    );
  }

  // Render the subscribe modal
  return (
    <Modal
      title="Subscribe today!"
      description="Upload music with Dakify Premium."
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
}

export default SubscribeModal;

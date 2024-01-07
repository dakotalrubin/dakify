// Required for client component to use React hooks
"use client";

import Modal from "./Modal";
import { ProductAndPrice } from "@/types";
import Button from "@/components/Button";

// SubscribeModalProps interface contains an array of products and prices
interface SubscribeModalProps {
  products: ProductAndPrice[];
}

// Format a price in USD for display in the subscribe modal
const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
}

// SubscribeModal component accepts an array of products and prices, and
// extracts Supabase session info and renders the subscribe modal for users
// to sign up for premium features
const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
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
            >
              {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
            </Button>
          ));
        })}
      </div>
    );
  }

  // Render the subscribe modal
  return (
    <Modal
      title="Subscribe today!"
      description="Listen to music with Dakify Premium."
      isOpen
      onChange={() => {}}
    >
      {content}
    </Modal>
  );
}

export default SubscribeModal;

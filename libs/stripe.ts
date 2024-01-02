import Stripe from "stripe";

// Stripe library
export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ?? "",
  {
    apiVersion: "2023-10-16",
    appInfo: {
      name: "Dakify",
      version: "0.1.0"
    }
  }
);

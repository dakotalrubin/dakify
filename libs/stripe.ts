import Stripe from "stripe";

// Create a new Stripe instance with the current API version
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

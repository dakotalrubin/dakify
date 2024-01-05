import { Stripe, loadStripe } from "@stripe/stripe-js";

// Create a Promise that either contains a Stripe object or nothing
let stripePromise: Promise<Stripe | null>;

// Asynchronously load the Stripe.js script and initialize a Stripe object
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
    );
  }

  // Return a Promise that resolves with a newly-created Stripe object
  return stripePromise;
};

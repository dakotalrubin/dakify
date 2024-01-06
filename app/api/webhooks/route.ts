import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/libs/stripe";
import {
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange
} from "@/libs/supabaseAdmin";

// Possible events that can occur using Stripe
const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "price.created",
  "price.updated",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted"
]);

// Webhook to submit a POST request
export async function POST(request: Request) {
  // Request body needs to be in text format for later use
  const requestBody = await request.text();

  // Return the values of the Stripe-Signature header
  const requestSignature = headers().get("Stripe-Signature");

  // Get the Stripe webhook secret
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Create a default event
  let event: Stripe.Event;

  // Try to build an event with the given data
  try {
    // If missing data, exit the function
    if (!webhookSecret || !requestSignature) {
      return;
    }

    // Build an event with the given data
    event = stripe.webhooks.constructEvent(
      requestBody,
      requestSignature,
      webhookSecret
    );
  } catch (error: any) {
    // If there's an error, return a "400 Bad Request" status code
    return new NextResponse(
      `Webhook Error: ${error.message}`,
      { status: 400 }
    );
  }

  // Make sure the current event is a pre-defined event type
  if (relevantEvents.has(event.type)) {
    // Handle different event types
    try {
      switch (event.type) {
        case "product.created":
        case "product.updated":
          await upsertProductRecord(event.data.object as Stripe.Product);
          break;
        case "price.created":
        case "price.updated":
          await upsertPriceRecord(event.data.object as Stripe.Price);
          break;
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          // Get subscription data
          const subscription = event.data.object as Stripe.Subscription;

          // Trigger createAction to update the customer's subscription status
          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer as string,
            event.type === "customer.subscription.created"
          );
          break;
        case "checkout.session.completed":
          // Get checkout session data
          const checkoutSession = event.data.object as Stripe.Checkout.Session;

          if (checkoutSession.mode === "subscription") {
            // Get the ID associated with the subscription
            const subscriptionID = checkoutSession.subscription;

          // Trigger createAction to update the customer's subscription status
            await manageSubscriptionStatusChange(
              subscriptionID as string,
              checkoutSession.customer as string,
              true
            );
          }

          break;
        default:
          // Alert the user for an unhandled relevantEvent
          throw new Error("Case not handled!");
      }
    } catch (error: any) {
      // If there's an error, return a "400 Bad Request" status code
      return new NextResponse(
        `Webhook Error: ${error.message}`,
        { status: 400 }
      );
    }
  }

  // Return a "200 OK" status code for a successful request
  return NextResponse.json({ received: true }, { status: 200 });
}

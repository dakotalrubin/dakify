import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

import { Database } from "@/types_db";
import { Price, Product } from "@/types";
import { stripe } from "./stripe";
import { toDateTime } from "./helpers";

// Create a new Supabase client instance to interact with the database
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// Adding products to the Stripe dashboard inserts them into the database
const upsertProductRecord = async (product: Stripe.Product) => {
  // Fill product fields
  const productData: Product = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? undefined,
    image: product.images?.[0] ?? null,
    metadata: product.metadata
  };

  // Extract error data from inserting or updating product data
  const { error } = await supabaseAdmin
    .from("products").upsert([productData]);

  // Notify the user of any errors
  if (error) {
    throw error;
  }
}

// Adding prices to the Stripe dashboard inserts them into the database
const upsertPriceRecord = async (price: Stripe.Price) => {
  // Fill price fields
  const priceData: Price = {
    id: price.id,
    product_id: typeof price.product === "string" ? price.product : "",
    active: price.active,
    currency: price.currency,
    description: price.nickname ?? undefined,
    type: price.type,
    unit_amount: price.unit_amount ?? undefined,
    interval: price.recurring?.interval,
    interval_count: price.recurring?.interval_count,
    trial_period_days: price.recurring?.trial_period_days,
    metadata: price.metadata
  }

  // Extract error data from inserting or updating price data
  const { error } = await supabaseAdmin
    .from("prices").upsert([priceData]);

  // Notify the user of any errors
  if (error) {
    throw error;
  }
}

// Retrieve or create a customer's ID attribute
const createOrGetCustomer = async ({ email, uuid }: {
  email: string,
  uuid: string
}) => {
  // Get the customer ID from the "customers" table using the given user ID
  const { data, error } = await supabaseAdmin
    .from("customers").select("stripe_customer_id").eq("id", uuid).single();

  // Add customer data for the given user ID if profile doesn't already exist
  if (!data?.stripe_customer_id || error) {
    const customerData: {
      metadata: { supabaseUUID: string };
      email?: string;
    } = {
      metadata: {
        supabaseUUID: uuid
      }
    };

    // Set customer's email attribute to the given email address
    if (email) {
      customerData.email = email;
    }

    // Create customer profile from customer data
    const customer = await stripe.customers.create(customerData);

    // Extract error data from inserting new customer into "customers" table
    const { error: supabaseError } = await supabaseAdmin
      .from("customers")
      .insert([{ id: uuid, stripe_customer_id: customer.id }]);

    // Notify the user of any errors
    if (supabaseError) {
      throw supabaseError;
    }

    // Return the newly-created customer ID
    return customer.id;
  }

  // If customer profile already exists, return their customer ID from Stripe
  return data.stripe_customer_id;
}

// Update the "users" table with customer's billing address and payment method
const copyBillingDetailsForCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod
) => {
  // "customer" contains the customer ID where this PaymentMethod is saved
  const customer = payment_method.customer as string;

  // Extract customer name, phone number and address data from billing details
  const { name, phone, address } = payment_method.billing_details;

  // If no customer data from billing details, exit the function
  if (!name || !phone || !address) {
    return;
  }

  // @ts-ignore to handwave away incompatible types in this update
  await stripe.customers.update(customer, { name, phone, address });

  // Extract error data from updating the "users" table
  // with the customer's billing address and payment method info
  const { error } = await supabaseAdmin.from("users")
    .update({
      billing_address: { ...address },
      payment_method: { ...payment_method[payment_method.type] }
    }).eq("id", uuid);

  // Notify the user of any errors
  if (error) {
    throw error;
  }
}

// Update a customer's current subscription status through Stripe
const manageSubscriptionStatusChange = async (
  subscriptionID: string,
  customerID: string,
  createAction = false
) => {
  // Extract customer data and error info from "customers" table
  // using the given customer ID
  const { data: customerData, error: customerError } = await supabaseAdmin
    .from("customers").select("id")
    .eq("stripe_customer_id", customerID).single();

  // Notify the user of any errors
  if (customerError) {
    throw customerError;
  }

  // Extract user ID from customer data
  const { id: uuid } = customerData;

  // Fetch Stripe subscription info
  const subscription = await stripe.subscriptions.retrieve(
    subscriptionID,
    {
      expand: ["default_payment_method"]
    }
  );

  // Create subscription data for insertion into the database
  const subscriptionData: Database["public"]["Tables"]["subscriptions"]["Insert"] = {
    id: subscription.id,
    user_id: uuid,
    metadata: subscription.metadata,
    // @ts-ignore
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    // @ts-ignore
    quantity: subscription.quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    cancel_at: subscription.cancel_at ? toDateTime(subscription.cancel_at).toISOString() : null,
    canceled_at: subscription.canceled_at ? toDateTime(subscription.canceled_at).toISOString() : null,
    current_period_start: toDateTime(subscription.current_period_start).toISOString(),
    current_period_end: toDateTime(subscription.current_period_end).toISOString(),
    created: toDateTime(subscription.created).toISOString(),
    ended_at: subscription.ended_at ? toDateTime(subscription.ended_at).toISOString() : null,
    trial_start: subscription.trial_start ? toDateTime(subscription.trial_start).toISOString() : null,
    trial_end: subscription.trial_end ? toDateTime(subscription.trial_end).toISOString() : null
  }

  // Update or insert subscription data into the database
  const { error } = await supabaseAdmin.from("subscription")
    .upsert([subscriptionData]);

  // Notify the user of any errors
  if (error) {
    throw error;
  }

  // An expensive catch-all operation to update a customer's subscription status
  if (createAction && subscription.default_payment_method && uuid) {
    await copyBillingDetailsForCustomer(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod
    );
  }
}

// Export some helper methods
export {
  upsertProductRecord,
  upsertPriceRecord,
  createOrGetCustomer,
  manageSubscriptionStatusChange
}

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/libs/stripe";
import { getURL } from "@/libs/helpers";
import { createOrGetCustomer } from "@/libs/supabaseAdmin";

// Webhook to submit a POST request
export async function POST(request: Request) {
  // Extract price, quantity and metadata from request
  const { price, quantity = 1, metadata = {} } = await request.json();

  // Try to create a customer checkout session
  try {
    // Access Supabase client with Next.js auth helper
    const supabase = createRouteHandlerClient({ cookies });

    // Extract user data from Supabase client session
    const { data: { user } } = await supabase.auth.getUser();

    // Create or retrieve customer info
    const customer = await createOrGetCustomer({
      uuid: user?.id || "",
      email: user?.email || ""
    });

    // Create a customer checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer,
      line_items: [
        {
          price: price.id,
          quantity
        }
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      subscription_data: { metadata },
      success_url: `${getURL()}/account`,
      cancel_url: `${getURL()}/`
    });

    // Return customer session ID
    return NextResponse.json({ sessionID: session.id });
  } catch (error: any) {
    // Return a "500 Internal Server Error" status code for server-side issues
    return new NextResponse(
      "Internal Server Error",
      { status: 500 }
    );
  }
}

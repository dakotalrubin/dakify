import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/libs/stripe";
import { getURL } from "@/libs/helpers";
import { createOrGetCustomer } from "@/libs/supabaseAdmin";

// Webhook to submit a POST request
export async function POST() {
  // Try to create a portal link
  try {
    // Access Supabase client with Next.js auth helper
    const supabase = createRouteHandlerClient({ cookies });

    // Extraxt user data from Supabase client session
    const { data: { user } } = await supabase.auth.getUser();

    // If there's no user, create an error instance
    if (!user) {
      throw new Error("There's no user!");
    }

    // Create or retrieve customer info
    const customer = await createOrGetCustomer({
      uuid: user.id || "",
      email: user.email || ""
    });

    // If there's no customer, create an error instance
    if (!customer) {
      throw new Error("There's no customer!");
    }

    // Create a portal link tied to an individual user's account
    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${getURL()}/account`
    });

    // Return a valid portal link
    return NextResponse.json({ url });
  } catch (error: any) {
    // Return a "500 Internal Server Error" status code for server-side issues
    return new NextResponse(
      "Internal Server Error",
      { status: 500 }
    );
  }
}

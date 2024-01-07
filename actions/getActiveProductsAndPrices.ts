import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { ProductAndPrice } from "@/types";

// Asynchronously retrieve a specific user's available Stripe products
const getActiveProductsAndPrices = async (): Promise<ProductAndPrice[]> => {
  // Define a Supabase instance with cookies to communicate with the database
  const supabase = createServerComponentClient({ cookies: cookies });

  // Extract product and price info from "products" table in the database
  const { data, error } = await supabase.from("products").select("*, prices(*)")
    .eq("active", true).eq("prices.active", true).order("metadata->index")
    .order("unit_amount", { referencedTable: "prices" });

  // Return whatever data was found or an empty array
  return (data as any) || [];
}

export default getActiveProductsAndPrices;

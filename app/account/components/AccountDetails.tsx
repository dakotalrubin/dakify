// Required for client component to use React hooks
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import Button from "@/components/Button";

// AccountDetails component displays various user account details
const AccountDetails = () => {
  // Use a React hook that allows you to handle page routing state
  const router = useRouter();

  // Create a subscribe modal and enable onOpen and onClose methods
  const subscribeModal = useSubscribeModal();

  // Extract user, isLoading and subscription info from custom useUser hook
  const { isLoading, subscription, user } = useUser();

  // Create variable to track loading state
  const [loading, setLoading] = useState(false);

  // Call useEffect any time isLoading, user or page router updates
  useEffect(() => {
    // If the user isn't logged in, restrict account page access to
    // authenticated users only
    if (!user && !isLoading) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  // Redirect the user to the Stripe customer portal
  const redirectToPortal = async () => {
    // Update loading state
    setLoading(true);

    // Try to redirect the web page
    try {
      // Extract the URL and error info from the response to a POST request
      const { url, error } = await postData({
        url: "/api/create-portal-link"
      });

      // Navigate to the provided URL
      window.location.assign(url);
    } catch (error) {
      // Notify the user of any errors
      if (error) {
        toast.error((error as Error).message);
      }
    }

    // Update loading state
    setLoading(false);
  }

  // Render the user's account details: show whether the user has an active
  // subscription plan, and if true, allow them to cancel their current plan.
  // If the user doesn't have an active plan, allow them to subscribe.
  return (
    <div className="px-6 mb-7">
      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            No active subscription plan.
          </p>
          <Button
            className="w-[300px]"
            onClick={subscribeModal.onOpen}
          >
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are on the <b>{subscription?.prices?.products?.name}</b> plan.
          </p>
          <Button
            className="w-[300px]"
            onClick={redirectToPortal}
            disabled={loading || isLoading}
          >
            Open Customer Portal
          </Button>
        </div>
      )}
    </div>
  );
}

export default AccountDetails;

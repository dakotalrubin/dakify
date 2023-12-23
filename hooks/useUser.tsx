import { useContext, createContext, useState, useEffect } from "react";

import { User } from "@supabase/auth-helpers-nextjs";
import {
  useSessionContext,
  useUser as useSupabaseUser 
} from "@supabase/auth-helpers-react";

import { UserDetails, Subscription } from "@/types";

// Create a custom type that holds user context details
type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
}

// Props interface contains a prop name string
export interface Props {
  [propName: string]: any;
}

// Create a Context object with a default value of undefined
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Get all session context details from current user session
// to load user info and subscription status. This function
// will be used to confirm user authentication.
export const MyUserContextProvider = (props: Props) => {
  // Extract session, isLoading and supabaseClient from user session
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  // Get user info from Supabase
  const user = useSupabaseUser();

  // Get access token info from Supabase
  const accessToken = session?.access_token ?? null;

  // Create a state variable for tracking whether data is loading
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Create a UserDetails state variable for tracking user details
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  // Create a Subscription state variable for tracking subscription status
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  // Use Supabase to fetch user details from database
  const getUserDetails = () => supabase.from("users").select("*").single();

  // Use Supabase to fetch subscription status from database
  const getSubscription = () => 
    supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

  // Load user data into state variables every time the user
  // or the loading state changes
  useEffect(() => {
    // If a user is logged in and no data has been loaded
    // for user details or subscription status
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      // User details and subscription status are both fetched as promises
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          // Load user details if successful
          if (userDetailsPromise.status === "fulfilled") {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }

          // Load subscription status if successful
          if (subscriptionPromise.status === "fulfilled") {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }

          setIsLoadingData(false);
        }
      );
    // If a user isn't logged in and no user or data has been loaded,
    // reset the user state variables
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  // Collect all loaded user data from the current user session
  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription
  };

  // Return a UserContext Provider component with loaded user data and props
  return <UserContext.Provider value={value} {...props} />
}

// Overloads the default React useUser hook
export const useUser = () => {
  // Pass in a Context object returned by the createContext method
  const context = useContext(UserContext);

  // If UserContext has no user session data, throw an error
  if (context === undefined) {
    throw new Error("useUser hook needs to be called within a " +
      "MyUserContextProvider session.");
  }

  return context;
}

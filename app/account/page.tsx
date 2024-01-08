import Header from "@/components/Header";
import AccountDetails from "./components/AccountDetails";

// Data on the web page will always be up-to-date. The page won't be cached.
export const revalidate = 0;

// Render the page containing the user's account details
const Account = () => {
  // Render user account details
  return (
    <div className="h-full w-full rounded-lg overflow-hidden overflow-y-auto 
      bg-neutral-900">
      <Header className="from-bg-neutral-900">
        <div className="flex flex-col mb-2 gap-y-6">
          <h1 className="text-3xl font-semibold text-white">
            Account Settings
          </h1>
        </div>
      </Header>
      <AccountDetails />
    </div>
  );
}

export default Account;

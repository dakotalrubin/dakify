import Header from "@/components/Header";
import AccountDetails from "./components/AccountDetails";

// Render the page containing the user's account details
const Account = () => {
  return (
    <div className="h-full w-full rounded-lg overflow-hidden overflow-y-auto 
      bg-neutral-900">
      <Header className="from-bg-neutral-900">
        <div className="flex flex-col mb-2 gap-y-6">
          <h1 className="text-3xl font-semibold text-white">
            Account Details
          </h1>
        </div>
      </Header>
      <AccountDetails />
    </div>
  );
}

export default Account;

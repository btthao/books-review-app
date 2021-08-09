import { useApolloClient } from "@apollo/client";
import { useLogoutMutation } from "../generated/graphql";

const NotLoggedIn: React.FC = () => {
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  return (
    <div className="max-w-lg m-auto px-2 my-24 text-gray-200 text-center text-lg">
      <p>
        You&apos;re already logged in. Please log out first before continuing.
      </p>
      <button
        type="button"
        className="px-2 py-1 mt-4 rounded-md bg-teal-500 font-semibold  "
        onClick={async () => {
          await logout();
          await apolloClient.resetStore();
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default NotLoggedIn;

import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import { formErrors } from "../utils/formErrors";
import { useRouter } from "next/router";
import Button from "../components/Button";
import withApollo from "../utils/withApollo";
import { useApolloClient } from "@apollo/client";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const [firstLoad, setFirstLoad] = useState(true);

  if (loading) {
    return null;
  }

  if (!loading && firstLoad && data?.me) {
    return (
      <div className="max-w-md m-auto mt-10 text-center">
        <p>You're already logged in. Please log out first before continuing.</p>
        <button
          type="button"
          className="px-2 py-1 mt-4 rounded-md bg-teal-200 font-semibold  "
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
        >
          Log out
        </button>
      </div>
    );
  }
  return (
    <div className=" w-full max-w-sm m-auto p-6   ">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: { loginUserInput: values },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: data?.loginUser.user,
                },
              });
            },
          });
          if (response.data?.loginUser.user) {
            router.push("/");
          } else if (response.data?.loginUser.errors) {
            setErrors(formErrors(response.data.loginUser.errors));
          }
        }}
      >
        {({ isSubmitting }) => {
          setFirstLoad(false);
          return (
            <Form>
              <Input
                name="username"
                placeholder="usernames are case-sensitive"
              />
              <Input name="password" type="password" placeholder="password" />
              <div className="mt-6  m-auto">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  text="Login"
                  rounded
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default withApollo({ ssr: false })(Login);

import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery,
  useRegisterUserMutation,
} from "../generated/graphql";
import { formErrors } from "../utils/formErrors";
import { useRouter } from "next/router";
import Button from "../components/Button";
import withApollo from "../utils/withApollo";
import { useApolloClient } from "@apollo/client";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterUserMutation();
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
        <p>
          You're currently logged in. Please log out first before continuing.
        </p>
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
        validate={(values) => {
          const errors: { username?: string; password?: string } = {};
          if (values.username.length < 3 || values.username.length > 20) {
            errors.username = "Username must be between 3 and 15 characters";
          }
          if (values.password.length < 7 || values.password.length > 20) {
            errors.password = "Password must be between 7 and 15 characters";
          }
          return errors;
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { registerUserInput: values },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: data?.registerUser.user,
                },
              });
            },
          });
          if (response.data?.registerUser.user) {
            router.push("/");
          } else if (response.data?.registerUser.errors) {
            setErrors(formErrors(response.data.registerUser.errors));
          }
        }}
      >
        {({ isSubmitting }) => {
          setFirstLoad(false);
          return (
            <Form className="">
              <Input name="username" placeholder="Pick a name" />
              <Input name="password" type="password" placeholder="password" />
              <div className="mt-6  m-auto">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  text="Register"
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

export default withApollo({ ssr: false })(Register);

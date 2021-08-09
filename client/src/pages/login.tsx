import { useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import NotLoggedIn from "../components/NotLoggedIn";
import { useLoginMutation, useMeQuery } from "../generated/graphql";
import { formErrors } from "../utils/formErrors";
import withApollo from "../utils/withApollo";

const Login: React.FC = () => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const { data, loading } = useMeQuery();
  const [firstLoad, setFirstLoad] = useState(true);
  const apolloClient = useApolloClient();

  if (loading) {
    return null;
  }

  if (!loading && firstLoad && data?.me) {
    return <NotLoggedIn />;
  }
  return (
    <div className=" w-10/12 max-w-sm m-auto py-12 px-6  bg-gray-200 rounded-lg my-40  shadow-lg    ">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          setFirstLoad(false);
          const response = await login({
            variables: { loginUserInput: values },
          });
          if (response.data?.loginUser.user) {
            await apolloClient.resetStore();
            router.push("/");
          } else if (response.data?.loginUser.errors) {
            setErrors(formErrors(response.data.loginUser.errors));
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <Input
                name="username"
                placeholder="usernames are case-sensitive"
              />
              <Input name="password" type="password" placeholder="password" />
              <Button
                type="submit"
                disabled={isSubmitting}
                text="Login"
                className="w-full mt-6  bg-rose-300 rounded-3xl"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default withApollo({ ssr: false })(Login);

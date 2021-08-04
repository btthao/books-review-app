import { useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import NotLoggedIn from "../components/NotLoggedIn";
import {
  MeDocument,
  MeQuery,
  useMeQuery,
  useRegisterUserMutation,
} from "../generated/graphql";
import { formErrors } from "../utils/formErrors";
import withApollo from "../utils/withApollo";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterUserMutation();
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
    <div className=" w-11/12 max-w-sm m-auto py-12 px-6  bg-gray-200 rounded-md my-40 shadow-lg  ">
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values) => {
          const errors: { username?: string; password?: string } = {};
          if (values.username.length < 3 || values.username.length > 10) {
            errors.username = "Username must be between 3 and 10 characters";
          }
          if (values.password.length < 7 || values.password.length > 20) {
            errors.password = "Password must be between 7 and 20 characters";
          }
          return errors;
        }}
        onSubmit={async (values, { setErrors }) => {
          setFirstLoad(false);
          const response = await register({
            variables: { registerUserInput: values },
            // update: (cache, { data }) => {
            //   cache.writeQuery<MeQuery>({
            //     query: MeDocument,
            //     data: {
            //       me: data?.registerUser.user,
            //     },
            //   });
            // },
          });
          if (response.data?.registerUser.user) {
            await apolloClient.resetStore();
            router.push("/");
          } else if (response.data?.registerUser.errors) {
            setErrors(formErrors(response.data.registerUser.errors));
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="">
              <Input name="username" placeholder="Pick a name" />
              <Input name="password" type="password" placeholder="password" />

              <Button
                type="submit"
                disabled={isSubmitting}
                text="Register"
                className="w-full mt-6  m-auto bg-rose-300 rounded-3xl"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default withApollo({ ssr: false })(Register);

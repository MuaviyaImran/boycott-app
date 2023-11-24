import styles from "styles/Form.module.css";
import { useFormik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { validateLogin } from "utils/validateForms";
import _ from "lodash";
import { signInParams } from "types/types";
import PulseLoader from "react-spinners/PulseLoader";

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "muaviyaimran1122@gmail.com",
      password: "mu@viya123",
    },
    validate: validateLogin,
    onSubmit,
  });

  async function onSubmit(values: signInParams) {
    setError(false);
    setLoading(true);
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (status?.ok) router.push("/");
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <section className="flex items-center justify-center min-h-screen">
        <div className="w-5/6 max-width">
          <div className="title">
            <h1 className="text-center text-4xl font-bold text-gray-800">
              Sign In
            </h1>
          </div>
          {loading ? (
            <div className="visible flex flex-col h-screen items-center justify-center">
              <PulseLoader className="pulseLoader" size={20} />
              Loading...
            </div>
          ) : (
            <form
              onSubmit={formik.handleSubmit}
              className="m-auto flex flex-col gap-4"
            >
              <div>
                <label htmlFor="email">Email</label>
                <input
                  className={styles.input_text}
                  type="email"
                  id="email"
                  placeholder="Email"
                  autoComplete="off"
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <span className="text-rose-500">{formik.errors.email}</span>
              )}
              <div>
                <label htmlFor="password">Password</label>
                <div className="relative flex items-center">
                  <input
                    className={styles.input_text}
                    type="password"
                    id="password"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                  />
                </div>
              </div>
              {formik.errors.password && formik.touched.password && (
                <span className="text-rose-500">{formik.errors.password}</span>
              )}

              <div className="mt-4 flex flex-col gap-2">
                {error && (
                  <span className="text-center text-sm text-rose-500">
                    Something went wrong Email or password incorrect
                  </span>
                )}
                <button
                  type="submit"
                  className="w-full rounded-md bg-primary-backgroundC text-primary-fontC py-2  disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || !_.isEmpty(formik.errors)}
                >
                  Login
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

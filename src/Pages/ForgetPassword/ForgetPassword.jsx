import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email pattern is invalid"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: handleSubmit,

    validationSchema: schema,
  });

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );

      if (data.statusMsg == "success") {
        navigate("/verifyCode");
      }
    } catch (error) {
      setErrMsg(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <p className="h2 mb-4">Please enter your email</p>

      <form onSubmit={formik.handleSubmit}>
        <input
          {...formik.getFieldProps("email")}
          name="email"
          type="email"
          id="email"
          placeholder="Email"
          className="mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
        />

        <button
          type="submit"
          disabled={isLoading || !formik.isValid || !formik.dirty}
          className="btn form-btn text-center "
        >
          {isLoading ? (
            <LiaSpinnerSolid className=" animate-spin" />
          ) : (
            "Send verifying code"
          )}
        </button>
      </form>

      {errMsg ? (
        <div
          className="flex items-center p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>{errMsg}</div>
        </div>
      ) : null}
    </div>
  );
}

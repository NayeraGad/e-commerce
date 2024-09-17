import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

const inputs = [
  { id: "email", value: "email", type: "email" },
  { id: "password", value: "password", type: "password" },
];

export default function Login() {
  const { setToken, setBaseURL } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validation Schema
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email pattern is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[a-zA-Z][a-zA-z0-9]{5,8}$/,
        "Password must:<br/>* Start with a letter (either uppercase or lowercase).<br/>* Be between 6 and 9 characters in total.<br/>* Can only contain letters (A-Z or a-z) and numbers (0-9)"
      ),
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: handleSubmit,

    validationSchema: schema,
  });

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      // Post user data to API
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      if (data.message == "success") {
        console.log(window.location.origin);
        
        setToken(data.token);
        setBaseURL(window.location.origin);
        navigate("/");
      }
    } catch (error) {
      setErrMsg(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-12">
      <h2 className="mb-2">Login Now</h2>

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

      <form onSubmit={formik.handleSubmit} className="mt-6">
        {inputs.map((input) => (
          <div className="mb-5" key={input.id}>
            <label
              htmlFor={input.id}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
            >
              {input.id} :
            </label>

            <input
              {...formik.getFieldProps(`${input.value}`)}
              name={input.value}
              type={input.type}
              id={input.id}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:outline-none focus:ring-green-500 focus:border-green-500 block
               w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400
               dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            />

            {formik.touched[input.value] && formik.errors[input.value] ? (
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: formik.errors[input.value],
                  }}
                />
              </div>
            ) : null}
          </div>
        ))}

        <div className="flex justify-between items-center">
          <Link
            to={"/forgetPassword"}
            className="text-xl font-medium transition hover:text-green-500"
          >
            Forget your password ?
          </Link>

          <button
            type="submit"
            disabled={isLoading || !formik.isValid || !formik.dirty}
            className="btn form-btn"
          >
            {isLoading ? (
              <LiaSpinnerSolid className=" animate-spin" />
            ) : (
              "Login Now"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

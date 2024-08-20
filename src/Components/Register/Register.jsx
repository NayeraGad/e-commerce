import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

const inputs = [
  { id: "name", value: "name", type: "text" },
  { id: "email", value: "email", type: "email" },
  { id: "password", value: "password", type: "password" },
  { id: "re-password", value: "rePassword", type: "password" },
  { id: "phone", value: "phone", type: "tel" },
];

export default function Register() {
  const { setToken } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validation Schema
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name min length is 3"),
    email: Yup.string()
      .required("Email is required")
      .email("Email pattern is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[a-zA-Z][a-zA-z0-9]{5,8}$/,
        "Password must:<br/>* Start with a letter (either uppercase or lowercase).<br/>* Be between 6 and 9 characters in total.<br/>* Can only contain letters (A-Z or a-z) and numbers (0-9)"
      ),
    rePassword: Yup.string()
      .required("Re-password is required")
      .oneOf([Yup.ref("password")], "Re-Password does not matches password"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    onSubmit: handleSubmit,

    validationSchema: schema,
  });

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      // Post user data to API
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      if (data.message == "success") {
        setToken(data.token);
        navigate("/login");
      }
    } catch (error) {
      setErrMsg(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-12">
      <h2 className="mb-2">Register Now</h2>

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

      <form onSubmit={formik.handleSubmit} className="">
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            />

            {/* Alert map */}
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

        <button
          type="submit"
          disabled={isLoading || !formik.isValid || !formik.dirty}
          className="btn form-btn ms-auto"
        >
          {isLoading ? (
            <LiaSpinnerSolid className=" animate-spin" />
          ) : (
            "Register Now"
          )}
        </button>
      </form>
    </div>
  );
}

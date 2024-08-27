import { useFormik } from "formik";
import { useContext, useState } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";

const inputs = [
  { id: "details", value: "details", type: "text" },
  { id: "phone", value: "phone", type: "tel" },
  { id: "city", value: "city", type: "text" },
];

export default function CheckOut() {
  const { cartId } = useParams();

  const { checkOutSession } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(false);

  // Validation Schema
  const schema = Yup.object().shape({
    details: Yup.string().required("Details are required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
    city: Yup.string().required("City name is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: handleSubmit,

    validationSchema: schema,
  });

  async function handleSubmit(values) {
    setIsLoading(true);

    const { data } = await checkOutSession(cartId, values);
    console.log(data);
    if (data.status === "success") {
      window.location.href = data.session.url;
    }

    setIsLoading(false);
  }

  return (
    <div className="container mx-auto py-12">
      <h2 className="mb-2">Checkout</h2>

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
              className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:outline-none focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
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
          <button
            type="submit"
            disabled={isLoading || !formik.isValid || !formik.dirty}
            className="btn form-btn w-full disabled:border-green-500 "
          >
            {isLoading ? (
              <LiaSpinnerSolid className=" animate-spin mx-auto" />
            ) : (
              "Pay Now"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

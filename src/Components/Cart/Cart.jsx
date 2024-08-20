import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const {
    getUserCart,
    updateProduct,
    deleteProductFromCart,
    deleteUserCart,
    setCartItems,
  } = useContext(CartContext);
  const navigate = useNavigate();

  async function getLoggedUserCart() {
    const { data } = await getUserCart();

    if (data && data.status == "success") {
      setCartDetails(data.data);
    }
  }

  async function updateProductQuantity(id, count) {
    const { data } = await updateProduct(id, count);

    if (data && data.status == "success") {
      setCartDetails(data.data);
    }
  }

  async function deleteCartProduct(id) {
    const { data } = await deleteProductFromCart(id);

    if (data.status === "success") {
      setCartItems(data.numOfCartItems);
      setCartDetails(data.data);
    }
  }

  async function deleteCart() {
    const { data } = await deleteUserCart();
    console.log(data);

    if (data.message == "success") {
      setCartItems(0);
      navigate("/");
      // setCartDetails(null);
    }
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <div className="container">
      <h2 className="mt-3 mb-6 text-green-500">Cart Details</h2>

      {cartDetails == null ? (
        <p className=" text-xl font-bold">your cart is empty</p>
      ) : (
        <>
          <div className="flex justify-between items-center mb-3 text-lg font-medium">
            <p>
              Total Price:{" "}
              <span className=" text-green-500">
                {cartDetails?.totalCartPrice}
              </span>
            </p>
            <span>Total number of items:</span>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                {cartDetails?.products.map((prod) => (
                  <tr
                    key={prod._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {/* Product Image */}
                    <td className="p-4">
                      <img
                        src={prod.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={prod.product.title}
                      />
                    </td>

                    {/* Product Title */}
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {prod.product.title}
                    </td>

                    {/* Product Price */}
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {prod.price}
                    </td>

                    {/* Quantity Btn */}
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateProductQuantity(
                              prod.product._id,
                              prod.count - 1
                            )
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>

                        <span>{prod.count}</span>

                        <button
                          onClick={() =>
                            updateProductQuantity(
                              prod.product._id,
                              prod.count + 1
                            )
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>

                    {/* Delete product */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteCartProduct(prod.product._id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}

                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700
            hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <button className="btn" onClick={() => deleteCart()}>
                      Clear Your Cart
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

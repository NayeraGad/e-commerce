import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import InnerLoading from "../../Components/InnerLoading/InnerLoading";
import { LiaSpinnerSolid } from "react-icons/lia";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState({});

  const {
    getUserCart,
    updateProduct,
    deleteProductFromCart,
    deleteUserCart,
    setCartItems,
    setOwnerId,
  } = useContext(CartContext);
  const navigate = useNavigate();

  async function getLoggedUserCart() {
    setIsLoading(true);
    const { data } = await getUserCart();
    if (data && data.status === "success") {
      setCartDetails(data);
      setOwnerId(data.data.cartOwner);
    }
    setIsLoading(false);
  }

  async function updateProductQuantity(id, count) {
    setIsUpdating((prevState) => ({ ...prevState, [id]: true }));
    const { data } = await updateProduct(id, count);

    if (data && data.status === "success") {
      setCartDetails(data);
    }
    setIsUpdating((prevState) => ({ ...prevState, [id]: false }));
  }

  async function deleteCartProduct(id) {
    setIsDeleting(true);
    const { data } = await deleteProductFromCart(id);

    if (data.status === "success") {
      setCartItems(data.numOfCartItems);
      setCartDetails(data);
      toast.success("Product is removed from your cart");
    }
    setIsDeleting(false);
  }

  async function deleteCart() {
    setIsDeleting(true);
    const { data } = await deleteUserCart();

    if (data.message === "success") {
      setCartItems(0);
      navigate("/");
      toast.success("Your cart is empty");
      // setCartDetails(null);
    }
    setIsDeleting(false);
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <h2 className="mt-3 mb-6 text-green-500">Cart</h2>

      {isLoading && <Loading />}

      {cartDetails == null ? (
        <p className="text-xl font-bold">Your cart is empty</p>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-3 text-lg font-medium">
            {isDeleting && <InnerLoading />}
            <p>
              Total Price:{" "}
              <span className="text-green-500">
                {cartDetails.data?.totalCartPrice}
              </span>
            </p>
            <span>
              Total number of items:{" "}
              <span className="text-green-500">
                {cartDetails.numOfCartItems}
              </span>
            </span>
          </div>

          <div className="shadow-md sm:rounded-lg p-4">
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              {cartDetails.data?.products.map((prod) => (
                <div
                  key={prod._id}
                  className="flex flex-wrap flex-col justify-center items-center gap-y-3 py-4 md:flex-row"
                >
                  <div className="md:w-3/12 md:pr-4">
                    <img
                      src={prod.product.imageCover}
                      alt={prod.product.title}
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center md:w-3/12 lg:flex-row lg:gap-x-8">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {prod.product.title}
                    </h4>

                    <span className="font-semibold text-gray-900 dark:text-white">
                      {prod.price}
                    </span>
                  </div>

                  <div className="flex justify-center items-center md:w-3/12 lg:justify-end">
                    <button
                      onClick={() =>
                        updateProductQuantity(prod.product._id, prod.count - 1)
                      }
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      disabled={isUpdating[prod.product._id]}
                      type="button"
                    >
                      {isUpdating[prod.product._id] ? (
                        <LiaSpinnerSolid className="animate-spin" />
                      ) : (
                        <div>
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
                        </div>
                      )}
                    </button>

                    <span>{prod.count}</span>

                    <button
                      onClick={() =>
                        updateProductQuantity(prod.product._id, prod.count + 1)
                      }
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      disabled={isUpdating[prod.product._id]}
                      type="button"
                    >
                      {isUpdating[prod.product._id] ? (
                        <LiaSpinnerSolid className="animate-spin" />
                      ) : (
                        <div>
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
                        </div>
                      )}
                    </button>
                  </div>

                  <div className="flex justify-end md:w-3/12">
                    <button
                      onClick={() => deleteCartProduct(prod.product._id)}
                      className="flex items-center gap-x-1 font-medium transition text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-600"
                    >
                      Remove
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex flex-col justify-between sm:flex-row gap-y-2">
                <button className="btn" onClick={deleteCart}>
                  Clear Your Cart
                </button>

                <Link to={`/checkout/${cartDetails?.data._id}`} className="btn">
                  Check Out
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

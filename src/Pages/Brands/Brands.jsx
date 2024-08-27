import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import { useState } from "react";
import InnerLoading from "../../Components/InnerLoading/InnerLoading";

export default function Brands() {
  const [brandId, setBrandId] = useState(null);

  const {
    data: brands,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: () => axios("https://ecommerce.routemisr.com/api/v1/brands"),
    select: (data) => data.data.data,
  });

  const {
    data: brand,
    isLoading: isBrandLoading,
    isError: isBrandError,
    error: isBrandErrorMsg,
  } = useQuery({
    queryKey: ["brand", brandId],
    queryFn: () =>
      axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`),
    select: (data) => data.data.data,
    enabled: !!brandId,
  });

  if (isError) {
    return <h3 className="container">{JSON.stringify(error.message)}</h3>;
  }

  if (isBrandError) {
    return (
      <h3 className="container">{JSON.stringify(isBrandErrorMsg.message)}</h3>
    );
  }

  const closeModal = () => setBrandId(null);

  return (
    <div className="container">
      <h2 className="my-7 text-green-500 h1 text-center">Brands</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mx-auto">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="mx-auto bg-white border rounded-md dark:bg-gray-800 dark:border-gray-700 transition duration-500 hover:shadow-[1px_1px_10px_#4fa74f]"
                type="button"
                onClick={() => setBrandId(brand._id)}
              >
                <div>
                  <img
                    className="rounded-t-md object-cover object-center"
                    src={brand.image}
                    alt={brand.name}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-center font-medium dark:text-white">
                    {brand.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {brandId &&
            (isBrandLoading ? (
              <InnerLoading />
            ) : (
              <div
                id="modal-overlay"
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={closeModal}
              >
                <div
                  id="default-modal"
                  className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-2xl max-h-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={closeModal}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  <div className="p-4 md:p-5 space-y-4">
                    <h3 className="text-green-500">{brand.name}</h3>
                    <img src={brand.image} alt={brand.name} />
                  </div>

                  <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      type="button"
                      className="py-2.5 px-5 ms-auto text-sm font-medium transition duration-300 text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-600 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

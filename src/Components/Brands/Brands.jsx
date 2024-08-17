import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

export default function Brands() {
  const [isLoading, setIsLoading] = useState(false)
  const [brands, setBrands] = useState([]);

  async function getBrands() {
    setIsLoading(true)
    const { data } = await axios(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );

    setBrands(data.data)
    setIsLoading(false)
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="container">
      <h2 className="my-7 text-green-500 h1 text-center">Brands</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mx-auto">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="mx-auto bg-white border rounded-md dark:bg-gray-800 dark:border-gray-700 transition duration-500 hover:shadow-[1px_1px_10px_#4fa74f]"
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
      )}
    </div>
  );
}

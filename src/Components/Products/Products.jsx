import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";

export default function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  async function getProducts() {
    setIsLoading(true);
    const { data } = await axios(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    console.log(data.data);

    setProducts(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) {
    return <>Loading.....</>;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-y-5">
      {products.map((product) => (
        <div
          key={product.id}
          className="group cursor-pointer hover:rounded-md transition-shadow duration-500 hover:shadow-[1px_1px_10px_#4fa74f] overflow-hidden px-5 md:px-3 py-6"
        >
          <div className="product-img">
            <img src={product.imageCover} alt={product.title} />
          </div>

          <div className="product-info flex flex-col gap-1">
            <span className="text-green-500">{product.category.name}</span>
            <h3 className="sm:h4">
              {product.title.split(" ").slice(0, 2).join(" ")}
            </h3>

            <div className="flex justify-between">
              <span>{product.price} L.E</span>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{product.ratingsAverage}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-7">
              <button className="grow opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 btn">
                + Add to Cart
              </button>
              <FaHeart className="cursor-pointer text-xl transition duration-300 hover:text-red-600" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

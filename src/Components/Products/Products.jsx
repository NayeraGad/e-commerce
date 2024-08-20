import axios from "axios";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

export default function Products() {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/products"),
    select: (data) => data.data.data,
  });

  const { addProductToCart, setCartItems } = useContext(CartContext);

  async function addProduct(id) {
    const { data } = await addProductToCart(id);

    if (data.status === "success") {
      setCartItems(data.numOfCartItems);
      alert("Product is added to your cart");
    }
  }

  if (isError) {
    return <h3>{JSON.stringify(error.message)}</h3>;
  }

  return (
    <div className="container">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-y-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="group cursor-pointer hover:rounded-md transition-shadow duration-500 hover:shadow-[1px_1px_10px_#4fa74f] overflow-hidden px-5 md:px-3 py-6"
            >
              <Link to={`/productDetails/${product._id}`}>
                <div>
                  <div className="product-img">
                    <img src={product.imageCover} alt={product.title} />
                  </div>
                  <div className="product-info flex flex-col gap-1">
                    <span className="text-green-500">
                      {product.category.name}
                    </span>
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
                  </div>
                </div>
              </Link>

              <div className="flex items-center justify-center gap-7">
                <button
                  className="grow opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 btn"
                  onClick={() => addProduct(product._id)}
                >
                  + Add to Cart
                </button>

                <button>
                  <FaHeart className="text-xl transition duration-300 hover:text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

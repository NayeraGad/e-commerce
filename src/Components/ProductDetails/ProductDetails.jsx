import axios from "axios";
import { FaHeart, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { wishContext } from "../../Context/WishContext";

export default function ProductDetails() {
  const { id } = useParams();

  const {
    data: productDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () =>
      axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
    select: (data) => data.data.data,
  });

  const { addProductToCart, setCartItems } = useContext(CartContext);
  const { getWishList, addWishList, deleteWishList } = useContext(wishContext);

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  async function addProduct(id) {
    setLoading(true);
    const { data } = await addProductToCart(id);

    if (data.status === "success") {
      setCartItems(data.numOfCartItems);
      alert("Product is added to your cart");
    }
    setLoading(false);
  }

  function handleAddWishList(id) {
    setLoading(true);
    if (wishlist.includes(id)) {
      deleteWishList.mutate(id);
      setWishlist((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      addWishList.mutate(id);
      setWishlist((prev) => [...prev, id]);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (getWishList.data) {
      setWishlist(getWishList.data.map((item) => item._id));
    }
  }, [getWishList.data]);

  if (isError) {
    return <h3>{JSON.stringify(error.message)}</h3>;
  }

  return (
    <div className="container">
      {isLoading || loading ? (
        <Loading />
      ) : (
        <div className="grid md:grid-cols-12">
          <div className="col-span-4 p-5">
            <img src={productDetails.imageCover} alt={productDetails.title} />
          </div>

          <div className="col-span-8 flex flex-col gap-4 p-5 self-center">
            <h3>{productDetails.title}</h3>

            <p className="font-light text-gray-500 dark:text-white">
              {productDetails.description}
            </p>

            <h4>{productDetails.category.name}</h4>

            <div className="flex justify-between">
              <span>{productDetails.price} L.E</span>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{productDetails.ratingsAverage}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-7">
              <button
                className="grow btn"
                onClick={() => addProduct(productDetails._id)}
              >
                + Add to Cart
              </button>

              <button onClick={() => handleAddWishList(productDetails._id)}>
                <FaHeart
                  className={`text-xl transition duration-300 hover:text-red-600 ${
                    wishlist.includes(productDetails._id)
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

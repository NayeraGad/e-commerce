import axios from "axios";
import { FaHeart, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { wishContext } from "../../Context/WishContext";
import Slider from "react-slick";
import toast from "react-hot-toast";
import InnerLoading from "../../Components/InnerLoading/InnerLoading";

export default function ProductDetails() {
  const { id } = useParams();

  // Slider Settings
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: () => (
      <div>
        <div className="dots" />
      </div>
    ),
  };

  // Get product details
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
      toast.success("Product is added to your cart", { icon: "🛒" });
    }
    setLoading(false);
  }

  async function handleAddWishList(id) {
    setLoading(true);
    try {
      if (wishlist.includes(id)) {
        await deleteWishList(id);
        setWishlist((prev) => prev.filter((itemId) => itemId !== id));
        toast.success("Product is removed to your wishlist");
      } else {
        await addWishList(id);
        setWishlist((prev) => [...prev, id]);
        toast.success("Product is added to your wishlist", { icon: "❤" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12">
          {loading && <InnerLoading />}
          <div className="col-span-4 p-5 ">
            <Slider {...settings}>
              {productDetails.images.map((img) => (
                <img
                  src={img}
                  key={img}
                  alt={productDetails.title}
                  className="cursor-grab mb-2"
                />
              ))}
            </Slider>
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

import axios from "axios";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import { wishContext } from "../../Context/WishContext";
import Loading from "../../Components/Loading/Loading";
import InnerLoading from "../../Components/InnerLoading/InnerLoading";
import toast from "react-hot-toast";

export default function Products() {
  const {
    data: products,
    isLoading: isGetProduct,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/products"),
    select: (data) => data.data.data,
  });

  const { addProductToCart, setCartItems } = useContext(CartContext);
  const { getWishList, addWishList, deleteWishList } = useContext(wishContext);

  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchItems, setSearchItems] = useState("");

  useEffect(() => {
    if (getWishList.data) {
      setWishlist(getWishList.data.map((item) => item._id));
    }
  }, [getWishList.data]);

  async function addProduct(id) {
    setIsLoading(true);
    try {
      const { data } = await addProductToCart(id);
      if (data.status === "success") {
        setCartItems(data.numOfCartItems);
        toast.success("Product is added to your cart", { icon: "🛒" });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddWishList(id) {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  }

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchItems.toLowerCase())
  );

  if (isError) {
    return <h3>{JSON.stringify(error.message)}</h3>;
  }

  return (
    <div className="container">
      {isGetProduct ? (
        <Loading />
      ) : (
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full mb-6 px-4 py-1 border rounded-md focus:outline-none focus:shadow-[0_0_5px_#4fa74f] "
            value={searchItems}
            onChange={(e) => setSearchItems(e.target.value)}
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-y-5">
            {isLoading && <InnerLoading />}
            {filteredProducts.length == 0 ? (
              <p>No products found</p>
            ) : (
              filteredProducts.map((product) => (
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
                    <button onClick={() => handleAddWishList(product._id)}>
                      <FaHeart
                        className={`text-xl transition duration-300 hover:text-red-600 ${
                          wishlist.includes(product._id)
                            ? "text-red-600"
                            : "text-gray-500"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

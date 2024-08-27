import { useContext, useState } from "react";
import { wishContext } from "../../Context/WishContext";
import { FaTrash } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";
import { CartContext } from "../../Context/CartContext";
import InnerLoading from "../../Components/InnerLoading/InnerLoading";
import toast from "react-hot-toast";

export default function WishList() {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { getWishList, deleteWishList } = useContext(wishContext);
  const { addProductToCart, setCartItems } = useContext(CartContext);

  const {
    data: wishList,
    isLoading: isGettingWishList,
    error,
    isError,
  } = getWishList;

  async function addProduct(id) {
    setIsAddingToCart(true);
    try {
      const { data } = await addProductToCart(id);
      if (data.status === "success") {
        setCartItems(data.numOfCartItems);
        await deleteWishList(id);
        toast.success("Product is added to your cart", { icon: "🛒" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsAddingToCart(false);
    }
  }

  async function handleDelete(id) {
    setIsDeleting(true);
    await deleteWishList(id);
    toast.success("Product is removed from your wishlist");
    setIsDeleting(false);
  }

  if (isGettingWishList) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <h2 className="mt-3 mb-6 text-green-500">Wish List</h2>

      {!wishList || wishList.length === 0 ? (
        <div>No items in the wish list</div>
      ) : (
        <div className="text-left shadow-md md:rounded-lg rtl:text-right md:container">
          {wishList.map((item) => (
            <div
              key={item._id}
              className="flex flex-wrap items-center p-3 [&:not(:last-child)]:border-b"
            >
              <div className="md:w-3/12 md:pr-4">
                <img src={item.imageCover} alt={item._id} />
              </div>

              <div className="flex grow justify-between items-center mt-5 mb-4 md:mb-0">
                <div className="flex flex-col gap-y-2 max-w-[60%]">
                  <h3>{item.title}</h3>
                  <span className="text-green-500">{item.price} LE</span>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center transition text-red-600 hover:text-red-500"
                  >
                    <FaTrash className="mr-1" /> Remove
                  </button>
                </div>

                <div>
                  <button onClick={() => addProduct(item._id)} className="btn">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}

          {(isAddingToCart || isDeleting) && <InnerLoading />}
        </div>
      )}
    </div>
  );
}

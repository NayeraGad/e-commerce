import { useContext } from "react";
import { wishContext } from "../../Context/WishContext";
import { FaTrash } from "react-icons/fa";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/CartContext";

export default function WishList() {
  const { getWishList, deleteWishList } = useContext(wishContext);
  const { addProductToCart, setCartItems } = useContext(CartContext);

  const {
    data: wishList,
    isLoading: isGettingWishList,
    error,
    isError,
  } = getWishList;
  const isDeleting = deleteWishList.isLoading;

  async function addProduct(id) {
    const { data } = await addProductToCart(id);

    if (data.status === "success") {
      setCartItems(data.numOfCartItems);
      deleteWishList.mutate(id);
      alert("Product is added to your cart");
    }
  }

  if (isGettingWishList || isDeleting) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleDelete = (id) => {
    deleteWishList.mutate(id);
  };

  return (
    <div className="container">
      <h2 className="mt-3 mb-6 text-green-500">Wish List</h2>

      {!wishList || wishList.length === 0 ? (
        <div>No items in the wish list</div>
      ) : (
        <div className="text-left shadow-md sm:rounded-lg rtl:text-right md:container">
          {wishList.map((item) => (
            <div
              key={item._id}
              className="flex flex-wrap items-center p-3 [&:not(:last-child)]:border-b"
            >
              <div className="sm:w-3/12 bg-sky-600">
                <img src={item.imageCover} alt={item._id} />
              </div>

              <div className="flex grow justify-between items-center mt-5 mb-4 sm:mb-0">
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
        </div>
      )}
    </div>
  );
}

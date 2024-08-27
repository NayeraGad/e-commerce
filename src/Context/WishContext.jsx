import { createContext } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const wishContext = createContext();

export default function WishContextProvider({ children }) {
  const token = localStorage.getItem("token");
  const headers = { token };
  const queryClient = useQueryClient();

  const getWishList = useQuery({
    queryKey: ["wishList"],
    queryFn: () =>
      axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers }),
    select: (data) => data.data.data,
  });

  async function addWishList(id) {
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: id },
        { headers }
      );
      queryClient.refetchQueries(["wishList"]);
    } catch (error) {
      console.error("Error adding item to wish list", error);
    }
  }

  async function deleteWishList(id) {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          headers,
        }
      );
      queryClient.refetchQueries(["wishList"]);
    } catch (error) {
      console.error("Error deleting item from wish list", error);
    }
  }

  return (
    <wishContext.Provider value={{ getWishList, addWishList, deleteWishList }}>
      {children}
    </wishContext.Provider>
  );
}

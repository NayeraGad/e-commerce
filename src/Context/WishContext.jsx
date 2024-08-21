import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";

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

  const addWishList = useMutation({
    mutationFn: (id) =>
      axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId : id },
        {
          headers,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishList"]);
    },
  });

  const deleteWishList = useMutation({
    mutationFn: (id) =>
      axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishList"]);
    },
  });

  return (
    <wishContext.Provider value={{ getWishList, deleteWishList, addWishList }}>
      {children}
    </wishContext.Provider>
  );
}

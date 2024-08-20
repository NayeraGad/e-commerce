import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState(0)
  const token = localStorage.getItem("token");
  const headers = { token };

  function getUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((data) => data)
      .catch((err) => err);
  }

  function addProductToCart(p_id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: p_id },
        { headers }
      )
      .then((data) => data)
      .catch((err) => err);
  }

  function updateProduct(p_id, count) {
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${p_id}`,
      { count },
      { headers }
    );
  }

  function deleteProductFromCart(p_id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${p_id}`, {
        headers,
      })
      .then((data) => data)
      .catch((err) => err);
  }

  function deleteUserCart() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((data) => data)
      .catch((err) => err);
  }

  async function getCart() {
  const {data} = await getUserCart()

  if(data.status == 'success' ) {
    setCartItems(data.numOfCartItems);
  }
  }

  useEffect(() => {
    getCart()
  }, [])

  return (
    <CartContext.Provider
      value={{
        getUserCart,
        addProductToCart,
        updateProduct,
        deleteProductFromCart,
        deleteUserCart,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState(0);
  const [ownerId, setOwnerId] = useState(localStorage.getItem("ownerId"));
  const { token } = useContext(UserContext);
  const BaseURL = localStorage.getItem("baseURL");
  const headers = { token };

  async function getUserCart() {
    if (token) {
      try {
        const { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/cart",
          { headers }
        );
        if (data.status === "success") {
          setOwnerId(data.data.cartOwner); // Save cart owner ID
          localStorage.setItem("ownerId", data.data.cartOwner); // Save cart owner ID to localStorage
          setCartItems(data.numOfCartItems);
          return data;
        }
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    }
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

  function checkOutSession(cartId, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${BaseURL}`,
        {
          shippingAddress,
        },
        { headers }
      )
      .then((data) => data)
      .catch((err) => err);
  }

  useEffect(() => {
    getUserCart();
  }, [token]);

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
        checkOutSession,
        setOwnerId,
        ownerId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

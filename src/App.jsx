import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Products from "./Pages/Products/Products";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Categories from "./Pages/Categories/Categories";
import CheckOut from "./Pages/CheckOut/CheckOut";
import AllOrders from "./Pages/AllOrders/AllOrders";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import VerifyCode from "./Pages/VerifyCode/VerifyCode";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import NotFound from "./Pages/NotFound/NotFound";
import Brands from "./Pages/Brands/Brands";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import WishList from "./Pages/WishList/WishList";
import Layout from "./Components/Layout/Layout";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import UserContextProvider from "./Context/UserContext";
import CartContextProvider from "./Context/CartContext";
import WishContextProvider from "./Context/WishContext";
import { Toaster } from "react-hot-toast";

const x = createBrowserRouter([
  {
    path: "/e-commerce/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },

      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },

      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },

      {
        path: "wishList",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },

      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },

      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },

      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },

      {
        path: "checkout/:cartId",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },

      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "register",
        element: <Register />,
      },

      {
        path: "forgetPassword",
        element: <ForgetPassword />,
      },

      {
        path: "verifyCode",
        element: <VerifyCode />,
      },

      {
        path: "resetPassword",
        element: <ResetPassword />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <CartContextProvider>
          <WishContextProvider>
            <RouterProvider router={x}></RouterProvider>
            <Toaster
              toastOptions={{
                position: "top-right",
                duration: 2000,
                success: {
                  style: {
                    color: "#16a34a",
                  },
                },
              }}
            />
          </WishContextProvider>
        </CartContextProvider>
      </UserContextProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

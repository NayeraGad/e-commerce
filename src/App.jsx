import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Home from "./Components/Home/Home";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Cart from "./Components/Cart/Cart";
import NotFound from "./Components/NotFound/NotFound";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import CartContextProvider from "./Context/CartContext";

const x = createHashRouter([
  {
    path: "",
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
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
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
          <RouterProvider router={x}></RouterProvider>
        </CartContextProvider>
      </UserContextProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

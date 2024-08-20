import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import logoLight from "../../assets/images/logo-light.svg";
import {
  FaFacebook,
  FaLinkedinIn,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { UserContext } from "../../Context/UserContext";
import { TiShoppingCart } from "react-icons/ti";
import { CartContext } from "../../Context/CartContext";

const navLinks = [
  { url: "", name: "Home" },
  { url: "products", name: "products" },
  { url: "categories", name: "categories" },
  { url: "brands", name: "brands" },
  { url: "cart", name: "cart" },
];

const socialMedia = [
  { url: "https://www.facebook.com/", element: <FaFacebook /> },
  { url: "https://www.twitter.com/", element: <FaTwitter /> },
  { url: "https://www.linkedin.com/", element: <FaLinkedinIn /> },
  { url: "https://www.youtube.com/", element: <FaYoutube /> },
  { url: "https://www.tiktok.com/", element: <FaTiktok /> },
];

export default function Navbar() {
  const { token, setToken } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    const html = document.querySelector("html");

    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  });

  function logOut() {
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-50 border-gray-200 dark:bg-gray-900 dark:shadow-sm dark:shadow-black">
      <div className="container flex flex-wrap items-center gap-5 p-4">
        <NavLink
          to=""
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={isDarkMode ? logoLight : logo}
            alt="logo"
            // className="w-28"
          />
        </NavLink>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center ms-auto p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          id="navbar-default"
          className="hidden grow w-full lg:flex justify-between items-center lg:w-auto"
        >
          {/* Navbar Links if user is not signed */}
          {!token && (
            <ul className="font-medium flex flex-col lg:ms-auto lg:items-center px-4 lg:p-0 lg:flex-row lg:space-x-8 rtl:space-x-reverse dark:bg-gray-800 lg:dark:bg-gray-900">
              <li>
                <NavLink
                  to="login"
                  className="block capitalize py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-500 transition lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="register"
                  className="block capitalize py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-500 transition lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                  Register
                </NavLink>
              </li>
            </ul>
          )}

          {/* Navbar Links if user signed */}
          {token && (
            <div className="grow w-full lg:flex justify-between items-center lg:w-auto">
              <ul className="font-medium flex flex-col px-4 lg:p-0 mt-4 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.url}
                      className="block capitalize py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-500 transition lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <ul className="font-medium flex lg:items-center justify-center px-4 lg:p-0 lg:space-x-8 rtl:space-x-reverse dark:bg-gray-800 lg:dark:bg-gray-900">
                {socialMedia.map((link) => (
                  <li key={link.url}>
                    <NavLink
                      to={link.url}
                      target="_blank"
                      className="block capitalize py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-500 transition lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                    >
                      {link.element}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <span
                onClick={logOut}
                className="block cursor-pointer capitalize py-2 text-center text-gray-900 font-bold rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-500 transition lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Log out
              </span>

              <span className="relative flex justify-center items-center p-2 lg:py-0 w-fit mx-auto lg:mx-0">
                <TiShoppingCart className="text-4xl" />
                <span className="absolute top-1 end-2 px-1 bg-green-500 rounded-md text-white text-sm lg:-top-1">
                  {cartItems}
                </span>
              </span>
            </div>
          )}

          <span className="block py-2 px-7 text-center lg:py-0">
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? (
                <MdDarkMode className="text-white transition-colors hover:text-yellow-400" />
              ) : (
                <MdLightMode className="transition-colors hover:text-yellow-400" />
              )}
            </button>
          </span>
        </div>
      </div>
    </nav>
  );
}

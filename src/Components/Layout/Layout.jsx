import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export default function Layout() {
  const {token} = useContext(UserContext)
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-12 py-12">
        <Outlet />
      </div>
      {token && <Footer />}
    </>
  );
}

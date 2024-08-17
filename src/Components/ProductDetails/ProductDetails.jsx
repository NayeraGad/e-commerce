import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);

  const { id } = useParams();

  async function getProductDetails(id) {
    const { data } = await axios(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );

    console.log(data.data);
    setProductDetails(data.data);
  }

  useEffect(() => {
    getProductDetails(id);
  }, []);

  return (
    <div className="container">
      {productDetails == null ? (
        <Loading />
      ) : (
        <div className="grid md:grid-cols-12">
          <div className="col-span-4 p-5">
            <img src={productDetails.imageCover} alt={productDetails.title} />
          </div>

          <div className="col-span-8 flex flex-col gap-4 p-5 self-center">
            <h3>{productDetails.title}</h3>

            <p className="font-light text-gray-500 dark:text-white">{productDetails.description}</p>

            <h4>{productDetails.category.name}</h4>

            <div className="flex justify-between">
              <span>{productDetails.price} L.E</span>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{productDetails.ratingsAverage}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-7">
              <button className="grow btn">+ Add to Cart</button>
              <FaHeart className="cursor-pointer text-xl transition duration-300 hover:text-red-600" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

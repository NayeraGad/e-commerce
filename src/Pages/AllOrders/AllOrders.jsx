import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";

export default function AllOrders() {
  const { ownerId } = useContext(CartContext);

  let { data: orders, isLoading } = useQuery({
    queryKey: ["userOrders"],
    queryFn: () =>
      axios(`https://ecommerce.routemisr.com/api/v1/orders/user/${ownerId}`),
    select: (data) => data.data,
  });

  const formateDate = (date) => {
    const cartDate = new Date(date);
    return cartDate.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const userOrders = orders
    ? orders.map((order) => ({
        ...order,
        formattedDate: formateDate(order.updatedAt),
      }))
    : [];

  console.log(userOrders);

  return (
    <div className="container">
      <h2 className="mb-8 text-green-500">All Orders</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {userOrders.map((order) => (
            <div key={order.id} className="border shadow-md mb-6 p-5 md:px-10">
              <h3>{order.formattedDate}</h3>
              <div>
                <div className="flex justify-between mt-4">
                  <span>
                    Payed:{" "}
                    <span
                      className={
                        order.isPaid ? "text-green-500" : "text-gray-500"
                      }
                    >
                      {order.isPaid ? "True" : "False"}
                    </span>
                  </span>

                  <span>
                    Delivered:{" "}
                    <span
                      className={
                        order.isDelivered ? "text-green-500" : "text-gray-500"
                      }
                    >
                      {order.isDelivered ? "True" : "False"}
                    </span>
                  </span>
                </div>
                <div>
                  {order.cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex flex-col items-center md:flex-row md:gap-x-5 [&:not(:last-child)]:border-b [&:not(:last-child)]:pb-4"
                    >
                      <div className="md:w-3/12">
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                        />
                      </div>
                      <div className="text-center md:text-left">
                        <h3>{item.product.title}</h3>
                        <span className="block">{item.price} L.E</span>
                        <span className="block">Amount: {item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

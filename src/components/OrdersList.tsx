import { useEffect, useState } from "react";
import { Order } from "../interfaces/orderType";
import SingleOrder from "./SingleOrder";
import { SingleOrderProps } from "../interfaces/singleOrderPropsType";

const OrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<string>('asc');

  useEffect(() => {
    (async () => {
      try {
        const dataURL = '/data/ordersData.json';
        const response = await fetch(dataURL);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const sortOrders = (order: string) => {
    const sortedOrders = [...orders].sort((a, b) => {
      if (order === 'asc') {
        return a.farmName.localeCompare(b.farmName);
      } else {
        return b.farmName.localeCompare(a.farmName);
      }
    });
    setOrders(sortedOrders);
  };

  const handleSortChange = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    sortOrders(newSortOrder);
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading orders...</div>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Orders List</h1>
        <button
          onClick={handleSortChange}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Sort by Farm Name ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Farm Name
            </th>
            <th scope="col" className="px-6 py-3">
              Order ID
            </th>
            <th scope="col" className="px-6 py-3">
              Created Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 && orders.map((order: SingleOrderProps) => (
            <SingleOrder
              id={order.id}
              farmName={order.farmName}
              createdDate={order.createdDate}
              key={order.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersList;

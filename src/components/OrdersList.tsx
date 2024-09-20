import { useEffect, useMemo, useState } from "react";
import { Order } from "../interfaces/orderType";
import SingleOrder from "./SingleOrder";
import { SingleOrderProps } from "../interfaces/singleOrderPropsType";
import { getOrders } from "../apis";

const OrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);


  useEffect(() => {
    (async () => {
      const data = await getOrders()
      setOrders(data);
      setFilteredOrders(data);
      setLoading(false);
    })();
  }, []);


  const sortedOrders = useMemo(() => [...filteredOrders].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.farmName.localeCompare(b.farmName);
    } else {
      return b.farmName.localeCompare(a.farmName);
    }
  }), [filteredOrders, sortOrder]);


  const handleSortChange = () => {
    setSortOrder(order => order === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterChange = () => {
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be greater than end date.");
      return;
    }

    const filtered = orders.filter(order => {
      const orderDate = new Date(order.createdDate);
      const isAfterStart = !startDate || orderDate >= new Date(startDate);
      const isBeforeEnd = !endDate || orderDate <= new Date(endDate);
      return isAfterStart && isBeforeEnd;
    });

    setFilteredOrders(filtered);
  };

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setFilteredOrders(orders);
  };

  const exportToCSV = () => {
    const csvRows = [
      ["Farm Name", "Order ID", "Created Date"],
      ...filteredOrders.map(order => [order.farmName, order.id, order.createdDate])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading orders...</div>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Orders List</h1>
        <div className="flex items-center space-x-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-2 py-1 border rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-2 py-1 border rounded"
          />
          <button
            onClick={handleFilterChange}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Filter by Date
          </button>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Clear Filters
          </button>
          <button
            onClick={handleSortChange}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Sort by Farm Name ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
          </button>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Export to CSV
          </button>
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Farm Name</th>
            <th scope="col" className="px-6 py-3">Order ID</th>
            <th scope="col" className="px-6 py-3">Created Date</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.length > 0 && sortedOrders.map((order: SingleOrderProps) => (
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

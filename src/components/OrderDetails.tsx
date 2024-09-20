import { useParams } from "react-router-dom"

const OrderDetails = () => {
  const { orderId } =  useParams()
  return (
    <h1>OrderDetails { orderId }</h1>
  )
}

export default OrderDetails

import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <div className="container mx-auto p-12">
      <Outlet />
    </div>
  )
}

export default RootLayout
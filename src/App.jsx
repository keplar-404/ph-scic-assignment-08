// react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// components
import LayoutMain from "./pages/layout/MainLayout";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    errorElement: (
      <div className="bg-white w-full h-screen flex justify-center items-center">
        <p className="text-[3rem] font-medium">
          <span className="text-red-700">404</span> page not found
        </p>
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;

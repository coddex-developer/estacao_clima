import { createBrowserRouter } from "react-router-dom";
import Products from "./components/pages/Products";
import Home from "./components/pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/products",
        element: <Products />
    },

])

export default router
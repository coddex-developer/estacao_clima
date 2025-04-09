import { createHashRouter } from "react-router-dom";
import Products from "./components/pages/Products";
import Home from "./components/pages/Home";

const router = createHashRouter([
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
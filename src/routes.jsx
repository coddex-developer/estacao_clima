import { createHashRouter } from "react-router-dom";
import Products from "./components/pages/Products";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";

const router = createHashRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/products",
        element: <Products />
    },
    {
        path: "/services",
        element: <Services />
    }
])

export default router
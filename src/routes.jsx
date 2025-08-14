import { createBrowserRouter, createHashRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";

const router = createHashRouter([
    {
        path: "/",
        element: <LandingPage />
    }
])

export default router
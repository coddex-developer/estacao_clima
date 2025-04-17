import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.min.css"

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const urlLogo = "https://i.imgur.com/An2oFPn.png";

  return (
    <>
      <nav className="navbar md:bg-gray-200  border-gray-200  z-40 fixed w-full h-20 z-index-[1] dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={urlLogo} className="h-12" alt="Logo" />
          </a>

          <div className="flex md:order-2">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-900 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className={`items-center justify-between mt-2 w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? "block" : "hidden"
              }`}
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium  md:border-transparent rounded-lg bg-gray-200 md:flex-row md:space-x-8 md:mt-0 md:bg-transparent dark:bg-gray-900 md:dark:bg-transparent dark:border-gray-700">

              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-300 md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500"
                >
                  <i class="bi bi-house"></i> Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-300 md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500"
                >
                  <i class="bi bi-cart4"></i> Produtos
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-300 md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500"
                >
                  <i class="bi bi-snow3"></i> Serviços
                </Link>
              </li>

              <li>
                <a
                  href="https://wa.me/+5561996654539"
                  target="_blank"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-300 md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:text-blue-500"
                >
                  <i class="bi bi-whatsapp"></i> Contato
                </a>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

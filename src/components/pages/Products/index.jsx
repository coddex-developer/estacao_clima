import { useState } from "react";
import Footer from "../../Footer";
import Navbar from "../../Navbar";
import products from "../../../database.json";

function Products() {
  const [visibleCount, setVisibleCount] = useState(10);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const groupedProducts = products.reduce((acc, product) => {
    product.type.forEach((category) => {
      if (!acc[category]) acc[category] = [];
      acc[category].push(product);
    });
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 dark:bg-gray-800 min-h-screen transition-colors duration-300 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mt-20 mb-6 text-center text-gray-800 dark:text-gray-300">
          Produtos
        </h1>

        {Object.entries(groupedProducts).map(([category, products]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              {category}
            </h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.slice(0, visibleCount).map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between bg-white border border-gray-800 rounded-2xl shadow-lg overflow-hidden dark:bg-gray-700 dark:border-gray-900 transition-all hover:shadow-xl hover:border-gray-900"
                >
                  <img
                    className="w-full h-48 object-contain object-center bg-white p-2"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="p-5 flex flex-col flex-grow">
                    <h5 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-300">
                      {product.name}
                    </h5>
                    <ul className="mb-4 text-sm text-gray-800 dark:text-gray-300 list-disc list-inside space-y-1 flex-grow">
                      {product.info.map((detail, idx) => (
                        <li key={idx}>{detail.item}</li>
                      ))}
                    </ul>
                    <a
                      href="https://wa.me/5561996654539?text=Olá,+vim+através+da+loja+virtual+e+gostaria+de+saber+mais+sobre+um+produto."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block w-full text-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-500 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                    >
                      Fale conosco
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {visibleCount < products.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 text-sm font-medium text-gray-800 border border-gray-800 rounded-lg hover:border-gray-900 hover:text-gray-900 dark:text-gray-300 dark:border-gray-900 dark:hover:border-gray-800"
            >
              Carregar mais
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Products;
import ErrorPage from "components/errorPage";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import showToast from "utils/toast";
import React, { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { ProductType } from "types/types";
import { ProductCard } from "components/productCard";
import SuggestionModal from "components/suggestionModal";

const Homepage: React.FC = () => {
  const [products, setProducts] = useState<Array<ProductType>>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<ProductType>>([]);

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    if (searchQuery === "") setSearchResults([]);
  }, [searchQuery]);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    localStorage.setItem("categories", JSON.stringify(uniqueCategories));
  }, [products]);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getProducts`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("productList", JSON.stringify(data));
        setProducts(data);
      } else {
        const errorData = await response.json();
        showToast(errorData.message);
      }
      setLoading(false);
    } catch (e) {
      if (e instanceof Error) {
        console.error("Error:", e);
        showToast(e.message);
      }
    }
  };

  const handleSearch = () => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="bg-primary-fontC my-2">
        <ToastContainer />
        {loading ? (
          <div className="visible flex flex-col h-screen items-center justify-center">
            <PulseLoader className="pulseLoader" size={20} />
            Loading...
          </div>
        ) : products.length === 0 && !loading ? (
          <ErrorPage text="Sorry! No Products Found" isLogin={false} />
        ) : (
          <div className="max-width sm:px-3 px-5">
            <SuggestionModal />
            <div className="flex items-center justify-end">
              <div className="flex border border-purple-200 rounded m-2">
                <input
                  type="text"
                  className="block w-full px-4 py-2 text-black bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  className="px-4 text-white bg-purple-600 border-l rounded "
                >
                  Search
                </button>
              </div>
            </div>
            <div className="flex justify-end text-gray-600 m-2">
              Products {" ("}
              {searchResults.length === 0 || searchQuery === "" ? (
                <span>{products.length}</span>
              ) : (
                <span>{searchResults.length}</span>
              )}
              {")"}
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {searchResults.length !== 0 && searchQuery != ""
                ? searchResults?.map((product, index) => (
                    <div className="h-[82vh]" key={index + product?.name}>
                      <ProductCard
                        name={product?.name}
                        category={product?.category}
                        counrtyOfProduction={product?.counrtyOfProduction}
                        image={product?.image}
                        uploadedAt={product?.uploadedAt}
                      />
                    </div>
                  ))
                : products?.map((product, index) => (
                    <div key={index + product?.name}>
                      <ProductCard
                        name={product?.name}
                        category={product?.category}
                        counrtyOfProduction={product?.counrtyOfProduction}
                        image={product?.image}
                        uploadedAt={product?.uploadedAt}
                      />
                    </div>
                  ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Homepage;

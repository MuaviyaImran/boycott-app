import { useState, useEffect } from "react";
import { FC } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { faBucket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertToLocaleString } from "utils/functions";
import { ProductInventoryTypes } from "types/types";
import Head from "next/head";
import showToast from "utils/toast";

import { ToastContainer } from "react-toastify";

const PaymentHistory: FC = () => {
  const [productList, setProductList] = useState<ProductInventoryTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductInventoryTypes[]>(
    []
  );

  useEffect(() => {
    setProductList(JSON.parse(localStorage.getItem("productList") ?? "[]"));
  },[]);
  const handleSearch = () => {
    const filteredProducts = productList.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };
  const tableHeader = [
    "#",
    "ID",
    "Category",
    "Origin",
    "Name",
    "Uploaded",
    "Actions",
  ];
  const handleDelete = async (productID: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/removeProduct?productID=${productID}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        const updatedItems = productList.filter(
          (item) => item._id !== productID
        );
        setProductList(updatedItems);
        // Update the local storage with the new array
        localStorage.setItem("productList", JSON.stringify(updatedItems));
        showToast(data.message);

        setLoading(false);
      } else {
        const errorData = await response.json();
        showToast(errorData.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Failed to fetch books.");
      setLoading(false);
    }
  };
  return (
    <div>
      <Head>
        <title>Inventory</title>
      </Head>
      {loading ? (
        <div className="flex justify-center items-center px-5 py-3">
          <PulseLoader color="#FF8B4B" size={20} />
        </div>
      ) : (
        <div className="w-full">
          <Navbar />
          <ToastContainer />
          <div className="mx-4 h-[81vh] overflow-auto rounded-xl my-8">
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
            <table className="flextable-auto w-full  bg-slate-200 ">
              <thead className="border-b-2 border-dashed border-[#44576D] py-3">
                <tr className="">
                  {tableHeader.map((headerItem, index) => {
                    return (
                      <th
                        key={headerItem + index}
                        className="md:py-4 px-2 text-primary-backgroundC md:text-[18px] slg:text-[24px] text-[15px] whitespace-nowrap py-2"
                      >
                        {headerItem}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="py-4">
                {searchResults?.length > 0 && searchQuery != ""
                  ? searchResults?.map((item, index) => {
                      const serialNumber = index + 1;
                      delete item.image;
                      delete item.__v;
                      item.uploadedAt = convertToLocaleString(item.uploadedAt);
                      return (
                        <tr
                          key={item._id + item.name + index}
                          className="border-b-2 border-slate-50"
                        >
                          <td className="md:py-6 slg:px-7 px-2 text-center text-black-100 slg:text-[22px] font-bold md:text-[18px] py-2 text-[12px]">
                            {serialNumber}
                          </td>
                          {Object.values(item).map((value, index) => {
                            return (
                              <td
                                key={item._id + value + index}
                                className="md:py-6 slg:px-7 px-2 text-center text-black-100 slg:text-[22px] font-bold md:text-[18px] py-2 text-[12px]"
                              >
                                {value}
                              </td>
                            );
                          })}
                          <td className="md:py-6 slg:px-7 px-2 text-center text-[red] cursor-pointer slg:text-[22px] font-bold md:text-[18px] py-2 text-[12px]">
                            <FontAwesomeIcon
                              icon={faBucket}
                              className="cursor-pointer"
                            />
                          </td>
                        </tr>
                      );
                    })
                  : productList?.map((item, index) => {
                      const serialNumber = index + 1;
                      delete item.image;
                      delete item.__v;
                      item.uploadedAt = convertToLocaleString(item.uploadedAt);
                      return (
                        <tr
                          key={item._id + item.name + index}
                          className="border-b-2 border-slate-50"
                        >
                          <td className="md:py-6 slg:px-7 px-2 text-center text-black-100 slg:text-[22px] font-bold md:text-[18px] py-2 text-[12px]">
                            {serialNumber}
                          </td>
                          {Object.values(item).map((value, index) => {
                            return (
                              <td
                                key={item._id + value + index}
                                className="md:py-6 slg:px-7 px-2 text-center text-black-100 slg:text-[22px] font-bold md:text-[18px] py-2 text-[12px]"
                              >
                                {value}
                              </td>
                            );
                          })}
                          <td
                            onClick={() => handleDelete(item._id)}
                            className="md:py-6 slg:px-7 px-2 text-center text-[red] cursor-pointer slg:text-[22px] font-bold md:text-[18px] py-2 text-[12px]"
                          >
                            <FontAwesomeIcon
                              icon={faBucket}
                              className="cursor-pointer"
                            />
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;

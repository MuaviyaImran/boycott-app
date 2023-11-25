import { useState, useEffect } from "react";
import { FC } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { faBucket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import showToast from "utils/toast";
import { ToastContainer } from "react-toastify";
import ErrorPage from "components/errorPage";
import { useSession } from "next-auth/react";
import { SuggestionsTypes } from "types/types";
import { convertToLocaleString } from "utils/functions";

const Suggestions: FC = () => {
  const session = useSession().data;
  const [suggestions, setSuggestions] = useState<SuggestionsTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getSuggestions();
  }, []);
  const getSuggestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSuggestion`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
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
  const tableHeader = ["#", "ID", "Name", "Uploaded", "Actions"];

  const handleDelete = async (suggestionID: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/removeSuggestion?suggestionID=${suggestionID}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        showToast(data.message);
        getSuggestions();
        setLoading(false);
      } else {
        const errorData = await response.json();
        showToast(errorData.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Failed Deletion.");
      setLoading(false);
    }
  };
  if (session?.user) {
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
            {suggestions.length === 0 ? (
              <div className="h-[90vh] flex items-center justify-center">
                <ErrorPage
                  text="No Suggestions Right Now...!"
                  isLogin={false}
                />
              </div>
            ) : (
              <div className="mx-4 h-[81vh] overflow-auto rounded-xl my-8">
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
                    {suggestions?.map((item, index) => {
                      item.uploadedAt = convertToLocaleString(item.uploadedAt);
                      delete item.__v;
                      const serialNumber = index + 1;
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
            )}
            <Footer />
          </div>
        )}
      </div>
    );
  } else {
    return (
      <ErrorPage
        text="You Are not autorized to use this page."
        isLogin={true}
      />
    );
  }
};

export default Suggestions;

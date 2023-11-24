import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import showToast from "utils/toast";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UploadCategoryForm: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [isFilled, setIsFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (category==="") setIsFilled(false);
    else setIsFilled(true)
  }, [category]);

  const uploadCategory = async () => {
    if (category) {
      setLoading(true);
      try {
        const myArray = JSON.parse(localStorage.getItem("categories") ?? "[]");
        if (!myArray.includes(category)) {
          const newArray = [...myArray, category];
          localStorage.setItem("categories", JSON.stringify(newArray));
          router.refresh();
        } else {
          toast("Category already exists.");
          setCategory("");
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error("Error:", e);
          showToast(e.message);
        }
      }
      setLoading(false);
    }
  };
  return loading ? (
    <div className="visible flex flex-col h-screen items-center justify-center">
      <PulseLoader className="pulseLoader" size={20} />
      Loading...
    </div>
  ) : (
    <div className="w-full p-6">
      <h2 className="mb-4 text-2xl">Upload Category</h2>
      <form>
        <label className="mb-4 block">
          <span className="text-gray-700">Category Name:</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-primary-backgroundC p-3 shadow-sm ring-primary-backgroundC focus:border-primary-backgroundC focus:ring-primary-backgroundC"
            placeholder="Enter category..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <div className="text-center ">
          <button
            onClick={uploadCategory}
            disabled={!isFilled}
            type="button"
            className={`rounded-md  bg-primary-backgroundC px-4 py-2 text-white ${
              isFilled ? "cursor-pointer" : "cursor-not-allowed opacity-50"
            }`}
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};
export default UploadCategoryForm;

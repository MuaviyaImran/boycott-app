import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import showToast from "utils/toast";
const UploadProductForm: React.FC = () => {
  const session = useSession().data;
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [counrtyOfProduction, setCounrtyOfProduction] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isFilled, setIsFilled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (name && image && counrtyOfProduction && category) setIsFilled(true);
  }, [name, image, counrtyOfProduction, category]);

  const uploadProduct = async () => {
    if (category) {
      setLoading(true);

      const body = {
        name: name,
        image: image,
        counrtyOfProduction: counrtyOfProduction,
        category: category,
        email: session?.user?.email,
      };
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/uploadProduct`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          showToast(data.message);
          clearFormFields();
        } else {
          const data = await response.json();
          showToast(data.message);
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
  const categories: string[] = JSON.parse(
    localStorage.getItem("categories") ?? "[]"
  );
  const clearFormFields = () => {
    setImage("");
    setCategory("");
    setCounrtyOfProduction("");
    setName("");
  };
  return loading ? (
    <div className="visible flex flex-col h-screen items-center justify-center">
      <PulseLoader className="pulseLoader" size={20} />
      Loading...
    </div>
  ) : (
    <div className="w-full p-6">
      <h2 className="mb-4 text-2xl">Upload Product</h2>
      <form>
        <label className="mb-4 block">
          <span className="text-gray-700">Product Name:</span>
          <input
            type="text"
            placeholder="Enter product name..."
            className="mt-1 block w-full rounded-md border border-primary-backgroundC p-3 shadow-sm ring-primary-backgroundC focus:border-primary-backgroundC focus:ring-primary-backgroundC"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="mb-4 block">
          <span className="text-gray-700">Product Category:</span>
          <select
            className="mt-1 block w-full rounded-md border border-primary-backgroundC p-3 shadow-sm ring-primary-backgroundC focus:border-primary-backgroundC focus:ring-primary-backgroundC"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option className="text-[#9CA3AF]" value="">
              Select a category...
            </option>
            {categories?.map((categoryName: string, index: number) => (
              <option key={index + categoryName} value={categoryName}>
                {categoryName}
              </option>
            ))}
          </select>
        </label>
        <label className="mb-4 block">
          <span className="text-gray-700">Product Image:</span>
          <input
            type="text"
            placeholder="Enter product image URL..."
            className="mt-1 block w-full rounded-md border border-primary-backgroundC p-3 shadow-sm ring-primary-backgroundC focus:border-primary-backgroundC focus:ring-primary-backgroundC"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label className="mb-4 block">
          <span className="text-gray-700">Country Of Origin:</span>
          <input
            type="text"
            placeholder="Enter products's country of origin..."
            className="mt-1 block w-full rounded-md border border-primary-backgroundC  p-3 shadow-sm ring-primary-backgroundC  focus:border-primary-backgroundC  focus:ring-primary-backgroundC "
            value={counrtyOfProduction}
            onChange={(e) => setCounrtyOfProduction(e.target.value)}
          />
        </label>
        <div className="text-center ">
          <button
            onClick={uploadProduct}
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
export default UploadProductForm;

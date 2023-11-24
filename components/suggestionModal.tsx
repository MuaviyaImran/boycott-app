import React, { useContext, useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { MyContext } from "utils/contextProvider";
import showToast from "utils/toast";

const SuggestionModal = () => {
  const context = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState<string>("");
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (productName === "") setIsFilled(false);
    else setIsFilled(true);
  }, [productName]);

  useEffect(() => setIsOpen(context?.show as boolean),[context?.show]);

  const onCloseModal = () => {
    context?.setShow(false);
  };
  const uploadProduct = async () => {
    const body = {
      name: productName,
    };
    try {
      const response = await fetch("/api/uplloadProductSuggestion", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        showToast(data.message);
        setProductName("");
        onCloseModal();
      } else {
        const data = await response.json();
        showToast(data.message);
        onCloseModal();
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error("Error:", e);
        showToast(e.message);
      }
    }
  };
  return (
    <div className="text-center ">
      <Modal open={isOpen} onClose={onCloseModal}>
        <strong>
          <p>Want to Suggest a Product?</p>
        </strong>
        <form className="flex items-end gap-3 mt-5">
          <label className="block">
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-primary-backgroundC p-2 shadow-sm ring-primary-backgroundC focus:border-primary-backgroundC focus:ring-primary-backgroundC"
              placeholder="Enter Product..."
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>
          <div className="text-center">
            <button
              onClick={uploadProduct}
              disabled={!isFilled}
              type="button"
              className={`rounded-md  bg-primary-backgroundC px-4 py-2 text-white 
              ${isFilled ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
              `}
            >
              Upload
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SuggestionModal;

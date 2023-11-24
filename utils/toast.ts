import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = async (msg: string) => {
  return toast(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};
export default showToast;

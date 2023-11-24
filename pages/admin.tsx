import Head from "next/head";
import { PulseLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import showToast from "utils/toast";
import Navbar from "components/Navbar";
import ErrorPage from "components/errorPage";
import UploadProductForm from "components/uploadProductForm";
import UploadCategoryForm from "components/uploadCategoryForm";
import Footer from "components/Footer";

const Admin: React.FC = () => {
  const session = useSession().data;
  const router = useRouter();

  if (session?.user) {
    return (
      <>
        <Head>
          <title>Product Upload</title>
        </Head>
        <header>
          <Navbar />
        </header>
        <div className="max-width w-full justify-center items-center h-[90vh]">
          <div className="flex justify-end p-6 text-primary-backgroundC">
            <span
              onClick={() => router.push("/productInventory")}
              className="hover:bg-slate-200 hover:cursor-pointer rounded-md p-2"
            >
              Inventory
            </span>
          </div>
          <ToastContainer />
          <div className="flex flex-col">
            <UploadCategoryForm />
            <UploadProductForm />
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return <ErrorPage text="You Are not autorized to use this page." />;
  }
};
export default Admin;

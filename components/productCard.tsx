import { ProductType } from "types/types";
import { convertToLocaleString } from "utils/functions";
import Image from "next/image";
export function ProductCard({
  name,
  category,
  counrtyOfProduction,
  image,
  uploadedAt,
}: ProductType) {
  return (
    <div className="border rounded-lg shadow bg-gray-800 border-gray-700">
      <Image
        className="rounded-t-lg bg-primary-fontC h-[150px]"
        width={700}
        height={300}
        src={image}
        alt={name + " branding picture."}
      ></Image>

      <div className="p-3 text-xs">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-primary-fontC">
          {name}
        </h5>
        <p className="mb- font-normal text-gray-400">
          <span className="text-white ">Category: </span>
          <span className="">{category}</span>
        </p>
        <p className="mb- font-normal ">
          <span className="text-white ">Country: </span>
          <span
            className={`${
              counrtyOfProduction === "Israel"
                ? "text-[red] font-bold"
                : "text-gray-400"
            }`}
          >
            {counrtyOfProduction}
          </span>
        </p>
        <p className="mt-2 font-normal  text-gray-400 text-right">
          Uploaded On: {convertToLocaleString(uploadedAt as unknown as string)}
        </p>
      </div>
    </div>
  );
}

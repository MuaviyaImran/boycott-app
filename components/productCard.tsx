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
        className="rounded-t-lg"
        width={500}
        height={300}
        src={image}
        alt={name + " branding picture."}
      ></Image>

      <div className="p-3 text-xs">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-primary-fontC">
          {name}
        </h5>
        <p className="mb-1 font-normal text-gray-400">
          <span className="text-white ">Category: </span>
          <span className="">{category}</span>
        </p>
        <p className="mb-1 font-normal ">
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
        <p className="mt-3 font-normal  text-gray-400 text-right">
          Uploaded On: {convertToLocaleString(uploadedAt as unknown as string)}
        </p>
      </div>
    </div>
  );
}

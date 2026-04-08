"use client";

import { data } from "framer-motion/client";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../(layoutPage)/layout";

export interface ListIngredientsType {
  meals: IngredientsType[];
}

export interface IngredientsType {
  idIngredient?: string;
  strIngredient?: string;
  strDescription?: null | string;
  strThumb?: string;
  strType?: null | string;
}

export default function ListIngredients() {
  const [dataIngredients, setDataIngredients] = useState<IngredientsType[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchIngredients, setSearchIngredients] = useState<IngredientsType[]>(
    [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

  useEffect(() => {
    const ingredients = async () => {
      setLoading(true);
      try {
        const dataIngredients = fetch(url);

        if (!dataIngredients) throw new Error("Error");

        const resIngredients = await dataIngredients;
        const jsonIngredients: ListIngredientsType =
          await resIngredients.json();
        console.log(jsonIngredients.meals);
        setDataIngredients(jsonIngredients.meals);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    ingredients();
  }, []);

  const searchIngredientsHandle = async (term: string) => {
    setSearchTerm(term);
    const search = dataIngredients.filter((item) =>
      item.strIngredient?.toLowerCase().includes(term.toLowerCase()),
    );
    setSearchIngredients(search);
  };

  const showMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const displayIngredients =
    searchTerm === "" ? dataIngredients : searchIngredients;
  const isNotFound = searchTerm !== "" && searchIngredients.length <= 0;

  return (
    <>
      <Layout>
        <div className="py-4 md:px-4">
          <h3 className="text-xl font-bold"> Search by Ingredients</h3>
          <div className="border border-gray-300 rounded-full flex flex-row justify-between px-6 items-center mt-4 relative w-full">
            <input
              value={searchTerm}
              onChange={(e) => searchIngredientsHandle(e.target.value)}
              type="text"
              placeholder="Cheese..."
              className="border-none p-2 w-[90%]"
            />

            <Search size={20} className=" text-gray-400 w-fit" />
          </div>

          <div>
            {loading && (
              <div className="w-full flex items-center justify-center mt-10 text-base">
                {" "}
                Loading ...{" "}
              </div>
            )}

            {isNotFound && !loading ? (
              <div className="text-center py-4 text-black mt-10">
                {" "}
                Data tidak ditemukan{" "}
              </div>
            ) : (
              <ul className="md:justify-start md:mx-auto flex flex-row flex-wrap justify-center overflow-hidden mt-4">
                {displayIngredients
                  .slice(0, visibleCount)
                  .map((item, index) => (
                    <Link
                      key={index}
                      href={`/meals/${item.strIngredient?.toLowerCase()}`}
                    >
                      <li
                        className="mx-0 w-[150px] xl:w-[140px] border justify-center border-gray-200 h-[150px]
                 flex flex-col items-center"
                      >
                        {item.strThumb ? (
                          <div>
                            <Image
                              src={item.strThumb}
                              alt={`img-${item.strIngredient}`}
                              width={80}
                              height={80}
                            />
                          </div>
                        ) : (
                          <div className="w-[80px] h-[80px] bg-gray-300 rounded-md flex items-center justify-center">
                            <span className="text-[10px] text-gray-500">
                              No Image
                            </span>
                          </div>
                        )}

                        <div className="mx-auto flex-wrap text-center flex items-center justify-center m-0 p-0">
                          <p className="m-0 p-0 w-full">
                            {" "}
                            {item.strIngredient}{" "}
                          </p>
                        </div>
                      </li>
                    </Link>
                  ))}
              </ul>
            )}

            {visibleCount < displayIngredients.length && (
              <div>
                <button
                  onClick={showMore}
                  className="cursor-pointer mt-4 bg-[#E9B44C] rounded-xl text-white font-bold px-6 py-3 w-full"
                >
                  <span className="text-lg"> Show More </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

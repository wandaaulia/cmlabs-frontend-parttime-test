"use client";

import Layout from "@/app/(layoutPage)/layout";
import Navbar from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface SearchIngredientsType {
  meals: SearchIngredientsTypeData[];
}

export interface SearchIngredientsTypeData {
  strMeal?: string;
  strMealThumb?: string;
  idMeal?: string;
}

export default function Meals() {
  const params = useParams();

  const [visibleCount, setVisibleCount] = useState(10);
  const [dataMeals, setDataMeals] = useState<SearchIngredientsTypeData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchIngredients, setSearchIngredients] = useState<
    SearchIngredientsTypeData[]
  >([]);
  const [loading, setLoading] = useState(false);

  const url = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

  useEffect(() => {
    const ingredients = async () => {
      setLoading(true);
      try {
        const dataIngredients = fetch(`${url}${params.slug}`);

        if (!dataIngredients) throw new Error("Error");

        const resIngredients = await dataIngredients;
        const jsonIngredients: SearchIngredientsType =
          await resIngredients.json();
        console.log(jsonIngredients.meals);
        setDataMeals(jsonIngredients.meals);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    ingredients();
  }, []);

  const showMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const searchIngredientsHandle = async (term: string) => {
    setSearchTerm(term);
    const search = dataMeals.filter((item) =>
      item.strMeal?.toLowerCase().includes(term.toLowerCase()),
    );
    setSearchIngredients(search);
  };

  const displayIngredients = searchTerm === "" ? dataMeals : searchIngredients;
  const isNotFound = searchTerm !== "" && searchIngredients.length <= 0;

  return (
    <Layout>
      <div className="flex flex-row justify-between mt-6">
        <h3 className="text-xl font-bold"> Search by Meals </h3>
        <Link href="/" className=" text-gray-700 font-medium text-base">
          {" "}
          Back{" "}
        </Link>
      </div>
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
          <div className="flex flex-col items-center justify-center text-center py-4 text-black mt-10">
            <span className="font-medium text-lg"> Data tidak ditemukan</span>

            <Link
              href="/"
              onClick={() => setSearchTerm("")}
              className="mt-4 bg-[#E9B44C] rounded-xl text-white font-bold w-fit px-2 py-3"
            >
              <span className="text-lg"> Back to Ingredients </span>
            </Link>
          </div>
        ) : (
          <ul className="md:mx-auto flex flex-row flex-wrap justify-start overflow-hidden mt-4">
            {displayIngredients.slice(0, visibleCount).map((item, index) => (
              <li
                key={index}
                className="mx-0 w-[150px] xl:w-[180px] border border-gray-200 p-4
                            flex flex-col items-center"
              >
                {item.strMealThumb ? (
                  <div>
                    <Image
                      src={item.strMealThumb}
                      alt={`img-${item.strMeal}`}
                      width={80}
                      height={80}
                    />
                  </div>
                ) : (
                  <div className="w-[80px] h-[80px] bg-gray-300 rounded-md flex items-center justify-center">
                    <span className="text-[10px] text-gray-500">No Image</span>
                  </div>
                )}

                <div className="mx-auto text-center flex items-center justify-center m-0 p-0">
                  <p className="m-0 p-0 w-full"> {item.strMeal} </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {visibleCount < dataMeals.length && (
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
    </Layout>
  );
}

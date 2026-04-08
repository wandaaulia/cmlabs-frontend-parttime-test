import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="bg-[#15803D] relative overflow-hidden  h-fit py-10 xl:py-18 flex flex-col">
      <div className="mx-auto w-[90%] lg:w-[80%] overflow-hidden relative flex flex-col justify-center gap-4 pb-0">
        <div className="gap-2 xl:gap-4 flex flex-col items-start">
          <h3 className="md:w-[300px] lg:w-[350px] xl:w-[600px] text-3xl lg:text-4xl xl:text-6xl leading-9 lg:leading-10 xl:leading-[70px]  text-white font-bold p-0 m-0">
            {" "}
            Create your prefect meal plan{" "}
          </h3>
          <p className="text-white text-lg font-medium p-0 m-0">
            {" "}
            Discover 100+ Recipes{" "}
          </p>
          <Link href="/">
            <button className="cursor-pointer bg-white text-base text-black font-bold py-2 px-4 xl:py-4 xl:mt-2 rounded-full p-0 m-0">
              {" "}
              Browse Ingredients
            </button>
          </Link>
        </div>
      </div>
      <div className="hidden md:flex absolute -right-[10px] top-[-50%] xl:top-[2%] xl:mr-[90px]">
        <Image src="/herImage.png" alt="meal plan" width={500} height={500} />
      </div>
    </div>
  );
}

import Navbar from "../components/Header";
import Hero from "../components/Hero";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#f6f6f6] min-h-screen">
      <Navbar />

      <div>
        <Hero />
        <div className="flex flex-row">
          <div className="mb-10 xl:px-8 mt-6 rounded-3xl w-[90%] xl:w-[60%] xl:mx-auto px-4 mx-auto min-h-fit pb-4 bg-white">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

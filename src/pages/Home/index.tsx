import Stories from "@/components/Stories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col p-6">
      <div className="relative w-full text-gray-600">
        <Input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-sm text-base focus:outline-none"
          placeholder="Search Item...."
          type="search"
          name="search"
        />
        <button
          className="border-gray-300 absolute right-0.5 top-0.5 bottom-[1.2px] bg-slate-900 rounded-r-sm text-white px-2 flex items-center justify-center"
          type="submit"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
      <div className="mx-2 my-8 overflow-y-auto">
        {/* <h2 className="mb-5">Stories</h2> */}
        <Stories />
      </div>
    </div>
  );
};
export default Home;

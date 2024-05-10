import React from "react";

import { db } from "@/lib/db";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";

const Searh = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      <div className="py-4 mx-6 md:hidden block ">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
      </div>
    </>
  );
};

export default Searh;

"use client";
import React from "react";

import {
  FcEngineering,
  FcMultipleDevices,
  FcMindMap,
  FcRadarPlot,
  FcSportsMode,
  FcFinePrint,
  FcDam,
} from "react-icons/fc";
import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import CategoryItem from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const IconMap: Record<Category["name"], IconType> = {
  Arts: FcRadarPlot,
  Engineering: FcEngineering,
  "Computer Science": FcMultipleDevices,
  Mathmatics: FcMindMap,
  History: FcFinePrint,
  "Health and fitness": FcSportsMode,
  Geography: FcDam,
};
const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center pb-2 mb-6 gap-x-2 overflow-x-auto">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          value={item.id}
          icon={IconMap[item.name]}
        />
      ))}
    </div>
  );
};

export default Categories;

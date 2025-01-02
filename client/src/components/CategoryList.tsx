// CategoryList.tsx

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

import Loader from "@/components/loader";

import { axios } from "@/lib/axios";

interface Category {
  id: number;
  title: string;
  description: string;
  parentId: number;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
}

interface CategoryListProps {
  categories: Category[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  const [subcategories, setSubcategories] = useState<{
    [key: number]: Category[];
  }>({});
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
  const [error, setError] = useState<{ [key: number]: string }>({});

  const fetchSubcategories = async (parentId: number) => {
    if (subcategories[parentId]) return; // Prevent fetching again

    try {
      setLoading((prev) => ({ ...prev, [parentId]: true }));
      setError((prev) => ({ ...prev, [parentId]: "" }));
      const res = await axios.get(`/api/categories/${parentId}`);
      const data: { category: Category } = res.data;
      setSubcategories((prev) => ({
        ...prev,
        [parentId]: data.category.children || [],
      }));
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      setError((prev) => ({
        ...prev,
        [parentId]: "Failed to load subcategories.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [parentId]: false }));
    }
  };

  return (
    <Accordion type="multiple" className="w-full mt-[-8px]">
      {categories.map((category) => (
        <AccordionItem
          className="my-2"
          key={category.id}
          value={`category-${category.id}`}
        >
          <AccordionTrigger
            className="flex items-center w-full gap-2 p-2 bg-gray-100 rounded-md cursor-pointer"
            onClick={() => fetchSubcategories(category.id)}
          >
            <span>{category.title}</span>
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/accordion:rotate-180 w-5 h-5" />
          </AccordionTrigger>
          <AccordionContent>
            {loading[category.id] ? (
              <div className="ml-4">
                <Loader />
              </div>
            ) : error[category.id] ? (
              <p className="ml-4 text-sm text-red-500">{error[category.id]}</p>
            ) : subcategories[category.id]?.length > 0 ? (
              <SidebarMenu className="my-2 ml-4">
                {subcategories[category.id].map((subcat) => (
                  <SidebarMenuItem key={subcat.id}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={`/all-categories/${subcat.id}`}
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
                      >
                        {subcat.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            ) : (
              <p className="mx-4 ml-4 text-sm text-gray-500">
                No subcategories
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CategoryList;

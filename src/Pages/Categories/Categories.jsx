import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import useCategories from "../../Hooks/useCategories";
import InnerLoading from "../../Components/InnerLoading/InnerLoading";

export default function Categories() {
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: categoriesErrorMsg,
  } = useCategories();

  const [subCatId, setSubCatId] = useState(null);
  const [subCatName, setSubCatName] = useState(null);

  const {
    data: subCategory,
    isLoading: subCategoryLoading,
    isError: subCategoryError,
    error: subCategoryErrorMsg,
  } = useQuery({
    queryKey: ["subCategory", subCatId],
    queryFn: () =>
      axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${subCatId}/subcategories`
      ),
    select: (data) => data.data.data,
    enabled: !!subCatId,
  });

  const handleClick = (id, name) => {
    setSubCatId(id);
    setSubCatName(name);
  };

  if (categoriesError) {
    return <h3>{JSON.stringify(categoriesErrorMsg.message)}</h3>;
  }

  if (subCategoryError) {
    return <h3>{JSON.stringify(subCategoryErrorMsg.message)}</h3>;
  }

  return (
    <div className="container">
      <h2 className="my-7 text-center text-green-500">Categories</h2>

      {categoriesLoading ? (
        <Loading />
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mx-auto">
          {categories.map((category) => (
            <div
              key={category.name}
              className="max-w-lg mx-auto bg-white border rounded-md dark:bg-gray-800 dark:border-gray-700 transition duration-500 hover:shadow-[1px_1px_10px_#4fa74f]"
              onClick={() => handleClick(category._id, category.name)}
            >
              <div>
                <img
                  className="h-[300px] rounded-t-md object-cover object-center aspect-video"
                  src={category.image}
                  alt={category.name}
                />
              </div>
              <div className="p-4">
                <h4 className="h3 text-green-500 text-center">
                  {category.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {subCatId && (
        <div>
          <h3 className="my-7 text-center text-green-500">
            {subCatName} Subcategories
          </h3>

          {subCategoryLoading ? (
            <InnerLoading />
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mx-auto">
              {subCategory.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border rounded-md dark:bg-gray-800 dark:border-gray-700 transition duration-500 hover:shadow-[1px_1px_10px_#4fa74f]"
                >
                  <div className="w-full p-4">
                    <h4 className="h3 font-semibold text-center">
                      {item.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import Loading from "../Loading/Loading";
import useCategories from "../../Hooks/useCategories";

export default function Categories() {
  const { data: categories, isLoading, isError, error } = useCategories();

  if (isError) {
    return <h3>{JSON.stringify(error.message)}</h3>;
  }

  return (
    <div className="container">
      <h2 className="my-7 text-center text-green-500">Categories</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mx-auto">
          {categories.map((category) => (
            <div
              key={category.name}
              className="max-w-lg mx-auto bg-white border rounded-md dark:bg-gray-800 dark:border-gray-700 transition duration-500 hover:shadow-[1px_1px_10px_#4fa74f]"
            >
              <div>
                <img
                  className="h-[300px] rounded-t-md object-cover object-center aspect-video"
                  src={category.image}
                  alt={category.name}
                />
              </div>
              <div className="p-4">
                <h3 className="text-green-500 text-center">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

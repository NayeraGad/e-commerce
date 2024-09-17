import Slider from "react-slick";
import useCategories from "../../Hooks/useCategories";

export default function CategorySlider() {
  const { data: categories, isError, error } = useCategories();

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          infinite: true,
        },
      },
    ],
  };

  if (isError) {
    return <h3>{JSON.stringify(error.message)}</h3>;
  }

  return (
    <div className="overflow-hidden my-9 px-3 sm:p-0">
      <Slider {...settings}>
        {categories?.map((category) => (
          <div key={category.name} className="cursor-grab">
            <img
              src={category.image}
              className="w-full h-60 object-cover"
              alt={category.name}
            />
            <h3 className="h4 mt-2 md:ml-2">{category.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}

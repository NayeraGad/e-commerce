import Slider from "react-slick";
import img_1 from "../../assets/images/main-slider-2.jpeg";
import img_2 from "../../assets/images/main-slider-3.jpeg";
import slide_1 from "../../assets/images/main-slider-1.jpeg";
import slide_2 from "../../assets/images/slide-1.jpeg";
import slide_3 from "../../assets/images/slide-2.jpeg";

export default function MainSlider() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: () => (
      <div>
        <div className="dots" />
      </div>
    ),
  };

  return (
    <div className="container">
      <div className="grid grid-cols-12 mb-4">
        <div className="md:col-span-8">
          <Slider {...settings}>
            <img
              src={slide_1}
              alt=""
              className="cursor-grab w-full object-cover object-right h-[400px]"
            />

            <img
              src={slide_2}
              alt=""
              className="cursor-grab w-full object-cover object-right h-[400px]"
            />

            <img
              src={slide_3}
              alt=""
              className="cursor-grab w-full object-cover object-right h-[400px]"
            />
          </Slider>
        </div>

        <div className="md:col-span-4">
          <img
            src={img_1}
            alt=""
            className="w-full object-cover object-right h-[200px]"
          />
          <img
            src={img_2}
            alt=""
            className="w-full object-cover object-right h-[200px]"
          />
        </div>
      </div>
    </div>
  );
}

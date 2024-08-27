import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import MainSlider from "../../Components/MainSlider/MainSlider";
import Products from "../Products/Products";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <Products />
    </>
  );
}

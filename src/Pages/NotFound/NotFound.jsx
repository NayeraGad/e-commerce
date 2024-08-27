import error from "../../assets/images/error.svg";

export default function NotFound() {
  return (
    <div className="flex justify-center mt-12">
      <img src={error} alt="error" />
    </div>
  );
}

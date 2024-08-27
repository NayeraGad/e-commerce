const images = Object.values(
  import.meta.glob(
    "../../assets/images/footer-imgs/*.{png,jpg,jpeg,PNG,JPEG,svg}",
    {
      eager: true,
      as: "url",
    }
  )
);

const paymentImages = images.filter((img) => !img.includes("store"));
const storeImages = images.filter((img) => img.includes("store"));

export default function Footer() {
  return (
    <div className="bg-gray-50 border-gray-200 dark:text-white dark:bg-gray-900 dark:shadow-[0px_1px_10px_0_rgba(0,0,0,0.3)] ">
      <div className="container pt-6 pb-12 flex flex-col gap-4">
        <h3>Get the FreshCart app</h3>
        <p>
          We will send you a link, open it on your phone to download the app.
        </p>

        <div className="flex flex-wrap justify-between gap-y-3">
          <input
            type="email"
            placeholder="Email..."
            className="w-full sm:w-8/12 lg:w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />

          <div className="w-full sm:w-4/12 lg:w-2/12 sm:pl-4">
            <button className="btn w-full">Share App Link</button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between border-y py-3">
          <div className="flex flex-wrap flex-row items-center gap-2">
            <h4>Payment Partners</h4>
            {paymentImages.map((img, i) => (
              <img src={img} key={`payment${i}`} alt={`Payment${i}`} />
            ))}
          </div>

          <div className="flex flex-wrap flex-row items-center gap-2">
            <h4>Get deliveries with FreshCart</h4>
            {storeImages.map((img, i) => (
              <img
                src={img}
                key={`store${i}`}
                alt={`Store${i}`}
                className="w-14"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoLocationSharp } from "react-icons/io5";
import axios from "axios";
import { addBidClaimerAddress } from "@/api/bid";
import { ClaimerAddress } from "@/types/bid";
const WinnerAddress = ({
  bidId,
  handleSubmitAddress,
}: {
  bidId: string;
  handleSubmitAddress: (newAddress: ClaimerAddress) => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const formik = useFormik({
    initialValues: {
      country: "",
      state: "",
      district: "",
      city: "",
      postalCode: "",
      phone: "",
    },
    validationSchema: Yup.object({
      country: Yup.string().required("Country is required"),
      state: Yup.string().required("State is required"),
      district: Yup.string().required("District is required"),
      city: Yup.string().required("City is required"),
      postalCode: Yup.string().required("Postal Code is required"),
      phone: Yup.string().required("Phone number is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const submitAddress = async () => {
        const { success, newAddress } = await addBidClaimerAddress(
          values,
          bidId
        );
        if (success) handleSubmitAddress(newAddress);
      };
      submitAddress();
    },
  });

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
          )
          .then((response: any) => {
            const address = response.data.address;

            formik.setFieldValue("country", address.country);

            formik.setFieldValue("state", address.state || address.region);
            formik.setFieldValue("district", address.county || address.suburb);
            formik.setFieldValue(
              "city",
              address.city || address.town || address.village
            );
            formik.setFieldValue("postalCode", address.postcode);
          })
          .catch((error: any) =>
            console.error("Error fetching location data:", error)
          );
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      {/* <div className="mt-6 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg"> */}
      <div
        className={`mt-6 transition-opacity duration-500 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Enter Your Address
        </h3>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              {formik.touched.country && formik.errors.country ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.country}
                </div>
              ) : null}
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              {formik.touched.state && formik.errors.state ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.state}
                </div>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                District
              </label>
              <input
                type="text"
                name="district"
                value={formik.values.district}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              {formik.touched.district && formik.errors.district ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.district}
                </div>
              ) : null}
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              {formik.touched.city && formik.errors.city ? (
                <div className="text-red-500 text-sm">{formik.errors.city}</div>
              ) : null}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              {formik.touched.postalCode && formik.errors.postalCode ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.postalCode}
                </div>
              ) : null}
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>
          </div>
          <div className="sm:flex sm:justify-between  ">
            <button
              onClick={() => fetchLocation()}
              type="button"
              className="w-full md:w-auto bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4 flex justify-center"
            >
              <i className="fa fa-map-marker-alt flex items-center justify-center">
                {" "}
                <IoLocationSharp />
              </i>{" "}
              Use Current Location
            </button>
            <button
              type="submit"
              className="w-full md:w-auto bg-green-600 dark:bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mt-4"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WinnerAddress;

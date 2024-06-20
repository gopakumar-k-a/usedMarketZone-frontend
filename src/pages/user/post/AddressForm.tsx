import React, { useState } from "react";
import axios from "axios";

const AddressComponent = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        // Fetch the address details based on the geolocation
        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
          )
          .then((response) => {
            const address = response.data.address;
            setCountry(address.country);
            setState(address.state || address.region);
            setDistrict(address.county || address.suburb);
            setCity(address.city || address.town || address.village);
            setPostalCode(address.postcode);
          })
          .catch((error) =>
            console.error("Error fetching location data:", error)
          );
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Enter Your Address</h3>

      <div className="flex mb-4 space-x-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="w-1/2">
          <label className="block text-sm font-medium">State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="flex mb-4 space-x-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium">District</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="w-1/2">
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Postal Code</label>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        onClick={fetchLocation}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Use Current Location
      </button>
    </div>
  );
};

export default AddressComponent;

import React, { useState } from "react";
import axios from "axios";

const AddressComponent = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const geoNamesUsername = "gopakumar_k_a";

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // Fetch the address details based on the geolocation
        axios
          .get(
            `http://api.geonames.org/findNearbyPostalCodesJSON?lat=${latitude}&lng=${longitude}&username=${geoNamesUsername}`
          )
          .then((response) => {
            const locationData = response.data.postalCodes[0];
            console.log('response latitude longitude ',response.data);
            
            setCountry(locationData.countryCode);
            setPostalCode(locationData.postalCode);
            // Fetch additional address details based on the location
            axios
              .get(
                `http://api.geonames.org/getJSON?geonameId=${locationData.adminCode1}&username=${geoNamesUsername}`
              )
              .then((response) => {
                const stateData = response.data;

                console.log('stateData ',stateData);
                
                setState(stateData.name);
                // Fetch district and city details
                axios
                  .get(
                    `http://api.geonames.org/getJSON?geonameId=${locationData.adminCode2}&username=${geoNamesUsername}`
                  )
                  .then((response) => {
                    const districtData = response.data;
                    console.log('districtData ',districtData);
                    
                    setDistrict(districtData.name);
                    setCity(locationData.placeName);
                  })
                  .catch((error) =>
                    console.error("Error fetching district data:", error)
                  );
              })
              .catch((error) =>
                console.error("Error fetching state data:", error)
              );
          })
          .catch((error) => console.error("Error fetching location data:", error));
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

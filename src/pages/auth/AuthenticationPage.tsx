import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ForgotPass from "../../components/auth/ForgotPass";
import LogIn from "../../components/auth/LogIn";
import SignUp from "../../components/auth/SignUp";
import Otp from "../../components/auth/Otp";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import GradientBackground from "@/components/auth/GradientBackGround";

function AuthenticationPage() {
  const location = useLocation();
  const slideText = [
    `Welcome to <span class="font-bold sm:text-2xl text-xl"> Used Market Zone </span>, a revolutionary platform that merges the best features of social media with a dynamic marketplace for pre-owned items. At Used Market Zone`,
    `<span class="font-bold sm:text-2xl text-xl">Social Interactions:</span> Engage with other users by sending messages, following their profiles, and staying updated on their latest activities.`,
    `<span class="font-bold sm:text-2xl text-xl">Marketplace for Used Goods:</span> List your used products for sale, making it easy to find buyers within a trusted community.`,
    `<span class="font-bold sm:text-2xl text-xl">Auction Functionality:</span> Put your items up for auction and attract competitive bids, ensuring you get the best possible price.`,
    `<span class="font-bold sm:text-2xl text-xl">Product Discovery:</span> Follow users to see the items they have added for auction, creating a personalized shopping experience based on your network.`,
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slideText.length);
    }, 5000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  const slideNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slideText.length);
  };

  const slidePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slideText.length) % slideText.length
    );
  };
  return (
    <>
      <GradientBackground>
        <div className="p-5">
          <div
            className="xl:mx-auto xl:w-full shadow-md p-4 xl:max-w-sm 2xl:max-w-md mb-6 flex  bg-white rounded-lg"
            style={{
              backgroundImage: `
        linear-gradient(
          rgba(0, 0, 0, 0.5), 
          rgba(0, 0, 0, 0.5)
        ),
        url(https://res.cloudinary.com/dwjw8biat/image/upload/v1720537160/wallpapersden.com_blue-violet-color-texture_4000x6000_hjbedk.jpg)
      `,
            }}
          >
            <h1 className=" font-bold sm:text-3xl text-2xl mx-auto inline-flex justify-center text-white">
              Used Market Zone
            </h1>
          </div>
          <div className="w-full sm:w-1/2 flex justify-center">
            {/* <h1 className=" font-extrabold sm:text-4xl text-2xl ">
            Used Market Zone
          </h1> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            {location.pathname == "/login" && <LogIn />}
            {location.pathname == "/otp" && <Otp />}
            {location.pathname == "/signup" && <SignUp />}
            {location.pathname == "/forgot-password" && <ForgotPass />}

            <aside className="">
              <div
                className="relative p-8 rounded-2xl bg-red-200 sm:max-h-96 h-full"
                style={{
                  backgroundImage: `
        linear-gradient(
          rgba(0, 0, 0, 0.7), 
          rgba(0, 0, 0, 0.7)
        ),
        url(https://res.cloudinary.com/dwjw8biat/image/upload/v1720536774/wallpapersden.com_one-plus-7_3840x2160_tjnhfh.jpg)
      `,
                }}
              >
                <div className="relative z-10 text-white p-5  ">
                  <div className="flex flex-col items-center relative h-full">
                    <h2 className="font-extrabold text-3xl">
                      Used Market Zone
                    </h2>
                  </div>
                  <div className="flex flex-col items-center justify-center  h-full w-full">
                    <div className="inset-0 w-full h-full flex items-center justify-center text-white text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-loose lg:leading-relaxed p-8">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: slideText[activeIndex],
                        }}
                      />
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 ">
                      {slideText.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-white" : "bg-gray-400"}`}
                        />
                      ))}
                    </div>
                    <button
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                      onClick={slidePrev}
                    >
                      <FaArrowLeft />
                    </button>
                    <button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
                      onClick={slideNext}
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
        {/* <div className="flex items-center justify-center"> */}
        {/* <div className="grid grid-cols-2">
          <div className="col-span-1 bg-red-200"></div>
          <div className="col-span-1">
            {" "}
            {location.pathname == "/login" && <LogIn />}
          </div>
          

          <div className="col-span-1 bg-red-200"></div>


          <div className="col-span-1">

          {location.pathname == "/forgot-password" && <ForgotPass />}
          </div>

          <div className="col-span-1 bg-red-200"></div>

          <div className="col-span-1">

          {location.pathname == "/signup" && <SignUp />}
          </div>

          <div className="col-span-1 bg-red-200"></div>

          <div className="col-span-1">

          {location.pathname == "/otp" && <Otp />}
          </div>

        </div> */}
        {/* </div> */}
      </GradientBackground>
    </>
  );
}

export default AuthenticationPage;

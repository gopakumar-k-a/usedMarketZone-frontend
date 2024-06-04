import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function LogIn() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <>
            <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-center">
                    <h2 className="text-left text-3xl font-bold leading-tight text-black sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
                        Log In
                    </h2>
                    <hr className="border-gray-300 my-6" />
                    <form className="mt-8" method="POST" action="#">
                        <div className="space-y-5">
                            <div>
                                <label className="text-base font-medium text-gray-900 sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                                    <p className="text-left text-sm font-semibold text-black sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                                        Email
                                    </p>
                                </label>
                                <div className="mt-2">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            placeholder="Email"
                                            type="email"
                                            className="pl-8 pr-3 flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-left text-sm font-semibold text-black sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                                    Password
                                </p>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <FontAwesomeIcon icon={faLock} className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        placeholder="Password"
                                        type={passwordVisible ? 'text' : 'password'}
                                        className="pl-8 pr-3 flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                    >
                                        {passwordVisible ? (
                                            <FontAwesomeIcon icon={faEye} className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <FontAwesomeIcon icon={faEyeSlash} className="h-5 w-5 text-gray-500" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-base font-medium text-gray-900 sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                                            <p className="text-sm font-semibold text-black sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                                                Don't Have an Account?
                                            </p>
                                        </label>
                                        <Link to="/signup" className="text-sm font-semibold text-blue-500 hover:underline sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                                            Create Account
                                        </Link>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label className="text-base font-medium text-gray-900 sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                                            <p className="text-sm font-semibold text-black sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                                                Forgot Password?
                                            </p>
                                        </label>
                                        <Link to="/forgot-password" className="text-sm font-semibold text-blue-500 hover:underline sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                                            Forgot Password
                                        </Link>
                                    </div>

                                    <div>
                                        <Link to="/login" className="inline-flex w-full items-center justify-center rounded-md bg-customOrange px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-customOrange/90 sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                                            Log In
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="mt-3 space-y-3">
                        <button
                            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
                            type="button"
                        >
                            <span className="mr-2 inline-block">
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-rose-500 sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
                                >
                                    <path
                                        d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                                    ></path>
                                </svg>
                            </span>
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LogIn;
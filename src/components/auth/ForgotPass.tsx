import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
function ForgotPass() {

    return (
        <>
            <section>
                <div className="flex bg-white items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
                    <div className="xl:mx-auto xl:w-full shadow-md p-4 xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-left text-2xl font-bold leading-tight text-black">
                            Forgot Password
                        </h2>
                        <hr className="border-gray-300 my-6" />

                        <form className="mt-8" method="POST" action="#">
                            <div className="space-y-5">
                                <div >
                                    <label className=" text-base font-medium text-gray-900 ">
                                        <p
                                            className="text-left text-sm font-semibold text-black"

                                        >
                                            Email
                                        </p>
                                    </label>
                                    <div className="mt-2">
                                        <div className='relative'>
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
                                <div>
                                    <div className='space-y-4'>
                                        <div className="flex items-center justify-between">
                                            <label className="text-base font-medium text-gray-900">
                                                <p className="text-sm font-semibold text-black">Already Have an Account?</p>
                                            </label>
                                            <Link to="/login" className="text-sm font-semibold text-blue-500 hover:underline">
                                                Log In
                                            </Link>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="text-base font-medium text-gray-900">
                                                <p className="text-sm font-semibold text-black">Dont Have an Account?</p>
                                            </label>
                                            <Link to="/signup" className="text-sm font-semibold text-blue-500 hover:underline">
                                                Create Account
                                            </Link>
                                        </div>

                                    </div>
                                </div>

                                <div>
                                    <button
                                        className="inline-flex w-full items-center justify-center rounded-md bg-customOrange px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-customOrange/90"
                                        type="button"
                                    >
                                        Get Otp
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-3 space-y-3">
                            <button
                                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                                type="button"
                            >
                                <span className="mr-2 inline-block">
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-rose-500"
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
            </section>
        </>
    )
}

export default ForgotPass

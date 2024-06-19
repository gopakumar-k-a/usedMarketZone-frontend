import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtpsignUp, verifyOtpForgotPassword } from "../../api/auth";
import { VerifyOtpSignUp, User } from "../../types/login";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { forgotPassword } from "../../api/auth";
import { ForgotPasswordResponse } from "../../types/login";
import ResetPassModal from "./ResetPasswModal";
import { AlertResetPassModalClose } from "./AlertResetModalClose";
import { authorizeUserOtpPage } from "@/redux/reducers/user/auth/otpProtect/otpProtectSlice";
import {  resendOtpSignUp } from "../../api/auth";
import { useTimer } from "@gabrielyotoo/react-use-timer";

function Otp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const [activeInputIndex, setActiveIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState<number>(60);
  const [isResetPassModalOpen, setResetPassModalOpen] = useState(false);
  const [isResetPassAlertOpen, setResetPassAlertOpen] = useState(false);
  const [finished, setFinished] = useState(false);
  const { currentTime, isRunning, start } = useTimer(60,{
    onFinish: () => {
      setFinished(true);
    },
    onStart: () => {
      setFinished(false);
    }
  });

  let email = location.state.email || localStorage.getItem("verifyingEmail");
  let purpose = location.state.purpose || localStorage.getItem("purpose");
  let otpToken = location.state.otpToken || localStorage.getItem("otpToken");


  useEffect(() => {
    inputRef.current?.focus();
  }, [activeInputIndex]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { value } = e.target;
    const newInputVal = [...inputVal];
    newInputVal[index] = value.substring(value.length - 1);
    setInputVal(newInputVal);
    if (!value) setActiveIndex(index - 1);
    else setActiveIndex(index + 1);
  };

  // timer

  useEffect(() => {
    //start timer 
    start();
  }, []);


  // useEffect(() => {
  //   const endTime = localStorage.getItem("otpEndTime");
  //   if (endTime) {
  //     const remainingTime = Math.max(
  //       0,
  //       Math.floor((new Date(endTime).getTime() - new Date().getTime()) / 1000)
  //     );
  //     setTimer(remainingTime);
  //   } else {
  //     const newEndTime = new Date(new Date().getTime() + 60 * 1000);
  //     localStorage.setItem("otpEndTime", newEndTime.toISOString());
  //   }

  //   const countdown = setInterval(() => {
  //     setTimer((prevTimer) => {
  //       if (prevTimer > 0) {
  //         return prevTimer - 1;
  //       }
  //       clearInterval(countdown);
  //       return 0;
  //     });
  //   }, 1000);

  //   return () => clearInterval(countdown);
  // }, []);

  // useEffect(() => {
  //   if (timer === 60) {
  //     const newEndTime = new Date(new Date().getTime() + 60 * 1000);
  //     localStorage.setItem("otpEndTime", newEndTime.toISOString());
  //   }
  // }, [timer]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const { key } = e;
    if (key === "Backspace" && inputVal[index] === "")
      setActiveIndex(index - 1);
  };

  const handleUpload = async () => {
    setError("");
    const otp = inputVal.join("");
    if (otp.length === 6) {
      if (purpose === "register") {
        const userDataString = localStorage.getItem("userData");
        if (!userDataString) {
          setError(
            "User data not found. Please complete the signup procedure again."
          );
          return;
        }
        const userData: User = JSON.parse(userDataString);
        const responseObj: VerifyOtpSignUp = { userData, otp };
        setLoading(true);
        await toast
          .promise(
            verifyOtpsignUp(responseObj),
            {
              pending: "Verifying OTP...",
              success: "Account creation successful!",
              error:
                "Failed to create account. Please complete the signup procedure again.",
            },
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          )
          .then((response) => {
            localStorage.removeItem("purpose");
            localStorage.removeItem("otpState"); // Clean up after success
            localStorage.removeItem("otpEndTime");
            navigate("/login", { state: { email: response.email } });
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          })
          .finally(() => {
            setLoading(false);
          });
      } else if (purpose === "forgotPassword") {
        setLoading(true);
        await toast
          .promise(
            verifyOtpForgotPassword({ email, otp, otpToken }),
            {
              pending: "Verifying OTP...",
              success: "OTP verified successfully!",
              error: "Failed to verify OTP. Please try again.",
            },
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          )
          .then((response) => {
            alert(`inside response ${response}`);
            localStorage.removeItem("otpState");
            localStorage.removeItem("otpEndTime");
            localStorage.removeItem("purpose");
            localStorage.removeItem("otpToken");
            handleResetPassModalOpen(true);

            // navigate("/reset-password", {
            //   state: { email: response.email, otpToken },
            // });
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } else {
      setError("Please check your entered OTP.");
    }
  };

  const resendOtpFn = async () => {
    if (purpose === "register") {
      // const { confirmPassword, ...formData } = values;

      const userDataString = localStorage.getItem("userData");
      if (!userDataString) {
        setError(
          "User data not found. Please complete the signup procedure again."
        );
        return;
      }
      const userData: User = JSON.parse(userDataString);
      // const responseObj: VerifyOtpSignUp = { userData, otp };
      setLoading(true);

      await toast
        .promise(
          resendOtpSignUp(userData),
          {
            pending: "Sending Otp",
            success: "Successfully sent OTP To Your Account",
            error: {
              render({ data }) {
                // Extracting error message from response
                if (data.response && data.response.data) {
                  return ` ${data.response.data.message}`;
                }
                return ` ${data.message}`;
              },
            },
          },
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        )
        .then((response: any) => {
          dispatch(authorizeUserOtpPage());
          // navigate("/otp", { state: { email: formData.email } });
          // For registration
          // localStorage.setItem("otpToken",response.otpToken);
          console.log("response is ", response);
          // localStorage.setItem("otpToken", response.otpToken);
          // localStorage.setItem("verifyingEmail", response.email);
          start();
          localStorage.setItem("purpose", "register");
          localStorage.removeItem("otpEndTime");
          setTimer(60);
          localStorage.setItem("verifyingEmail", userData.email);
          localStorage.setItem("purpose", "register");
          navigate("/otp", {
            state: { email: userData.email, purpose: "register" },
          });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
          // setSubmitting(false);
        });
    } else if (purpose === "forgotPassword") {
      await toast
        .promise(
          forgotPassword({ email }),
          {
            pending: "Checking Credentials",
            success: "Otp send Successfully",
            error: {
              render({ data }) {
                // Extracting error message from response
                if (data.response && data.response.data) {
                  return `Failed: ${data.response.data.message}`;
                }
                return `Failed: ${data.message}`;
              },
            },
          },
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        )
        .then((response: ForgotPasswordResponse) => {
          // console.log("response is ", response);
          // localStorage.setItem("otpToken", response.otpToken);
          start();
          // otpToken = response.otpToken;
          console.log("response is ", response);
          localStorage.setItem("otpToken", response.otpToken);
          localStorage.setItem("verifyingEmail", response.email);
          localStorage.setItem("purpose", "forgotPassword");
          localStorage.removeItem("otpEndTime");
          setTimer(60);

          navigate("/otp", {
            state: {
              email: response.email,
              purpose: "forgotPassword",
              otpToken: response.otpToken,
            },
          });

          // localStorage.setItem("verifyingEmail",email)
          // localStorage.setItem("purpose","forgotPassword")

          // navigate("/otp", {
          //   state: {
          //     email: email,
          //     purpose: "forgotPassword",
          //     otpToken: response.otpToken,
          //   },
          // });
          // const { user, token, role } = response;

          // console.log("log in page   user, token, role", user);

          // // dispatch(loginSuccess({ user: JSON.stringify(user), token }));

          // dispatch(setCredentials({ user, token, role }));
          // console.log('user role UserLoginResponse ',user.role);

          // if (user.role == "user") {
          //   console.log(`if (user.role == "user")`);

          //   navigate("/");
          // } else if (user.role == "admin") {
          //   console.log(`else if (user.role == "admin")`);

          //   navigate("/admin");
          // }

          //    else if (role == "admin") {
          //   dispatch(setCredentialsAdmin({ user, token, role }));
          //   navigate("/admin");
          // }
          // dispatch(authorizeUserOtpPage())
          // navigate('/otp', { state: { email: formData.email } });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleResetPassModalOpen = (status: boolean) => {
    setResetPassModalOpen(status);
  };

  const handleResetPassModalClose = () => {
    // const [isResetPassAlertOpen,setResetPassAlertOpen]=useState(false)
    setResetPassAlertOpen(true);
  };

  const handleResetPassAlertClose = () => {
    // setResetPassModalOpen(false);
    setResetPassAlertOpen(false);
  };

  const handleResetAlertContinue = () => {
    setResetPassAlertOpen(false);
    setResetPassAlertOpen(false);

    // let email = location.state.email || localStorage.getItem("verifyingEmail");
    // let purpose = location.state.purpose || localStorage.getItem("purpose");
    // let otpToken = location.state.otpToken || localStorage.getItem("otpToken");

    localStorage.removeItem("verifyingEmail");
    localStorage.removeItem("otpToken");
    localStorage.removeItem("purpose");
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">OTP Verification</h1>
        <h2 className="font-semibold text-base mb-2">
          OTP has been sent to your inbox:
        </h2>
        <h3 className="font-bold text-lg mb-4">{email ? email : ""}</h3>
        <div className="flex items-center justify-center mb-4">
          {inputVal.map((_, index) => (
            <input
              key={index}
              ref={activeInputIndex === index ? inputRef : null}
              value={inputVal[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              type="text"
              className={`w-12 h-12 mx-2 border text-center rounded ${error ? "border-red-600" : "border-gray-300"}`}
            />
          ))}
        </div>
        <p className="text-red-600 mb-4">{error}</p>
        <div className="flex flex-col items-center">
          {/* <button className="py-2 px-5 bg-blue-700 text-white rounded hover:bg-blue-800 mb-2">
          Resend OTP
        </button> */}
          <div className="flex flex-col items-center">
            {finished ? (
              <button
                onClick={resendOtpFn}
                className="py-2 px-5 bg-blue-700 text-white rounded hover:bg-blue-800 mb-2"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-gray-600 mb-2">
                Resend OTP in {currentTime} seconds
              </p>
            )}
            {!finished && (
              <button
                className="py-2 px-5 bg-green-700 text-white rounded hover:bg-green-800 mb-2"
                onClick={handleUpload}
              >
                Confirm
              </button>
            )}
          </div>
          {/* <button
          className="py-2 px-5 bg-green-700 text-white rounded hover:bg-green-800 mb-2"
          onClick={handleUpload}
        >
          Confirm
        </button> */}
        </div>
        {isLoading && <Loader />}
      </div>
      {email && (
        <ResetPassModal
          isOpen={isResetPassModalOpen}
          onClose={handleResetPassModalClose}
          email={email}
        />
      )}
      <AlertResetPassModalClose
        isOpen={isResetPassAlertOpen}
        onClose={handleResetPassAlertClose}
        onAccept={handleResetAlertContinue}
      />
    </>
  );
}

export default Otp;

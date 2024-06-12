import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtpsignUp } from '../../api/auth';
import { VerifyOtpSignUp, User } from '../../types/login';
import { toast } from 'react-toastify';
import Loader from '../loader/Loader';

function Otp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const email = location.state?.email;
  const [activeInputIndex, setActiveIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState(new Array(6).fill(''));

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeInputIndex]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const { value } = e.target;
    const newInputVal = [...inputVal];
    newInputVal[index] = value.substring(value.length - 1);
    setInputVal(newInputVal);
    if (!value) setActiveIndex(index - 1);
    else setActiveIndex(index + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const { key } = e;
    if (key === 'Backspace' && inputVal[index] === '') setActiveIndex(index - 1);
  };

  const handleUpload = async () => {
    setError('');
    const otp = inputVal.join('');
    if (otp.length === 6) {
      const userDataString = localStorage.getItem('userData');
      if (!userDataString) {
        setError('User data not found. Please complete the signup procedure again.');
        return;
      }
      const userData: User = JSON.parse(userDataString);
      const responseObj: VerifyOtpSignUp = { userData, otp };
      setLoading(true);
      await toast.promise(
        verifyOtpsignUp(responseObj),
        {
          pending: "Verifying OTP...",
          success: "Account creation successful!",
          error: "Failed to create account. Please complete the signup procedure again.",
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
      ).then((response) => {
        navigate('/login', { state: { email: response.email } });
      }).catch((error) => {
        console.error(error);
        setLoading(false);
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setError('Please check your entered OTP.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">OTP Verification</h1>
      <h2 className="font-semibold text-base mb-2">OTP has been sent to your inbox:</h2>
      <h3 className="font-bold text-lg mb-4">{email ? email : ''}</h3>
      <div className="flex items-center justify-center mb-4">
        {inputVal.map((_, index) => (
          <input
            key={index}
            ref={activeInputIndex === index ? inputRef : null}
            value={inputVal[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            type="text"
            className={`w-12 h-12 mx-2 border text-center rounded ${error ? 'border-red-600' : 'border-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-red-600 mb-4">{error}</p>
      <div className="flex flex-col items-center">
        <button className="py-2 px-5 bg-blue-700 text-white rounded hover:bg-blue-800 mb-2">Resend OTP</button>
        <button className="py-2 px-5 bg-green-700 text-white rounded hover:bg-green-800 mb-2" onClick={handleUpload}>Confirm</button>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}

export default Otp;

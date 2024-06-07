import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../utils/hooks/reduxHooks';
import { Navigate, useNavigate } from 'react-router-dom';
// import { clearFlow } from '../../redux/reducers/user/auth/otpPageFlow/flowSlice';
import { useLocation } from 'react-router-dom';
import { verifyOtpsignUp } from '../../api/auth';
import { VerifyOtpSignUp, User } from '../../types/login';
import { toast } from 'react-toastify';
import Loader from '../loader/Loader';
function Otp() {
  // const flow = useAppSelector((state) => state.flow.flow);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false)

  //   useEffect(() => {
  //     if (flow !== 'registering' && flow !== 'resettingPassword') {
  //       navigate('/');
  //     }

  //     return () => {

  //       dispatch(clearFlow());
  //     };
  //   }, [flow, navigate, dispatch]);

  //   if (flow !== 'registering' && flow !== 'resettingPassword') {
  //     return <Navigate to='/' />; 
  //   }
  // let inputArray = Array.from({ length: 6 }, () => '')
  const [error, setError] = useState('');
  const location = useLocation();
  const email = location.state?.email;
  const [activeInputIndex, setActiveIndex] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputVal, setInputVal] = useState(new Array(6).fill(''))

  useEffect(() => {
    inputRef.current?.focus()

  }, [activeInputIndex])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const { value } = e.target


    const newInputVal = [...inputVal];

    newInputVal[index] = value.substring(value.length - 1);

    setInputVal(newInputVal);
    if (!value) setActiveIndex(index - 1)
    else setActiveIndex(index + 1)

  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const { key } = e
    if (key == 'Backspace' && inputVal[index] === '') setActiveIndex(index - 1)
  }

  const handleUpload = async () => {
    setError('')
    const otp = inputVal.join('')


    if (otp.length == 6) {
  
      const userDataString = localStorage.getItem('userData');
      if (!userDataString) {
        setError('User data not found Do The Sign Up procedure Again');
        return;
      }
      console.log(userDataString);
      const userData: User = JSON.parse(userDataString);
      const responseObj: VerifyOtpSignUp = {
        userData,
        otp
      }
      // verifyOtpsignUp(responseObj)
      setLoading(true)
      await toast.promise(
        verifyOtpsignUp(responseObj),
        {
          pending: "Verifying Otp",
          success: "Account Creation Successful",
          error: "Failed Create Account Do Sign up procedure again",
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

        // dispatch(authorizeUserOtpPage())
        // navigate('/otp', { state: { email: formData.email } });
        console.log('response ', response);

        console.log('success');

        navigate('/login',{state:{email:response.email}});


      })
        .catch((error) => {
          console.error(error);
          setLoading(false)
        })
        .finally(() => {
          setLoading(false);
          // setSubmitting(false);
        });

    } else {
      console.log('throw error');
      setError('please check your entered otp')

    }
  }


  return (
    <>
      <h1>This is the OTP page</h1>

      <h1 className='font-semibold text-base m-2'>Otp is send check Your Inbox, <h1 className='font-bold text-lg'>{email ? email : ''}</h1></h1>

      <div className='flex items-center justify-center'>
        {
          inputVal.map((_, index) => {
            return (
              <>
                <input
                  key={index}
                  ref={activeInputIndex == index ? inputRef : null}
                  value={inputVal[index]}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  type="text"
                  className={`w-12 h-12 mx-2 border text-center rounded ${error ? 'border-red-600' : 'border-gray-300'}`}
                />
              </>
            )
          })
        }
      </div>

      <p className='text-red-600 m-2'>{error}</p>


      <div className='p-8 m8 flex-col '>
        <button className='py-2 px-5 bg-blue-700 text-white rounded hover:bg-blue-800 m2'>resend Otp</button>
        <button className='py-2 px-5 bg-green-700 text-white rounded hover:bg-green-800 m-2' onClick={handleUpload}>confirm</button>
      </div>

      {isLoading && <Loader />}


    </>
  );
}

export default Otp;

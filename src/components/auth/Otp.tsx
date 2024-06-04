import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../utils/hooks/reduxHooks';
import { Navigate, useNavigate } from 'react-router-dom';
import { clearFlow } from '../../redux/reducers/user/auth/otpPageFlow/flowSlice';

function Otp() {
  const flow = useAppSelector((state) => state.flow.flow);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  return (
    <>
      <h1>This is the OTP page</h1>
   
    </>
  );
}

export default Otp;

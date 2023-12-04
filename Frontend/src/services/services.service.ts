// import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';

export const postUser = async (payload:any)=>{
    const res = await fetch('http://localhost:5000/api/newuser/google-login',{
      method:"POST",
      headers: new Headers({
        "Content-type": "application/json",
      }),
      body: JSON.stringify(payload)
      }    
    );
    // console.log(res);
    return res.json();
};

export const isUserLoggedIn:any = (userInfo:any)=>{
  const isUserInfoPresent = Boolean(Object.keys(userInfo)) && Boolean(userInfo);
  if(!isUserInfoPresent)return false;
  const hasToken = Boolean(userInfo.token) && Boolean(userInfo.token.length);
  if(!hasToken)return false;
  const decodedUserInfo:any = jwtDecode(userInfo.token);
  if(decodedUserInfo && typeof decodedUserInfo === 'object' && Boolean(decodedUserInfo['id']) && decodedUserInfo['id'] === userInfo._id){
    return true;
  }
  return false;

  // const secretKey = import.meta.env.VITE_JWT_SECRET;
  // console.log(import.meta.env.VITE_JWT_SECRET);
  // console.log(userInfo);
  // console.log();  
};
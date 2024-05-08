import jwt from "jsonwebtoken";
import { JWT_KEY } from "../const/credentials";
import { HTTP_MESSAGES } from "../const/message";
import response from "../const/response";

export const verifyJWT = (req,res,next) => {
  const token = req.headers.authorization.split(" ")[1]; // Split by space and take the second part
  if(!token) return response.somethingErrorMsgResponse(res,403,{},HTTP_MESSAGES.EN.TOKEN_INVALID)
  try{
    const decoded = jwt.verify(token, JWT_KEY);
    req.user = decoded;
    return next();
  }catch(err){
    console.log("error",err)
    return response.unAuthorizedErrorMsgResponse(res,403,{},HTTP_MESSAGES.EN.TOKEN_EXPIRED)
  }
}

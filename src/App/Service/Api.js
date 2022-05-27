import axios from "axios";
 
export default axios.create({
  //baseURL: "http://13.127.182.17:4000/api", 
  baseURL: "http://ec2-13-127-182-17.ap-south-1.compute.amazonaws.com:4000/api",
  responseType: "json",
 
});
let accesstoken = localStorage.getItem("token")
const token = `Bearer ${accesstoken}`
export {token}
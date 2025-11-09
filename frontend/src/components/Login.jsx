import { useState } from "react";
import { loginApi } from "../services/UserApi";
import {Link} from "react-router-dom"
import { useDispatch } from "react-redux";

const Login = () => {
  const [formData,setFormData] = useState({
    userName: "",
    password: ""
  })

  const dispatch = useDispatch()

  const handleChange = (e)=>{
  const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await loginApi(formData) 
      alert(res.data.message)
      dispatch(setAuthUser(res.data))
    } catch (error) {
      alert(error.response?.data?.message)
    }
  };

  return (
    <div className="h-screen items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen bg-white border shadow sm:rounded-lg flex justify-center flex-1 h-full">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 items-center flex">
          <div className=" flex flex-col w-full ">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                 Login
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to login your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <form className="mx-auto max-w-xs flex flex-col gap-4" onSubmit={handleSubmit}>
                
                <input
                onChange={handleChange}
                value={formData.userName}
                name="userName"
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your user name"
                />
                
                <input
                onChange={handleChange}
                value={formData.password}
                 name="password"
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                />
                
               
                <button className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" type="submit">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Login</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link to="/sign-up">
                    <span className="text-blue-900 font-semibold">Sign Up</span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
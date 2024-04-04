import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
// import Loading from "../Loading/Loading";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();
//  const isLoading=useSelector(state=>state.auth.isLoading)

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async (values, Action) => {
        try {
            const response= await axios.post(`http://localhost:3000/auth/login`,values);
    
            const data= response.data
    
            alert(data.message)
            console.log(data);
            localStorage.setItem('userAuth', JSON.stringify(data))

            Action.resetForm();
            navigate('/')
          } catch (error) {
            alert(error.response.data.message)
            console.log(error);
          }
    },
  });

  return (
    <>
    {/* {!isLoading ?( */}
      <div className="h-[92vh] w-[100%] xs:h-[95vh] flex flex-col justify-center items-center bg-transparent">
        <h1 className="text-[2rem] font-[700] tracking-wider text-white">
          Login
        </h1>
        <form
          className="flex text-white justify-center items-center flex-col gap-y-[2rem] border w-[50%] rounded-[1rem] xs:w-[90%] h-[60%]"
          onSubmit={handleSubmit}
        >
          <span className="flex flex-col justify-start items-start w-[60%]">
            <label
              htmlFor="email"
              className="font-[600] text-[1.2rem] leading-[2rem]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              className="w-[100%] h-[2rem] outline-none  bg-transparent border-b-2"
              placeholder=""
              autoComplete="on"
            />
          </span>

          <span className="flex flex-col justify-start items-start  w-[60%]">
            <label
              htmlFor="password"
              className="font-[600] text-[1.2rem] leading-[2rem]"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              className="w-[100%] outline-none h-[2rem] bg-transparent border-b-2"
            />
          </span>

          <button type="submit" className="w-[90%] h-[2.5rem] border">
            Submit
          </button>
        </form>
      </div>
      {/* ) :(<div className="h-[92vh] w-[100%] xs:h-[95vh] flex justify-center items-center bg-yellow-500"><Loading/></div>)} */}
    </>
  );
};

export default Login;
import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import axios from 'axios';
const Register = () => {

  const navigate = useNavigate();


  const initialValues = {
    userName: "",
    email: "",
    C_password: "",
    password: "",
  };

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues,
    onSubmit: async(values,Action) => {
      try {
        const response= await axios.post(`http://localhost:3000/auth/register`,values);

        const data= response.data
        localStorage.setItem('userAuth', data)
        alert(data.message)

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
        <h1 className="text-[2rem] text-white font-[700] tracking-wider">
          Register
        </h1>
        <form
          className="flex text-white justify-center items-center flex-col gap-y-[2rem] border w-[55%] rounded-[1rem] h-[80%] "
          onSubmit={handleSubmit}
        >
          <span className="flex flex-col justify-start items-start w-[80%]">
            <label
              htmlFor="userName"
              className="font-[600] text-[1.1rem] leading-[1rem]"
            >
              Username
            </label>
            <input
              type="userName"
              name="userName"
              id="userName"
              value={values.userName}
              onChange={handleChange}
              className="w-[100%] h-[2.8rem] outline-none  bg-transparent border-b-2"
              placeholder=""
              autoComplete="on"
            />
          </span>

          <span className="flex flex-col justify-start items-start w-[80%]">
            <label
              htmlFor="email"
              className="font-[600] text-[1.1rem] leading-[1rem]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              className="w-[100%] h-[2.8rem] outline-none  bg-transparent border-b-2"
              placeholder=""
              autoComplete="on"
            />
          </span>

          <span className="flex flex-col justify-start items-start  w-[80%]">
            <label
              htmlFor="C_password"
              className="font-[600] text-[1.1rem] leading-[1rem]"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="C_password"
              id="C_password"
              value={values.C_password}
              onChange={handleChange}
              className="w-[100%] outline-none h-[2.8rem] bg-transparent border-b-2"
            />
          </span>

          <span className="flex flex-col justify-start items-start  w-[80%]">
            <label
              htmlFor="password"
              className="font-[600] text-[1.1rem] leading-[1rem]"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              className="w-[100%] outline-none h-[2.8rem] bg-transparent border-b-2"
            />
          </span>

          <button type="submit" className="w-[90%] h-[2.5rem] border">
            Submit
          </button>
        </form>
      </div>
    {/* //    ) :(<div className="h-[92vh] w-[100%] xs:h-[95vh] flex justify-center items-center bg-yellow-500"><Loading/></div>)} */}
    </>
  );
};

export default Register;
import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Button, Logo, Input } from "./index";
import { register as authRegister, login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const Register = async (data) => {
    setError("");
    try {
      const session = authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/login");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center">
        <div
          className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(Register)}>
            <div className="space-y-5">
              <Input
                label="name"
                placeholder="Enter your name"
                type="text"
                {...register("name",{
                    required:true,

                })}
              />
              <Input label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email",{
                required:true,
                validate:{
                    matchPattern:(value)=>{
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 
                        "Invalid email address"
                    }
                }
              })}/>
              <Input label="password"
              placeholder="Enter your password"
              type="password"
              {...register('password',{
                required:true,
              })}
              />
              <Button type="submit" className="w-full">Sign up</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;

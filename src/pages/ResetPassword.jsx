import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import { forgotPasswordValidationSchema, resetPasswordValidationSchema } from "../formik/FormValication";
import { useNavigate, useSearchParams } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import { getErrorMessage, serverUrl } from "../utils/Infos";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

const ResetPassword = () => {
  const [searchParam] = useSearchParams();

  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();

  const resetPassword = async (data) => {
    const response = await axiosInstance.post(
      `${serverUrl}auth/resetpassword`,
      data
    );
    return response.data;
  };

  const resetPasswordMutation = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: resetPassword,
    onSuccess: (result) => {
      const { message } = result;
      toast.success(message, {
        className: "text-[0.8rem] text-green-500",
      });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error), {
        className: "text-[0.8rem] text-red-500",
      });
    },
  });

  const handleFormSubmit = (val) => {
    const role = searchParam.get("role") || "customer";
    const data = {
      newPassword:val.password,
      role,
      token :searchParam.get("token")

    };
    resetPasswordMutation.mutate(data);
  };

  const handleBackToLoginClick = () => {
    const role = searchParam.get("role");
    if (role === "customer") {
      navigate("/user/login");
    } else if (role === "restaurant") {
      navigate("/restaurant/signin");
    } else if (role === "delivery") {
      navigate("/delivery/signin");
    }
  };


  const handlePassworModeChange =()=>{
    setShowPassword((prev)=>!prev)
  }

  return (
    <section className="w-full h-screen flex justify-center items-center p-2">
      <article className="p-5 w-full max-w-[400px] shadow-md rounded-lg">
        <h1 className="text-[1rem] md:text-[1.8rem] font-semibold uppercase text-center">
          Reset Password
        </h1>

        <Formik
          initialValues={{ password: "",cpassword:"" }}
          validationSchema={resetPasswordValidationSchema}
          onSubmit={(val) => {
            handleFormSubmit(val);
          }}
        >
          {({ handleBlur, handleChange, values }) => (
            <Form className="mt-3">
              <div className="mt-3 w-full relative">
                <div className="w-full relative">
                  <LockKeyhole className="absolute top-[50%] -translate-y-[50%] left-2 w-4 h-4" />
                  <input
                    type={!showPassword ? "password" : "text"}
                    name="password"
                    className="border border-gray-400 rounded-lg p-2 w-full px-7 "
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {!showPassword ? (
                    <Eye
                      className="absolute top-[50%] -translate-y-[50%] right-2 w-4 h-4 cursor-pointer"
                      onClick={handlePassworModeChange}
                    />
                  ) : (
                    <EyeOff
                      className="absolute top-[50%] -translate-y-[50%] right-2 w-4 h-4 cursor-pointer"
                      onClick={handlePassworModeChange}
                    />
                  )}
                </div>
                <ErrorMessage
                  name="password"
                  component={"p"}
                  className="text-[0.7rem] text-red-500"
                />
              </div>

              <div className="mt-3 w-full relative">
                <div className="w-full relative">
                  <LockKeyhole className="absolute top-[50%] -translate-y-[50%] left-2 w-4 h-4" />
                  <input
                    type={ "text"}
                    name="cpassword"
                    className="border border-gray-400 rounded-lg p-2 w-full px-7 "
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cpassword}
                  />
                </div>
                <ErrorMessage
                  name="cpassword"
                  component={"p"}
                  className="text-[0.7rem] text-red-500"
                />
              </div>

              <div className="mt-5 flex justify-center items-center">
                <button
                  type="submit"
                  disabled={resetPasswordMutation.isPending}
                  className="p-2 w-[60%] bg-yellow-400 rounded-full flex justify-center items-center gap-1"
                >
                  Submit {resetPasswordMutation.isPending && <Loader />}
                </button>
              </div>

              <div className="mt-5 text-[0.7rem] flex justify-center items-center w-full">
                <span
                  className="cursor-pointer"
                  onClick={handleBackToLoginClick}
                >
                  Back to Login
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </article>
    </section>
  );
};

export default ResetPassword;

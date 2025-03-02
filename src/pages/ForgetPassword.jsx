import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import { forgotPasswordValidationSchema } from "../formik/FormValication";
import { useNavigate, useSearchParams } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import { getErrorMessage, serverUrl } from "../utils/Infos";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const ForgetPassword = () => {

    const [searchParam] = useSearchParams();

    const navigate = useNavigate();

    const forgotPassword = async(data)=>{

        const response = await axiosInstance.post(`${serverUrl}auth/forgotPassword`,data)
        return response.data;
    }

    const forgotpasswordMutation = useMutation({
        mutationKey:["forgot-password"],
        mutationFn:forgotPassword,
        onSuccess:(result)=>{
            const {message} = result;
            toast.success(message,{
                className:"text-[0.8rem] text-green-500"
            })
        },
        onError:(error)=>{
            toast.error(getErrorMessage(error),{
                className:"text-[0.8rem] text-red-500"
            })
        }
    })


    const handleFormSubmit = (val)=>{
      const role = searchParam.get("role") || "customer";
      const data = {
         ...val,
         role
      }
     forgotpasswordMutation.mutate(data);
    }


    const handleBackToLoginClick = ()=>{
        const role = searchParam.get("role")
        if(role === "customer")
        {
            navigate("/user/login")
        }else if(role === "restaurant")
        {
            navigate("/restaurant/signin")
        }else if(role === "delivery"){
            navigate("/delivery/signin")
        }
    }


  return (
    <section className="w-full h-screen flex justify-center items-center p-2">
      <article className="p-5 w-full max-w-[400px] shadow-md rounded-lg">
        <h1 className="text-[1rem] md:text-[1.8rem] font-semibold uppercase text-center">
          Forget Password
        </h1>

        <Formik
        initialValues={{email:""}}
        validationSchema={forgotPasswordValidationSchema}
        onSubmit={(val)=>{
            handleFormSubmit(val)
        }}>

        {
            ({handleBlur,handleChange ,values})=>(
                <Form className="mt-3">
                    <div className="w-full">
                        <input 
                        name="email"
                        type="text" 
                        placeholder="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email} 
                        className="border border-gray-400 rounded-lg w-full p-2" />
                        <ErrorMessage name="email" component={"p"} className="text-[0.8rem] text-red-500"/>
                    </div>

                    <div className="mt-5 flex justify-center items-center">
                         <button 
                         type="submit" 
                         disabled={forgotpasswordMutation.isPending}
                         className="p-2 w-[60%] bg-yellow-400 rounded-full flex justify-center items-center gap-1">
                            Submit {
                                forgotpasswordMutation.isPending && <Loader/>
                            }
                        </button>
                    </div>

                    <div className="mt-5 text-[0.7rem] flex justify-center items-center w-full">
                       <span 
                       className="cursor-pointer"
                       onClick={handleBackToLoginClick}>Back to Login</span>
                    </div>

                </Form>
            )
        }

        </Formik> 

      </article>
    </section>
  );
};

export default ForgetPassword;

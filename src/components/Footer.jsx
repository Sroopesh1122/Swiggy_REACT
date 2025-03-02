import React from "react";
import emoji from "../assets/img/emoji.png";
import { useNavigate } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const SERVICES = [
    {
      label: "Customer",
      options: [
        {
          label: "SignIn",
          href: "/user/login",
        },
        {
          label: "SignUp",
          href: "/swiggy/auth/otp?user=customer",
        },
      ],
    },
    {
      label: "Restaurant",
      options: [
        {
          label: "SignIn",
          href: "/restaurant/signin",
        },
        {
          label: "SignUp",
          href: "/swiggy/auth/otp?user=restaurant",
        },
      ],
    },
    {
      label: "Delivery Partner",
      options: [
        {
          label: "SignIn",
          href: "/delivery/signin",
        },
        {
          label: "SignUp",
          href: "/swiggy/auth/otp?user=delivery",
        },
      ],
    },
  ];

  const navigate = useNavigate();

  const handleServiceCLick = (link) => {
    navigate(link);
  };

  return (
    <section className="shadow-lg">
      <section className="w-full flex flex-col lg:flex-row justify-start items-center lg:items-start p-2 md:p-5">
        <article className="w-[300px]">
          <h1 
          className="text-[2rem] font-semibold flex justify-center items-center cursor-pointer"
          onClick={()=>navigate("/")}>
            <img src={emoji} alt="" className="w-10 h-10" />
            SWIGGY
          </h1>
          <h1 className="text-[0.8rem] text-center">
          © 2025 All rights reserved
          </h1>
        </article>

        <article className="flex-1">
          <h1 className="text-[1.7rem] ">Services</h1>

          <div className="w-full grid grid-cols-3">
            {SERVICES?.map((service, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-start items-start"
              >
                <h1 className="text-[1rem] mb-4">{service.label}</h1>
                {service.options.map((option, idx) => (
                  <h1
                    key={idx}
                    className="cursor-pointer text-[0.8rem] hover:text-yellow-500"
                    onClick={() => handleServiceCLick(option.href)}
                  >
                    {option.label}
                  </h1>
                ))}
              </div>
            ))}
          </div>
        </article>
      </section>
      <section className="py-7 w-full flex justify-center items-center gap-2">
         <Instagram size={15} />
         <Facebook size={15} />

      </section>
    </section>
  );
};

export default Footer;

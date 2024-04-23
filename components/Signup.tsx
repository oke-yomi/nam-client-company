import Image from "next/image";
import React from "react";
import RegisterForm from "./RegisterForm";

const Signup = () => {
  return (
    <div className="max-w-screen-xxl px-4 w-full mx-auto">
      <div className="w-full h-full flex">
        <div className="bg-[url('/images/signup.webp')] h-screen w-1/2 hidden lg:block">
          <div className="w-full h-full flex justify-center items-end px-[60px] py-[71px]">
            <div className="text-white bg-white/5 backdrop-blur-md py-9 px-[74px] rounded-lg text-center">
              <p className="font-black text-2xl">Accept Response Invitation</p>

              <p className="my-6">
                The customer’s emotions can be analysed to determine how
                satisfied they are with the service they’ve received. And based
                on the feedback, organizations can learn how to improve the
                quality of their services.
              </p>

              <div className="flex gap-1 justify-center items-center">
                <span className="w-2 h-2 rounded bg-nam-gray" />
                <span className="w-6 h-[6px] rounded bg-nam-main" />
                <span className="w-2 h-2 rounded bg-nam-gray" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          <div className="w-full h-full pt-10 pb-8 px-6 lg:px-[140px] lg:pt-[72px] lg:pb-[76px]">
            <div className="flex flex-col justify-center items-center px-[52px] lg:px-0 mb-6 lg:mb-12">
              <Image src={"/logo.svg"} alt={""} width={64} height={40} />
              <h5 className="text-2xl lg:text-32px font-extrabold lg:font-black mt-4 text-center">Create Company Account</h5>
            </div>

            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

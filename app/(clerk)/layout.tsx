import Image from "next/image";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-nam-gray">
      <div className="max-w-screen-xxl w-full mx-auto bg-white">
        <div className="w-full lg:h-screen h-full flex">
          <div className="bg-nam-black h-screen w-1/2 hidden lg:block relative">
            <Image
              src="/images/signup.webp"
              alt=""
              fill
              className="absolute w-full h-full top-0 left-0 right-0 object-cover"
            />
            <div className="w-full h-full flex justify-center items-end px-[60px] py-[71px]">
              <div className="text-white bg-white/5 backdrop-blur-md py-9 px-[74px] rounded-lg text-center">
                <p className="font-black text-2xl">
                  Accept Response Invitation
                </p>

                <p className="my-6">
                  The customer’s emotions can be analysed to determine how
                  satisfied they are with the service they’ve received. And
                  based on the feedback, organizations can learn how to improve
                  the quality of their services.
                </p>

                <div className="flex gap-1 justify-center items-center">
                  <span className="w-2 h-2 rounded bg-nam-gray" />
                  <span className="w-6 h-[6px] rounded bg-nam-main" />
                  <span className="w-2 h-2 rounded bg-nam-gray" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full overflow-hidden">
            <div className="w-full h-full px-6 lg:px-[140px] overflow-y-scroll no-scrollbar">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

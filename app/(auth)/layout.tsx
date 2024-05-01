import { FaCaretDown } from "react-icons/fa";
import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-nam-gray">
      <div className="max-w-screen-xxl w-full mx-auto h-screen bg-image overflow-hidden">
        <div className="w-full h-full lg:py-12 py-7 px-4 lg:px-12">
          <div className="mx-auto h-full">
            <div className="w-full flex justify-between items-center mb-5 lg:mb-0 px-2 lg:px-0">
              <Image
                src={"/logo.svg"}
                alt={""}
                width={74}
                height={64}
                className="w-16 h-10 lg:w-[74px] lg:h-16"
              />

              <div className="flex items-center justify-between gap-1">
                <p className="font-medium text-xs lg:text-sm text-nam-heading">
                  English
                </p>
                <FaCaretDown size={10} color="#8E8EA9" />
              </div>
            </div>

            <div className="w-full h-[90%] lg:h-[85%]">
              <div className="w-full max-w-[560px] mx-auto h-full lg:shadow-custom-shadow lg:rounded-2xl">
                <div className="overflow-y-scroll no-scrollbar w-full h-full px-2 lg:px-12 lg:py-12">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

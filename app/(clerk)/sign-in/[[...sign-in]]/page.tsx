import { SignIn } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  return <SignIn path="/sign-in" />;
};

export default Page;

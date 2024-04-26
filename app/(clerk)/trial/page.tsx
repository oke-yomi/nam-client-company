"use client";

import Signup from "@/components/Signup";
import { useSignUp } from "@clerk/nextjs";

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();

  return (
    <div className="">
      <Signup />
    </div>
  );
}

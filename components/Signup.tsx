"use client";

import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import { UserButton } from "@clerk/nextjs";
import SignupCode from "./SignupCode";

const Signup = () => {
  const [pendingVerification, setPendingVerification] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");

  return (
    <div>
      <UserButton />

      <div>
        {pendingVerification ? (
          <SignupCode emailAddress={emailAddress} />
        ) : (
          <RegisterForm
            setPendingVerification={setPendingVerification}
            setEmailAddress={setEmailAddress}
          />
        )}
      </div>
    </div>
  );
};

export default Signup;

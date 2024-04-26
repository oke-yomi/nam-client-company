"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import FormInput from "./shared/FormInput";
import Link from "next/link";
import { useSignUp } from "@clerk/nextjs";
import { signupSchema } from "@/lib/schema";
import { useToast } from "./ui/use-toast";

interface Props {
  setPendingVerification: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm = ({ setPendingVerification }: Props) => {
  const { isLoaded, signUp } = useSignUp();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      companyName: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    setIsLoading(true);

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast({
        title: "Registration Ongoing",
        description: "Kindly check your email to add the otp code",
      });

      setPendingVerification(true);
    } catch (error: any) {
      let errorMessage = "There was a problem with your request.";
      if (error && error.errors && error.errors.length > 0) {
        errorMessage = error.errors[0].message;
      }
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
      console.error(JSON.stringify(error, null, 2));
    }

    setIsLoading(false);
    // form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 lg:space-y-9"
      >
        <div className="space-y-4 lg:space-y-6">
          <FormInput
            form={form}
            label="Company Name*"
            name="companyName"
            placeholder="Namhr"
          />

          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <FormInput
              form={form}
              label="First name*"
              name="firstname"
              placeholder="Kai"
            />
            <FormInput
              form={form}
              label="Last Name*"
              name="lastname"
              placeholder="Doe"
            />
          </div>

          <FormInput
            form={form}
            label="Email*"
            name="email"
            placeholder="kaidoe@gmail.com"
          />

          <FormInput form={form} label="Phone Number*" name="phone" />

          <FormInput form={form} label="Password*" name="password" password />

          <FormInput
            form={form}
            label="Confirm Password*"
            name="confirmPassword"
            password
          />
        </div>

        <div className="">
          <Button
            type="submit"
            variant="namPrimary"
            className="rounded p-4 w-full font-medium"
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>

          <div className="flex items-center justify-center gap-1 mt-4 font-medium text-sm">
            <p className="text-nam-dark">Already have an account?</p>
            <Link href={""} className="text-nam-main">
              Login
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;

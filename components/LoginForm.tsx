"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import FormInput from "./shared/FormInput";
import Link from "next/link";
import { loginSchema } from "@/lib/schema";
import { useToast } from "./ui/use-toast";
import { Checkbox } from "./ui/checkbox";
import Image from "next/image";

const LoginForm = () => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);

    // setEmailAddress(values.email);

    try {
      console.log(values);

      toast({
        title: "Login Ongoing",
        description: "Successfully logged In",
      });

      //   setPendingVerification(true);
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
    <div className="w-full h-full py-5 lg:py-0">
      <div className="text-center lg:mb-7 mb-10">
        <p className="text-2xl lg:text-32px font-extrabold text-nam-heading mb-2">
          Welcome back!
        </p>
        <p className="text-sm lg:text-base text-nam-placeholderGray">
          Log in to your Nam account
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-10 lg:space-y-8"
        >
          <div className="space-y-6">
            <FormInput
              form={form}
              label="Email*"
              name="email"
              placeholder="kaidoe@gmail.com"
            />

            <div className="">
              <FormInput
                form={form}
                label="Password*"
                name="password"
                password
              />
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    className="lg:w-5 lg:h-5 h-[18px] w-[18px] rounded data-[state=checked]:bg-nam-main data-[state=checked]:ring-0 shadow-none border-[#C0C0CF]"
                  />
                  <label
                    htmlFor="remember"
                    className="lg:text-sm text-xs text-nam-placeholderGray"
                  >
                    Remember me
                  </label>
                </div>

                <Link
                  href={"/forgot-password"}
                  className="font-medium text-xs text-nam-main"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>

          <div className="">
            <Button
              type="submit"
              variant="namPrimary"
              className="rounded p-4 w-full font-medium"
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>

            <div className="flex items-center justify-center gap-1 mt-4 font-medium text-sm">
              <p className="text-nam-dark">Don’t have an account?</p>
              <Link href={"/sign-up"} className="text-nam-main">
                Create account
              </Link>
            </div>

            <div className="mt-3 lg:mt-4 flex items-center justify-between space-x-2">
              <span className="h-[1px] w-full bg-[#04030866]" />
              <p>or</p>
              <span className="h-[1px] w-full bg-[#04030866]" />
            </div>

            <div className="mt-3">
              <div className="w-full rounded border border-nam-dark lg:py-[15px] py-3 lg:px-5 px-[10px] flex justify-center items-center gap-2">
                <Image src={"/svgs/google.svg"} alt="" width={19} height={19} />
                <p className="font-semibold text-nam-dark">
                  Continue with Google
                </p>
              </div>
            </div>
          </div>
        </form>
      </Form>

      <div className="lg:mt-14 h-1 w-full" />
    </div>
  );
};

export default LoginForm;

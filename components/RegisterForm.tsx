"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import FormInput from "./shared/FormInput";
import Link from "next/link";

const formSchema = z
  .object({
    companyName: z
      .string()
      .min(2, { message: "Company name must be at least 2 characters." }),
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    email: z
      .string()
      .min(1, { message: "Email address is required" })
      .email({ message: "Invalid email address" }),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // setIsLoading(true);

    console.log(values);

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
            Submit
          </Button>

          <div className="flex items-center justify-center gap-1 mt-4 font-medium text-sm">
            <p className="text-nam-dark">Already have an account?</p>
            <Link href={""} className="text-nam-main">Login</Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;

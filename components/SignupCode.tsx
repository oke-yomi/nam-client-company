import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSignUp } from "@clerk/nextjs";
import { useToast } from "./ui/use-toast";
import { signupCodeSchema } from "@/lib/schema";
import Image from "next/image";

interface Props {
  emailAddress: string;
}

const SignupCode = ({ emailAddress }: Props) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isCodeReady, setIsCodeReady] = useState(false);

  const NUM_SLOTS = 6;

  const form = useForm<z.infer<typeof signupCodeSchema>>({
    resolver: zodResolver(signupCodeSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signupCodeSchema>) => {
    setIsLoading(true);

    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.pin,
      });
      if (completeSignUp.status !== "complete") {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(completeSignUp, null, 2)}
              </code>
            </pre>
          ),
        });
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        // router.push("/");
        console.log(JSON.stringify(completeSignUp));
      }
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
  };

  return (
    <div className="w-full h-full pt-36 pb-10 lg:pt-40">
      <div className="flex flex-col justify-center items-center px-[52px] lg:px-0 mb-6 lg:mb-12">
        <Image src={"/logo.svg"} alt={""} width={64} height={40} />
        <h5 className="text-2xl lg:text-32px font-extrabold lg:font-black mt-4 text-center text-nam-black">
          Check your email
        </h5>
        {isCodeReady ? (
          <p className="text-[#667085] mt-3">
            Input the verification code sent to to{" "}
            {emailAddress || "your email"}
          </p>
        ) : (
          <p className="text-[#667085] mt-3">
            We sent a verification link to {emailAddress || "your email"}
          </p>
        )}
      </div>

      <div className="mt-14">
        {isCodeReady ? (
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-14"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP maxLength={NUM_SLOTS} {...field}>
                          <InputOTPGroup className="w-full justify-between">
                            {Array.from({ length: NUM_SLOTS }, (_, index) => (
                              <InputOTPSlot
                                key={index}
                                index={index}
                                className="shadow-none h-14 w-14 rounded-lg border border-nam-main ring-nam-main"
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="namPrimary"
                  className="rounded p-4 w-full font-medium"
                >
                  {isLoading ? "Loading..." : "Submit"}
                </Button>
              </form>
            </Form>
          </div>
        ) : (
          <Button
            variant="namPrimary"
            className="rounded p-4 w-full font-medium"
            onClick={() => setIsCodeReady(true)}
          >
            Enter code
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignupCode;

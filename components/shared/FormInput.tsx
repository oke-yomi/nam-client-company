import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";
import { BsEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

type FormInputProps = {
  form: UseFormReturn<any>;
  label: string;
  placeholder?: string;
  name: string;
  password?: boolean;
};

const FormInput = ({
  form,
  label,
  placeholder,
  name,
  password,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold text-nam-darkGray lg:text-xs text-sm">
            {label}
          </FormLabel>
          <FormControl>
            <div className="w-full relative">
              <Input
                placeholder={placeholder ?? ""}
                {...field}
                className={`rounded py-[14px] px-2 lg:px-4 border-nam-borderGray focus-visible:ring-nam-main placeholder:text-nam-placeholderGray ${
                  form.formState.errors[field.name]
                    ? "border-destructive focus-visible:ring-0"
                    : ""
                }`}
                type={password && !showPassword ? "password" : "text"}
              />

              {password && (
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 transform translate-y-[-50%] right-2 lg:right-4 cursor-pointer w-fit h-fit"
                >
                  {showPassword ? (
                    <BsEyeSlashFill color="#666687" width={16} height={16} />
                  ) : (
                    <IoEyeSharp color="#666687" width={16} height={16} />
                  )}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;

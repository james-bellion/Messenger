"use-client";

import clsx from "clsx";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

// types fo our input
// ?: means optional so we dont have to always pass it.
interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

// assign input props from interface to this input.
// destructure all the values
const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div>
      <label
        className="
                 block
                 text-sm
                 font-medium
                 leading-6
                 text-gray-900
                 "
        htmlFor={id}
      >
        {label}

      </label>
      <div className="mt-2">

        <input
        // atributes
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          // open an object and spread register function
          // first param is id, second is an object: required
          {...register(id, { required })}

        //   clsx is an impoted libery that alows us to dynamically use our classes
          className={clsx(
            `
                     form-input
                     block
                     w-full
                     rounded-md
                     border-0
                     py-1.5
                     text-gray-900
                     shadow-sm
                     ring-1
                     ring-inset
                     ring-gray-300
                     placeholder:text-gray-400
                     focus:ring-2
                     focus:ring-inset
                     focus:ring-sky-600
                     sm:text-sm
                     sm:leading-6`,
                    //  dynamic classes:
                    // if thers an id inside of our errors > will give a red outline
                    // if disabled > apply styles opacity ect
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;

// using tailwind Css form package

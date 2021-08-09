import { ErrorMessage, Field, useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  as?: string;
  label?: string;
  options?: (string | number)[];
};

const Input: React.FC<InputProps> = ({ as, options, label, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <div className="pt-6 flex text-gray-800 flex-col">
      <label
        htmlFor={field.name}
        className="text-xs uppercase text-gray-600 font-semibold"
      >
        {label || field.name}
      </label>
      <Field
        {...props}
        {...field}
        id={field.name}
        as={as}
        className=" mt-2 mb-1 bg-gray-200 border-b-2 border-gray-300 py-1 resize-none placeholder-gray-500 "
      >
        {options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </Field>
      {error && (
        <ErrorMessage
          name={field.name}
          component="div"
          className="text-red-400 text-sm "
        />
      )}
    </div>
  );
};

export default Input;

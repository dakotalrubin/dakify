import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// InputProps interface extends normal HTML Input attributes
interface InputProps 
  extends React.InputHTMLAttributes<HTMLInputElement>{}

// Input component extracts className, type, disabled, props and ref, then
// forwards all normal and extended HTML button attributes to a child component
const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  type,
  disabled,
  ...props
}, ref) => {
  return (
    <input
      className={twMerge(`flex border border-transparent rounded-md w-full 
        bg-neutral-700 px-3 py-3 text-sm file:border-0 file:bg-transparent 
        file:text-sm file:font-medium placeholder:text-neutral-400 
        disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none`, 
        className)}
      type={type}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  );
});

// Update the Input component's displayName attribute
Input.displayName = "Input";

export default Input;

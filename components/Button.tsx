import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// ButtonProps interface extends normal HTML Button attributes
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

// Button component extracts className, children, disabled, type, props
// and ref, then forwards all normal and extended HTML button attributes
// to a child component
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  type = "button",
  ...props
}, ref) => {
  return (
    <button type={type} className={twMerge(`w-full rounded-full bg-green-500 
      border-transparent px-3 py-3 disabled:cursor-not-allowed 
      disabled:opacity-50 font-bold text-black hover:opacity-75 transition`,
      className)} disabled={disabled} ref={ref} {...props}>
      {children}
    </button>
  );
});

// Update the Button component's displayName attribute
Button.displayName = "Button";

export default Button;

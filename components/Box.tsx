import { twMerge } from "tailwind-merge";

// Interface BoxProps contains ReactNode children and optional className string
interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

// Box component accepts ReactNode children and optional className string
// from BoxProps interface
const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={twMerge("h-fit w-full bg-neutral-900 rounded-lg",
      className)}>
      {children}
    </div>
  );
}

export default Box;
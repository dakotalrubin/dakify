import { twMerge } from "tailwind-merge";

// BoxProps interface contains ReactNode children and optional className string
interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

// Box component accepts ReactNode children and optional className string
// from BoxProps interface
const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={twMerge(`bg-neutral-900 rounded-lg h-fit w-full`,
      className)}>
      {children}
    </div>
  );
}

export default Box;

import { InputHTMLAttributes } from 'react';

import { cn } from "@/lib/utils"

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = (props: CheckboxProps) => {
  const { className, type, ...rest } = props;

  return (
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border border-gray-400 cursor-pointer",
        className
      )}
      {...rest}
    />
  );
};

export default Checkbox;

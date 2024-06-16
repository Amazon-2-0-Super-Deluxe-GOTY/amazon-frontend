import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const MaskedInputCardNumber = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
  const [value, setValue] = React.useState('');

  const handleChange = (e:any) => {
    let inputValue = e.target.value.replace(/\D/g, '');
    if (inputValue.length > 16) inputValue = inputValue.slice(0, 16);

    const formattedValue = inputValue
      .match(/.{1,4}/g)
      ?.join('-')
      .slice(0, 19) || '';

    setValue(formattedValue);
  };

  return (
    <input
      {...props}
      ref={ref}
      value={value}
      onChange={handleChange}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      type="text"
      placeholder="0000-0000-0000-0000"
    />
  );
});
MaskedInputCardNumber.displayName = "MaskedInputCardNumber";

export const MaskedInputCardDate = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
  const [value, setValue] = React.useState('');

  const handleChange = (e:any) => {
    let inputValue = e.target.value.replace(/\D/g, '');

    if (inputValue.length > 4) inputValue = inputValue.slice(0, 4);

    const month = inputValue.slice(0, 2);
    const year = inputValue.slice(2, 4);
    const formattedValue = `${month}${year ? '/' + year : ''}`;

    setValue(formattedValue);
  };

  return (
    <input
      {...props}
      ref={ref}
      value={value}
      onChange={handleChange}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      type="text"
      placeholder="MM/YY"
    />
  );
});
MaskedInputCardDate.displayName = "MaskedInputCardDate";

export const MaskedInputCardCVV = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
  const [value, setValue] = React.useState('');

  const handleChange = (e:any) => {
    let inputValue = e.target.value.replace(/\D/g, '');
    if (inputValue.length > 3) inputValue = inputValue.slice(0, 3);

    setValue(inputValue);
  };

  return (
    <input
      {...props}
      ref={ref}
      value={value}
      onChange={handleChange}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      type="password"
      placeholder="***"
    />
  );
});
MaskedInputCardCVV.displayName = "MaskedInputCardCVV";

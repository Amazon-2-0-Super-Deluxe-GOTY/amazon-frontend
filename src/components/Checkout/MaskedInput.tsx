import React from 'react';
import InputMask from 'react-input-mask';

export const MaskedInputCardNumber = (props:any) => {
  return (
    <InputMask 
      mask="9999-9999-9999-9999"
      {...props}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {(inputProps:any) => <input {...inputProps} type="text" />}
    </InputMask>
  );
};

export const MaskedInputCardDate = (props:any) => {
  return (
    <InputMask 
      mask="99/99"
      {...props}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {(inputProps:any) => <input {...inputProps} type="text" />}
    </InputMask>
  );
};

export const MaskedInputCardCVV = (props:any) => {
  return (
    <InputMask 
      mask="999"
      {...props}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {(inputProps:any) => <input {...inputProps} type="password" />}
    </InputMask>
  );
};

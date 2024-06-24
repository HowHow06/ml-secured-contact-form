"use client";
import React from "react";
import { Input } from "../ui/input";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  onValueChange?: (val: string) => void;
};

const NRICInput = ({ value, onValueChange, ...rest }: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const validInput = value.replace(/[^0-9-]/g, "");

    const digitCount = value.replace(/-/g, "").length;
    if (digitCount > 12) {
      return;
    }

    if (onValueChange) {
      onValueChange(validInput);
    }
  };

  return (
    <Input
      {...rest}
      value={value}
      onChange={handleInputChange}
      inputMode="numeric"
      placeholder="xxxxxx-xx-xxxx OR xxxxxxxxxxxx"
    />
  );
};

export default NRICInput;

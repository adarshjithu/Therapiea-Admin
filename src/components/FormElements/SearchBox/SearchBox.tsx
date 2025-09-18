"use client";
import React, { useState, useEffect, ChangeEvent } from "react";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
 
}

export const SearchBox =  ({
  value,
  onChange,
  placeholder = "Search...",
  
}:SearchProps) => {
  const [inputValue, setInputValue] = useState(value);

  // Update local input value when prop changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(inputValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, onChange, 500]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      className="rounded-lg border border-gray-300 px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
    />
  );
};

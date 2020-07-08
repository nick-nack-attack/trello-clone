import { useRef, useEffect } from "react"

export const useFocus = () => {
    // use the useRef hook to get access to rendered input element
    // provide actual type - which is an input element
    const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus()
  });

  return ref;
};
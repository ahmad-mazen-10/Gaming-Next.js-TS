"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useLocalStorageState<T>(key: string, initialValue: T):[T, Dispatch<SetStateAction<T>>] {
  
  const init: () => T = () => {
    const storedValue = global?.window?.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  }; //return storedValue

  //Put the value ->(returned from init func) as an initial-value to state
  const [value, setValue] = useState(init);

  useEffect(() => {
    global.window.localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
    
    return [value, setValue];
}

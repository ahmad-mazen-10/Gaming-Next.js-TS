"use client";
import React from "react";
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { FormInputProps } from "../(grid)/@types";


// const FormInput = ({ name, label, type }: FormInputProps) => {
    const FormInput: React.FC<FormInputProps> = ({ name, label, type }) => {
    const form = useFormContext();
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel className=" text-gray-50 text-base">{label}</FormLabel>}
                    <FormControl>
                        <Input
                            className=" text-base text-white"
                            type={type || "text"}
                            placeholder={label || "Enter ..."}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage className=" text-red-500 text-sm font-semibold" />
                </FormItem>
            )}
        />
    );
};

export default FormInput;
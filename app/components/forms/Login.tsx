'use client'
import React, { useTransition } from 'react'
import Link from 'next/link';
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Form } from '@/components/ui/form';
import FormInput from '../FormInput'
import Logo from '../defaults/Logo';
import MotionItem from '../defaults/MotionItem'
import MaxWidthWrapper from '../defaults/MaxWidthWrapper'
import { login } from '@/app/functions/auth';
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

function Login() {

    const loginSchema = z.object({
        email: z.string().email({ message: "Must be enter a valid email" }),
        password: z.string().min(6, { message: "Password must be at  least 6 characters" }),
    })
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const [isPending, startTransition] = useTransition();
    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        console.log(data);
        startTransition(async () => {
            const res = await login(data);
            if (res.data) {
                toast.success(res.data);
                redirect("/");
            } else {
                toast.error(res.error);
            }
        })
    }

    return (
        <MotionItem animate={{ opacity: 1, y: 0, transition: { duration: 1 } }} initial={{ opacity: 0, y: 100 }}>
            <MaxWidthWrapper customPadding={" py-14"}
                className=" flex flex-col gap-4 items-center w-full bg-black/60 rounded-2xl border border-input"
            >
                <Logo />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
                        <FormInput name='email' label='Email' type='email' />
                        <FormInput name='password' label='password' type='password' />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
                <div className="capitalize text-base font-semibold flex items-center gap-2">
                    <p className=" text-gray-50 ">Do not have an account ?!</p>{" "}
                    <Link href={'/signup'} className=" text-rose-500 hover:underline">Register</Link>
                </div>
            </MaxWidthWrapper>
        </MotionItem>
    )
}

export default Login

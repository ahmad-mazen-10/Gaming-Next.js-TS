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
import FileUpload from '../FileUpload';
import { signup } from '@/app/functions/auth';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';


function Signup() {

  const signupSchema = z.object({
    name: z.string().min(5),
    email: z.string().email({ message: "Must be enter a valid email" }),
    password: z.string().min(6, { message: "Password must be at  least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Password must be at  least 6 characters" }),
    avatar: z.any(),
  }).refine((data) => data.password === data.confirmPassword, { message: "password doesn't match", path: ['confirmPassword'] })

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: '',
    }
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    startTransition(async () => {
      if (data.avatar) {
        const formData = new FormData();
        formData.append('file', data.avatar[0]);
        formData.append('upload-presets', 'Restrict unsigned image URLs');
        try {
          const res = await fetch(process.env.NEXT_PUBLIC_URL_ENDPOINT!, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
          });
          console.log(res);

          if (!res.ok) {
            const errorResponse = await res.json(); // Show Cloudinary error details
            console.error("Cloudinary Error:", errorResponse);
            throw new Error("Failed to upload photo");
          }
        
          const imageKit = await res.json();
          data.avatar = {
            secure_url: imageKit.secure_url,
            public_id: imageKit.public_id,
          };

        } catch (error) {
          console.error("Photo upload failed:", error);
        }

        const response = await signup(data);
        console.log(response);
        if (response?.message && !response.error) {
          toast.success(response.message);
          redirect('/login')
        }
        else toast.error(response.error);
      }
    });
  }

  return (
    <MotionItem animate={{ opacity: 1, y: 0, transition: { duration: 1 } }} initial={{ opacity: 0, y: 100 }}>
      <MaxWidthWrapper
        customPadding={" py-14"}
        className=" flex flex-col gap-4 items-center w-full bg-black/60 rounded-2xl border border-input"
      >
        <Logo />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
            <FileUpload name='avatar' />
            <FormInput name='name' label='Name' type='text' />
            <FormInput name='email' label='Email' type='email' />
            <FormInput name='password' label='Password' type='password' />
            <FormInput name='confirmPassword' label='Confirm Password' type='password' />
            <Button disabled={isPending}  type="submit">Submit</Button>
          </form>
        </Form>

        <div className="capitalize text-base font-semibold flex items-center gap-2">
          <p className=" text-gray-50 ">Do not have an account ?!</p>{" "}
          <Link href={'/login'} className=" text-rose-500 hover:underline">Login to UR Account</Link>
        </div>

      </MaxWidthWrapper>
    </MotionItem>
  )
}

export default Signup

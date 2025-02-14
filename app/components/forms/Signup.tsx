'use client'
import React, { useState } from 'react'
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
import { signup } from '@/app/functions/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ImageKit from "imagekit";
import Image from 'next/image';
import connect from '@/app/functions/connect';


const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

const signupSchema = z.object({
  name: z.string().min(5),
  email: z.string().email({ message: "Must be enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  avatar: z.object({
    public_id: z.string().min(1, "Public ID is required"), 
    secure_url: z.string().min(1, "Secure URL is required"),
  }).optional(),  
}).refine((data) => data.password === data.confirmPassword,
  { message: "password doesn't match", path: ['confirmPassword'] });



function Signup() {
  const router = useRouter();


  const [isPending, setIsPending] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: {
        public_id: '',
        secure_url: '',
      },
    }
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = event.target.files ? event.target.files[0] : null;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("useUniqueFileName", "true");

      imagekit.upload({
        file: file,
        fileName: file.name,
      }).then((response) => {
        if (response && response.url && response.fileId) {
          setUploadedImageUrl(response.url);
          form.setValue('avatar', {
            public_id: response.fileId,
            secure_url: response.url,      
          });
        }
      }).catch((error) => {
        console.error("Image upload failed :--> ", error);
      })
    }
  };



  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    await connect();
    try {
      const response = await signup({
        ...data,
        avatar: data.avatar ? {
          public_id: data.avatar.public_id,
          secure_url: data.avatar.secure_url, 
        } : null,
      });

      console.log(response)

      if (response?.message && !response.error) {
        toast.success(response.message);
        router.push('/login');
      } else {
        toast.error(response.error);
      }

    } catch (error) {
      console.error("Error submitting form:--> ", error);
      toast.error("An error occurred during signup");
    } finally {
      setIsPending(false);
    }
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

            <div>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                className="mt-2"
              />
              <label htmlFor="avatar" className="text-gray-50">Avatar</label>
              {uploadedImageUrl && <Image src={uploadedImageUrl} alt="Uploaded Avatar" className="mt-2" width={100} height={100} />}
            </div>

            <FormInput name='name' label='Name' type='text' />
            <FormInput name='email' label='Email' type='email' />
            <FormInput name='password' label='Password' type='password' />
            <FormInput name='confirmPassword' label='Confirm Password' type='password' />
            <Button disabled={isPending} type="submit">Submit</Button>
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

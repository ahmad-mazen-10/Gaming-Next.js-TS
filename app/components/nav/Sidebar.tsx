'use client'
import React from 'react';
import { TiHome } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import NavLink from './NavLink';
import Logo from '../defaults/Logo';
import { useGetUser } from '@/lib/queryFunctions';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { toast } from 'react-toastify';
import { Skeleton } from '@/components/ui/skeleton';
import { logout } from '@/app/functions/auth';
import { useQueryClient } from "@tanstack/react-query";

const NAV_LINKS = [
  {
    id: 1,
    label: 'Home',
    link: '/',
    icon: <TiHome />
  },
  {
    id: 2,
    label: 'Category',
    link: '/category',
    icon: <MdDashboard />
  },
  {
    id: 3,
    label: 'Wishlist',
    link: '/wishlist',
    icon: <FaHeart />
  },
  {
    id: 4,
    label: 'Friends',
    link: '/friends',
    icon: <BsFillPeopleFill />
  },
];

function Sidebar() {
  const { user, isLoading } = useGetUser();
  const queryClient = useQueryClient();

  const logOut = async () => {
    const res = await logout();
    if (res.success) {
      toast.success(res.success);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
    else toast.error(res.error);
  }

  return (
    <div className='col-span-2'>
      <div className=" py-5 px-10 w-auto h-screen sticky inset-0 flex flex-col items-start bg-black/30 text-gray-50">
        <Logo />
        {NAV_LINKS.map((navlink) => (
          <NavLink key={navlink.id} link={navlink.link} label={navlink.label} icon={navlink.icon} />
        ))}
      </div>
      
      {isLoading ? (
        <div className="mt-auto">
          <Skeleton className="h-4 w-[130px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      ) : (
        user?.data ? (
          <div className="mt-auto">
            <NavLink link="/settings" label="Settings" icon={<Settings />} />
            <Button onClick={logOut} variant={"destructive"}> Logout </Button>
          </div>
        )
          : null
      )}

    </div>
  );
}

export default Sidebar;
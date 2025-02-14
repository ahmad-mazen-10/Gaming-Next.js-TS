'use client'
import React from 'react'
import User from '../User'
import Search from '../Search'
import ButtonGame from '../defaults/ButtonGame'
import SkeletonCustom from '../SkeletonCustom'
import { useGetUser } from '@/lib/queryFunctions'

function Navbar() {
  const { user, isLoading } = useGetUser();

  return (
    <nav>
      <header className='flex justify-between items-center py-4'>
        <Search />
        {isLoading ? (
          <SkeletonCustom circle />
        ) : (
          user?.data
        ) ? (
          <User user={user.data} />
        ) : (
          <div className=" flex items-center gap-2">
            <ButtonGame link="/login" text="Login" />
            <ButtonGame link="/signup" text="Sign up" />
          </div>
        )}
      </header>
    </nav>
  )
}

export default Navbar
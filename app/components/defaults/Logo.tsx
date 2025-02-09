import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={'/'} className='text-xl my-2 lg:text-3xl md:text-2xl'>
        <h1 className='text-rose-500 font-semibold'>Gaming</h1>
    </Link>
  )
}

export default Logo
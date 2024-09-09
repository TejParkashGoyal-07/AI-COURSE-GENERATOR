import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';

function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
      <Image src="/vercel.svg" width={50} height={60} alt="Logo" />
      <UserButton />
    </div>
  );
}

export default Header;

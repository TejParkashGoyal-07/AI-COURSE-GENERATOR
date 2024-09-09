'use client';

import Image from 'next/image';
import React from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { RiStackFill } from "react-icons/ri";
import { CiPower } from "react-icons/ci";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from '../../../components/ui/progress';

function SideBar() {
    const Menu = [
        {
            id: 1,
            name: "Home",
            icon: <AiOutlineHome />,
            path: '/dashboard'
        },
        {
            id: 2,
            name: "Explore",
            icon: <RiStackFill />,
            path: '/dashboard/explore'
        },
        {
            id: 3,
            name: "Upgrade",
            icon: <IoShieldCheckmarkOutline />,
            path: '/dashboard/upgrade'
        },
        {
            id: 4,
            name: "Logout",
            icon: <CiPower />,
            path: '/dashboard/logout'
        }
    ];

    const path = usePathname();

    return (
        <div className='fixed h-full md:w-64 p-5 shadow-md'>
            <Image src={'/logo.svg'} width={160} height={100} alt="Logo" />
            <hr className='my-5' />
            <ul>
                {Menu.map((item,index) => (
                    <Link href={item.path}>
                    <li key={item.id} className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-50 hover:text-black rounded-lg mb-3 ${item.path === path && 'bg-gray-100 text-black'}`}>

                        <div className='text-2xl'>{item.icon}</div>
                        <h2>{item.name}</h2>
                    </li>
                    </Link>
                ))}
            </ul>
            <div className='absolute bottom-10 w-[80%]'>
            <Progress value={33} />
            <h2 className='text-sm my-2'>3 Out Of 5  Courses Created</h2>
            <h2 className='text-xs bg-gray-500'>Upgrade To Create More Courses</h2>
            </div>
        </div>
    );
}

export default SideBar;

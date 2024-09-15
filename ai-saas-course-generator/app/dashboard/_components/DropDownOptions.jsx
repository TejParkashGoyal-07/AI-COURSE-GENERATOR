import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../../components/ui/alert-dialog"

import { HiOutlineTrash } from "react-icons/hi2";
function DropDownOptions({ children, deleteCourse }) {
    const OnDeleteClick = () => {
        const[openDialog,setOpenDialog]=useState(false)

    }
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={()=>setOpenDialog(true)}><HiOutlineTrash></HiOutlineTrash>Delete</DropdownMenuItem>
                    <div className='flex items-center gap-1'><HiOutlineTrash />Delete</div>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog>
                
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={setOpenDialog(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={()=>{deleteCourse();setOpenDialog(false)}}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

export default DropDownOptions

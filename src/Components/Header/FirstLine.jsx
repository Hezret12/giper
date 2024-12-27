import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaTiktok } from 'react-icons/fa'
import { FaInstagram } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";


export default function FirstLine() {

  const {t} = useTranslation();

  return (
    <div className='bg-gradient-to-r from-[#4a56bd] to-[#be84f0] text-[.875rem] leading-[1.60rem]'>
    <div className=' container mx-auto'>
    <div className='flex justify-between text-[#ffffff] items-center h-12'>

        <div className='flex gap-3'>

      <div className='flex gap-2 ml-2 md:ml-0'>
        <FiPhone className='text-white bg-[#292A3133] rounded-lg p-1 h-7 w-7'/>
        <p>+99364562913</p>
      </div>

      <div className='hidden md:flex gap-2'>
        <MdOutlineEmail className='text-white bg-[#292A3133] rounded-lg p-1 h-7 w-7'/>
        <p>{t("admins")}</p>
      </div>

      </div>

     <div className='flex gap-2'>
        <FaInstagram className='bg-[#292A3133] rounded-lg h-7 w-7 p-1'/>
        <FaTiktok className='bg-[#292A3133] rounded-lg h-7 w-7 p-1.5'/>
     </div>
    </div>
    </div>
    </div>
  )
}

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdMenu } from 'react-icons/md'
import { Link } from 'react-router-dom';
import Parents from '../Categories/Parents';

export default function Category() {

  const {t} = useTranslation();
  const [open,setOpen] = useState(false);

  return (
    <div className=''>
      
      <div className='flex flex-wrap justify-around items-center md:grid grid-cols-4 container mx-auto py-[9px] text-[17px] text-[#FFFFFF]'>
        <div className='block w-full mb-1 md:mb-0 md:w-auto'>
        <div onClick={()=>setOpen(!open)} className='w-full gap-1 cursor-pointer roboto-medium text-sm  flex items-center bg-[#ffff] hover:opacity-100 opacity-80 text-slate-600 md:w-[175px] px-2.5 py-1.5 rounded'>
        <MdMenu size={19} className=''/>
        <p className='-mb-0.5'>{t("category")}</p>
        </div>
        {open && <Parents/>} </div>

      <Link to={"/"}><h1 className='cursor-pointer py-1 roboto-regular hover:text-white'>{t("menu")}</h1></Link>
      <Link to={"/magazine"}><h1 className='cursor-pointer roboto-regular hover:text-white'>{t("magazine")}</h1></Link>
      <Link to={"/brand"}>  <h1 className='hover:text-white roboto-regular cursor-pointer'>{t("favority")}</h1></Link>
      </div>
    </div>
  )
}

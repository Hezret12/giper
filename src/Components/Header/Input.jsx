import React, { useEffect, useState } from 'react';
import Logo from '../../Image/logo_white.webp';
import { GrLanguage } from "react-icons/gr";
import { BsPerson } from "react-icons/bs";
import { IoBagCheckOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import language from '../../Redux/slices/language';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';




export default function Input() {
    const {t} = useTranslation();
    const [open,setOpen] = useState(false);
    const [searches,setSearches] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {count} = useSelector(store=>store.cart)
    const {i18n} = useTranslation();
    const handleCLick = (change) => {
      language(dispatch, change);
      i18n.changeLanguage(change);
      setOpen(false);
    };
    
     
    const langs = [
      {
        id : 2,
        lang : 'Turkmen',
        active:"tk"
      },
      {
        id : 3,
        lang : 'Русский',
        active: "ru"
      }
    ]
    const handleSubmit = (event) => {
      event.preventDefault();
      navigate("productSearch/" + searches);
    };
  
    const handleInputChange = (event) => {
      setSearches(event.target.value);
    };
  
  return (
    <div>
    <div className='flex container mx-auto justify-between items-center'>
      <Link to={"/"}>
      <img src={Logo} alt='some value' className='w-[90px] h-auto'/>
      </Link>
      
      <form onSubmit={handleSubmit} className='hidden md:flex border justify-between w-[740px] bg-[#FFFFFF] hover:opacity-100 border-transparent opacity-80 my-2 rounded-lg items-center p-[12px] text-sm'>
      <input
        type='text'
        className='w-full active:border-none focus:outline-none'
        placeholder='Search...'
        value={searches}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(e);
          }
        }}
      />
      <IoSearchOutline
        onClick={handleSubmit}
        color='grey'
        size={21}
        className='cursor-pointer'
      />
    </form>
   

      <div className='flex gap-1.5 md:gap-3 text-white'>
        <div>
        <GrLanguage onClick={()=>setOpen(!open)} className='bg-[#292A3133] p-2 w-10 md:w-11 h-10 md:h-11 rounded-lg relative cursor-pointer'/>
        {open &&
        <div className='absolute z-20 border bg-[#ffff] rounded-lg shadow text-black mt-1'>
   {langs.map((e)=>( <h5 key={e.id} onClick={()=>handleCLick(e.active)} className='hover:bg-slate-200 border-b-2 text-md hover:rounded-lg px-5 py-1 cursor-pointer'>{e.lang}</h5>))}
        </div> }
        </div>
        <BsPerson className='bg-[#292A3133] p-1.5 w-10 md:w-11 h-10 md:h-11 rounded-lg'/>
        <IoBagCheckOutline className='bg-[#292A3133] p-1.5 w-10 h-10 md:w-11 md:h-11 rounded-lg'/>
        <Link to={"/basket"}>
        <div className='relative'>
        <AiOutlineShoppingCart className='bg-[#292A3133] hover:bg-opacity-80 text-white p-1.5 w-10 md:w-11 h-10 md:h-11 rounded-lg'/>
        {count != 0 ?
        <span className='absolute -right-2 roboto-regular -top-2  rounded-full px-2 py-1 text-xs bg-yellow-300 text-black'>{count}</span>
        : null}
        </div>
        </Link>
      </div>
      
    </div>
    <div className='md:hidden flex border justify-between w-auto mx-2.5 bg-[#FFFFFF] hover:opacity-100 border-transparent opacity-80 rounded-md items-center p-[10px] text-sm'>
        <input type='text' className='w-full active:border-none focus:outline-none' placeholder={t("placeholder")}/>
        <IoSearchOutline color='grey' size={21}/>
    </div>
    </div>
  )
}

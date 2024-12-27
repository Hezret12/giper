import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function MiniCart({logo}) {

    const {imageUrl, descriptions,id,code} = logo;
    const navigate = useNavigate();
    console.log(logo,"logo")

  return (
    <div>
      <div onClick={()=>navigate(`/products/${id}/${code}`)} className='bg-gray-100 cursor-pointer hover:bg-gray-200 active:bg-gray-100 rounded-md p-2 transition-all duration-300 flex flex-row items-center gap-4 space-y-2'>
      <img src={imageUrl} width={85} height={85} decoding='async' className='opacity-80' alt='some'/>
      <div className='flex flex-col gap-1 select-none'>
        <div className='text-sm md:text-base line-clamp-1 text-left'>{descriptions[0].name}</div>
        <div className='text-gray-500 text-sm line-clamp-2 text-left'>{descriptions[0].description}</div>
      </div>
      </div>
    </div>
  )
}

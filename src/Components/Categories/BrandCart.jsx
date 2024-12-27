import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function MiniCart({logo}) {

    const {imageUrl,code} = logo;
    const navigate = useNavigate();

  return (
    <div>
      <div onClick={()=>navigate("/brands/" + code)} className='bg-gray-100 cursor-pointer hover:bg-gray-200 active:bg-gray-100 rounded-md p-2 transition-all duration-300'>
      <img src={imageUrl} width={85} height={85} decoding='async' className='m-auto w-auto max-w-[120px]' alt='some'/>
      </div>
    </div>
  )
}

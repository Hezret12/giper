import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {addBasket} from '../../Redux/slices/addBasket';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Cart({products}) {
 
  const {imageUrl,name,id} = products;
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const handleClick = (e) =>{
    dispatch(addBasket(e));
    setLoading(true)
  }
  return (
    <div>
      <div className='border rounded-md shadow-sm p-1.5 h-[378px] parent'>
        <div className='relative w-full min-h-[250px]' onClick={()=>navigate("/single/" + id)}>
            <img src={imageUrl} className='w-auto m-auto max-w-full h-auto max-h-[250px] aspect-square' alt='test'/>
           {products.defaultAvailability.discountPercent && products.defaultAvailability.discountPercent > 0  && <span className='absolute p-1 right-3 left-auto top-2 w-auto border text-sm font-bold rounded-xl text-center bg-pink-600 text-white'>-{products.defaultAvailability.discountPercent} %</span>}
        </div>
        <p className='h-[46px] text-center text-base text-[1rem] overflow-hidden text-ellipsis'>{name}</p>
        <label className='flex justify-center gap-3 h-6 mt-1'>
        <h4 className='text-pink-600 font-semibold text-[17px]'>{products.defaultAvailability.specialPrice}</h4>
        <span className={`text-[17px] font-semibold font-sans ${products.defaultAvailability.specialPrice && products.defaultAvailability.discountPercent > 0  ? "text-gray-500 line-through" : "text-pink-600"}`}>{products.defaultAvailability.price}</span>
        </label>
        {loading ?
     <button type='button' className='bg-indigo-600 w-full cursor-none rounded my-1 text-white py-1.5'>{t("added")}</button>

      :<button type='button' className='bg-indigo-600 w-full rounded my-1 text-white py-1.5' onClick={()=>handleClick(products)}>{t("addBasket")}</button>
        }
      </div>
    </div>
  )
}

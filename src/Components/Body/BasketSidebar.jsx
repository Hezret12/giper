import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Time from './Time';
import { ReactTyped } from 'react-typed';


export default function BasketSidebar() {


  const {cart} = useSelector(store=>store.cart);
  const total = cart.reduce((a,c)=> a + c.total * c.quantity, 10);
  const calculate = total.toFixed(2);
  const item = cart.reduce((a,c)=> a + c.total * c.quantity, 0);
  const updateItem = item.toFixed(2);
  const [check,setCheck] = useState(false);

  return (
    <div className='roboto-regular'>
      {updateItem <= 150 &&
      <div className='bg-yellow-300 font-medium mt-3 p-3'>
      <ReactTyped strings={["Supermarketden sargyt mukdary 150 manatdan geçen ýagdaýynda, dükanlarymyzda eltip bermek hyzmaty MUGT"]} typeSpeed={50} />
      </div>}
      <section className='p2 md:p-4 bg-[#F3F4F6] mt-3 border'>
        <span className='text-xl text-gray-900 roboto-black'>Kime we nira eltip bermek</span>
        <div className='flex gap-4'>
        <label>
          <span className='roboto-regular text-sm block'>Ady</span>
          <input type='text' className='border py-2.5 rounded-md' />
        </label>
        <label>
          <span className='roboto-regular text-sm block'>Telefon</span>
          <input type='text' className='border py-2.5 rounded-md'/>
        </label>
        </div>

        <div className='flex gap-2'>
        <label>
          <span className='roboto-regular text-sm'>Region saylan</span>
          <input type='text' className='border py-2.5 rounded-md' />
        </label>
        <label>
          <span className='roboto-regular text-sm'>Salgy (koce/jay/kwartira)</span>
          <input type='text' className='border py-2.5 rounded-md'/>
        </label>
        </div>

        <article>
          <span className='roboto-regular text-sm'>Bellik</span>
          <textarea type='text' placeholder='Goşmaça salgynyň düşündirişi, eltip bermek wagty we başga zerur bolan maglumaty ýazyp bilersiňiz' className='w-full border text-sm py-3 rounded-md mb-2 px-2 text-wrap'/>
        </article>
      
           
           {/* time express */}
              <Time/>

        {/* time express end */}
      
       

        <br/>
        <h3 className='border-t pt-2 font-semibold text-lg'>Eltip berme gornusi</h3>

        <div className='flex gap-1'>
        <section className='flex gap-1' onClick={()=>setCheck(!check)}>
          {check ?
        <svg stroke='currentColor' fill='currentColor' strokeWidth={"0"} viewBox='0 0 512 512' className='text-gray-400' height={25} width={25}xmlns='xmlns="http://www.w3.org/2000/svg'>
          <circle cx={"256"} cy={"256"} r="192" fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth={"32"}></circle>
        </svg> :
        <svg stroke='currentColor' fill='currentColor' strokeWidth={"0"} viewBox='0 0 512 512' className={`text-blue-500`} height={25} width={25}xmlns='xmlns="http://www.w3.org/2000/svg'>
        <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z"></path>
        </svg>}
      
        </section>
        <p>Standart</p>
        </div>


        <span className='text-sm text-gray-500 text-left'>
        Eltip berme hyzmatynyň bahasy saýlanan harytlara we dükanlara esaslanyp hasaplanylýar.
        <br/>
        Azyk önümleriň we ammardaky harytlaryň köpüsi, sargydyň mukdary 
        <b> 200 manatdan geçse</b>
        , eltip bermek hyzmaty mugt.
        Büzmeýin we Ak Bugdaý etraplaryna eltip bermek üçin goşmaça töleg alynyp bilner, sargydyň mukdary 
        <b> 200 manatdan geçse </b>
        eltip bermek hyzmaty mugt. Hyzmat Aşgabat şäherinde elýeter.
        </span>

        <hr className='mt-2'></hr>

        <label className='flex justify-between'>
          <p className='pt-1 text-gray-500'>Jemi</p>
          <p className='font-medium pt-1'>{updateItem} TMT</p>
        </label>
        <label className='flex justify-between'>
          <p className='text-gray-500'>Eltip berme nahasy</p>
          <p className=' font-semibold'>{updateItem <= 150 ? "10 TMT" : "0 TMT"}</p>
        </label>
        <label className='flex justify-between'>
          <p className='text-gray-500 mt-0.5'>Umumy Jemi</p>
          <p className='text-indigo-700 font-semibold pb-1 text-xl'>{calculate<=150 ? calculate : updateItem} TMT</p>
        </label>

        <button className='w-full block mt-1 bg-indigo-700 text-center rounded-lg py-1.5 font-medium text-sm text-white'>Sargyt etmek</button>

      </section>
    </div>
  )
}

import React, { useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { IoTrashOutline, IoWarning } from 'react-icons/io5';
import BasketSidebar from './BasketSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, deleteItem, increment } from '../../Redux/slices/addBasket';
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Pay from './Pay';
import { Helmet } from 'react-helmet';

export default function Basket() {


  const [openModal, setOpenModal] = useState(false);
  const {cart} = useSelector(store=>store.cart);
  const calculate = cart.reduce((a,c)=> a + c.total * c.quantity, 0);
  const total = calculate.toFixed(2);
  const dispatch = useDispatch();
  const deleteClick = (id) => {
    dispatch(deleteItem(id));
    setOpenModal(false);
  }
 

  return (
    <div>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Giper - Sebet</title>
                <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {cart.length ? 
    <div className='grid grid-cols-6 gap-3 container mx-auto'>

      <div className='col-span-4'>
       <header className='flex justify-between mb-4 mt-3'>
        <h3 className='text-xl font-bold font-serif mt-3'>Sebedinizdaki harytlar</h3>
        <button className='border-indigo-500 border-[1px] px-2 py-2 rounded-lg hover:bg-indigo-500 hover:text-white transition-all ease-linear delay-75 text-indigo-500 mt-2 flex gap-1 font-medium font-serif items-center text-sm'><IoTrashOutline size={20}/>Sebedi bosalt</button>
       </header>
       <div>

        <label className='flex justify-between border text-sm bg-gray-100 px-3 py-2 mb-1'>
            <h3 className='text-[#4A56BD] text-[14px] font-bold'>Supermarket</h3>
            <h3 className='text-[#4B5563] font-medium opacity-80 text-[14px]'>Iň giç jogap berme - 30 minut</h3>
        </label>
          {/* map  */}
          {cart && cart.map((elem)=>(
        <span className='grid grid-cols-9 text-center border-b items-center' key={elem.id}>
            <img src={elem.image} alt='somes' className='w-auto max-w-[85px] h-auto max-h-[85px] m-auto'/>
            <h5 className='col-span-4 text-start text-wrap'>{elem.name}</h5>

            <div className='flex m-auto col-span-2 bg-slate-200 rounded-2xl'>
                <button className='p-2 w-9 text-xl'><BiMinus onClick={()=>dispatch(decrease(elem.id))}/></button>
                <h3 className='bg-gradient-to-r from-[#4a56bd] to-[#be84f0] px-[19px] flex items-center text-white'>{elem.quantity}</h3>
                <button className='p-2 w-9 text-xl'><BiPlus onClick={()=>dispatch(increment(elem.id))}/></button>
            </div>
            <div className='flex justify-between col-span-2'>
            <p className='text-[17px]'>{elem.specialPrice ? elem.specialPrice : elem.price}</p>
            <IoTrashOutline className='mr-5 text-gray-400 cursor-pointer' onClick={()=>setOpenModal(true)} size={20}/>

              {/* start modal */}
              <Modal show={openModal} className='w-[350px] h-[100%] m-auto' size="md" onClose={() => setOpenModal(false)} popup>
        
        <Modal.Body>
          <div className='h-[250px]'>
            <IoWarning className='ml-[100px] text-pink-600' size={100}/>
            <h3 className='font-semibold text-center'>Uns ber</h3>
            <p className='p-1 text-center capitalize font-medium'>siz hakykatdan hem harydy sebetden ayyrmak isleyanizmi</p>
            <div className='flex gap-3 justify-center mt-2'>
              <button className='btn bg-pink-600 text-white hover:bg-pink-700 w-[80px]' onClick={()=>deleteClick(elem.id)}>Hawa</button>
              <button className='btn btn-outline-danger w-[80px]' onClick={()=>setOpenModal(false)}>Yok</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
            </div>
        </span>))}
        {/* map end */}

        {/* footer */}
        <div className='flex justify-between'>
        <section className=''>
        <span className='text-gray-500 text-[.875rem]'>Toleg gornusi</span>

        {/* TOleg SVG */}
    
           <Pay/>
      
          {/* svg end */}
        </section>
        <section className='text-[.875rem] font-medium'>
         <div>
          <span className='text-gray-500 font-normal'>Eltip bermek bahasy: </span>
          {total <= 150 ? "10 TMT" : "0 TMT"}
         </div>
         <div>
          <span className='text-gray-500 font-normal'>Jemi: </span>
          {total} TMT
         </div>
        </section>
        </div>
        {/* fotter end */}
       </div>
      </div>
      <footer className='col-span-2'>
       <BasketSidebar/>
      </footer>
    </div>
    : <div className='container mx-auto text-xl py-3 roboto-regular min-h-[52vh]'>Sebedinizde haryt yok...</div>   
  }
    </div>
  )
}

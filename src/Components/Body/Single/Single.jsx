import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Total from './Total';
import { useDispatch } from 'react-redux';
import {addBasket} from '../../../Redux/slices/addBasket';

export default function Single() {
  const { id } = useParams();
  const [single, setSingle] = useState();
  const dispatch = useDispatch();
  const singleGet = async (id) => {
    try {
      const response = await axios.get(`https://gipertm.com/_next/data/lzpeNcavMowH-dhR8rmNe/tk/catalog/product/${id}.json?id=${id}`);
      // const hierarchy = await axios.get(`https://gipertm.com/api/v1/category/hierarchy`);
      setSingle(response.data.pageProps.index);
      console.log(single)
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {

    singleGet(id);
  
  }, [id]);


  const basketClick = (item) => {
    const cart = {
      id:item.id,
      imageUrl: item.images[0],
      name:item.description.name,
      defaultAvailability:{specialPrice: item.availabilities[0].specialPrice, price: single.availabilities[0].price}
    }
    console.log(cart)
    dispatch(addBasket(cart));
  }

  return (
    <div className='container mx-auto px-4 mt-10'>
      {single && (
        <section className='grid grid-cols-5'>
          <div className='col-span-2 px-5'>
            <img src={single.images[0]} className='mx-auto w-auto object-fit' alt='single' />
          </div>
          <div className='col-span-2 flex flex-col space-y-3'>
            <h1 className='text-gray-900 text-3xl'>{single.description.name}</h1>
            <div className='flex flex-col'>
            {single.availabilities[0].specialPrice ? 
              <div className='flex flex-row items-center space-x-2 font-bold text-2xl'>            
                <span className='text-pink-600 rounded-md'>{single.availabilities[0].specialPrice}</span>
                <span className='text-gray-500 font-semibold line-through'>{single.availabilities[0].price}</span>
              </div>
              :
              <span className='text-pink-600 rounded-md font-bold text-2xl'>{single.availabilities[0].price}</span> }
            </div>
            <div className='text-gray-600 roboto-regular'>{single.description.description}</div>
            <div className='text-blue-700 hover:text-blue-900 text-lg font-bold cursor-pointer'>{single.manufacturer.name}</div>
          </div>
          <div className=''>
            <h2 className='text-xl text-gray-600 roboto-regular pb-0.5'>Magazinlar</h2>
            <div className='flex flex-row items-center gap-4 border-b border-t pt-2 px-1 pb-2'>
              <img className='w-[20%] opacity-80' src={`https://gipertm.com/_next/image?url=https%3A%2F%2Fgipertm.com%2FmerchantStore%2Fimage%3Fcode%3D${single.availabilities[0].store.storeLogo}&w=96&q=75`} alt='market' /> {/* Market logosu eklenecek */}
              <div className='w-full'>
                {single.availabilities[0].specialPrice ?
                <div className='flex flex-row items-center space-x-2 font-bold text-base roboto-medium'>
                  <span className='text-pink-600 rounded-md'>{single.availabilities[0].specialPrice}</span>
                  <span className='text-gray-500 font-semibold line-through'>{single.availabilities[0].price}</span>
                </div> :
               <span className='text-pink-600 rounded-md roboto-medium font-bold'>{single.availabilities[0].price}</span>
              }
                <p className='text-[18px] roboto-regular pb-1 text-[#6B7280]'>{single.availabilities[0].store.name}</p>
                <button onClick={()=>basketClick(single)} className='bg-[#4A56BD] text-white w-full px-2 py-[7px] roboto-regular text-sm border rounded-md items-center'>Sebede gos</button>
              </div>
            </div>
          </div>
        </section>
      )}
      <Total item={single}/>
    </div>
  );
}

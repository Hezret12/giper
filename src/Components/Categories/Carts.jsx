import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Cart from '../Body/Cart';

export default function Carts() {
    const {code} = useParams();
    const [data,setData] = useState();
    const items = async () => {
        try {
    const response = await axios.get(`https://gipertm.com/_next/data/lzpeNcavMowH-dhR8rmNe/tk/brands/ariel.json?manufacturer=${code}&code=${code}`);
    setData(response.data.pageProps.index.products);
        } catch (error) {
        console.log(error)
        }
    }

    useEffect(()=>{
    items();
    },[]);
    console.log(data)
  return (
    <div className='container mx-auto'>
      <h1 className='roboto-medium capitalize text-gray-900 text-2xl font-bold line-clamp-1 py-4 px-2'>{code}</h1>
      <div className='grid grid-cols-5 gap-2'>
      {data && data.map((e)=>(
        <Cart key={e.id} products={e}></Cart>
      ))}
      </div>
    </div>
  )
}

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Cart from './Cart';
import InfiniteScroll from "react-infinite-scroll-component";

export default function SearchBar() {
    
    const {name} = useParams();
    const [data,setData] = useState([]);
    const [has,setHasMore] = useState(true);
    const [offset,setOffset] = useState(0);
    const [total,setTotal] = useState([]);
    
    const findProduct = async() => {
        try {
    const res = await axios.get("https://gipertm.com/_next/data/lzpeNcavMowH-dhR8rmNe/tk/product/productsSearch.json?mask=" + name + "&offset=" + offset);
    setData((prev)=> [...prev,...res.data.pageProps.index.products]);
    setTotal(res.data.pageProps.index);
    res.data.pageProps.index.products.length > 0 ? setHasMore(true) : setHasMore(false);
    setOffset((prevNumber)=> prevNumber + 40);

        } catch (error) {
        console.log(error)
        }
    }

    useEffect(()=>{
    setOffset(0);
    setData([]);
    setHasMore(true);
    findProduct();
    },[name])

  return (
    <div className='container mx-auto px-2 md:px-0 py-1 md:py-2 lg:py-4'>
      <h3 className='text-gray-800 roboto-medium text-base md:text-lg font-bold line-clamp-1'>{name}</h3>
      <div className='text-gray-500 roboto-regular text-sm space-x-1'>
        <span>Jemi haryt:</span>
        <span>{total.total}</span>
      </div>
    <div className=''>
    <InfiniteScroll
      dataLength={data.length}
      next={findProduct}
      hasMore={has}
    >
      <div className='grid grid-cols-2 md:grid-cols-5 gap-2.5'>
          {data &&
            data.map((item,index) => <Cart key={index} products={item} />)}
      </div>
    </InfiniteScroll>
    </div>
    </div>

  )
}

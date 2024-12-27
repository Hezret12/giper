 import MiniCart from './MiniCart';
import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from 'react-i18next';

function ShopLogo() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const {t} = useTranslation();

  const fetchData = async () => {
    if(totalPages === 120){
      setHasMore(false);
    return;
    }
     // <----------------------------------------------->

    // waiting for 1 second before fetching data to show loading spinner, you can skip this
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTotalPages(totalPages + 40)
    // <----------------------------------------------->

    const res = await axios.get(`https://gipertm.com/api/v4/merchantStore?search=&offset=${totalPages}&max=40&lang=tk`);
    setCharacters((prevPosts) => [...prevPosts, ...res.data]);
  };

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <div className='container mx-auto'>
    <div className='mt-4 mb-2'>
        <h3 className='text-gray-800 text-2xl font-bold'>{t("magazine")}</h3>
    </div>
    <div className='grid grid-cols-3 mb-4'>
        <div className='relative'>
        <input type='text' placeholder='Gozleg' className='w-full p-[13px] text-sm text-gray-900 border border-gray-300 rounded-lg focus:opacity-100 opacity-90 focus:outline-none'/>
        <button className=' absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500'>
        <svg stroke='currentColor' fill='currentColor' strokeWidth={"0"} viewBox='0 0 512 512' height="20" width="20" xmlns='xmlns="http://www.w3.org/2000/svg'>
        <path fill='none' strokeMiterlimit="10" strokeWidth="32" d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"></path>
        <path fill='none' strokeLinecap='round' strokeMiterlimit="10" strokeWidth={"32"} d="M338.29 338.29L448 448"></path>
        </svg>
        </button>
        </div>
    </div>
      <InfiniteScroll
       style={{
        overflow:"hidden"
       }}
        dataLength={characters.length} 
        next={fetchData}
        hasMore={hasMore}
        loader={<h4 className='mx-auto text-lg text-center min-h-[39vh]'>Yuklenyar...</h4>}
        endMessage={
          <p>
            <b>Ahlisi yuklendi !</b>
          </p>
        }
      >
        {/* Map over characters array and return JSX */}
        <div className='grid grid-cols-4 gap-3'>
        {characters.map((character, index) => (
          <MiniCart key={index} logo={character} />
        ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default ShopLogo;
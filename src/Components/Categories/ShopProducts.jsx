import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Cart from '../Body/Cart';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  TEDropdown,
  TEDropdownToggle,
  TEDropdownMenu,
  TEDropdownItem,
  TERipple,
} from "tw-elements-react";


export default function ShopProducts() {
  const hasMore = useRef(true);
  const [fill, setFill] = useState([]);
  const [labels, setLabel] = useState("Meshurlar basda");
  const [sidebar, setSidebar] = useState({});
  const [header, setHeader] = useState([]);
  const { i18n } = useTranslation();
  const { id, code } = useParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const rating = [
    {id:1,tk:"Meshurlar basda",code:"popular"},
    {id:2,tk:"Arzanladyslar",code:"price"},
    {id:3,tk:"Gymmatlar basda",code:"expensive"},
    {id:4,tk:"Tazeler basda",code:"date"},
    {id:5,tk:"Arzanlar basda",code:"prices"}
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseHeader = await axios.get(
          'https://gipertm.com/_next/data/lzpeNcavMowH-dhR8rmNe/tk/merchantStore/index.json'
        );
        setHeader(responseHeader.data.pageProps.index);

        const responseProducts = await axios.get(
          `https://gipertm.com/_next/data/lzpeNcavMowH-dhR8rmNe/tk/store/${id}/products.json?store=${code}&sort=discountPercent&order=desc&${id}`
        );

        setSidebar(responseProducts.data.pageProps.index);
       
        //  await loadMoreData()
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(fill.length);
  }, [i18n.language, id, code]);

  const loadMoreData = async (offset) => {
    if (!hasMore.current) return;

    try {
      const selectedCategoryCodes = selectedCategories.join('%2C');
      const selectedManufacturerCodes = selectedManufacturers.join('%2C');
      const categoryParam = selectedCategories.length ? `&categoryCode=${selectedCategoryCodes}` : '';
      const manufacturerParam = selectedManufacturerCodes.length ? `&manufacturer=${selectedManufacturerCodes}` : '';

      const response = await axios.get(
        `https://gipertm.com/api/v4/products/presents?store=${code}&sort=discountPercent&order=desc&lang=tk${categoryParam}${manufacturerParam}&offset=${offset}`
      );

      if (response.data.products && response.data.products.length > 0) {
        setFill((prev) => [...prev, ...response.data.products]);
      } else {
        hasMore.current = false; // No more products to load
      }
    } catch (error) {
      console.error('Error loading more data:', error);
    }
  }

  useEffect(()=>{
    setFill([]); // Clear current products
    hasMore.current = true;
    loadMoreData(0);
  }, [selectedCategories, selectedManufacturers])

  const handleCategoryFilter = (item) => {
    setSelectedCategories(prev => {
      const updated = prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item];
      return updated;
    });
  };

  const handleManufacturerFilter = (item) => {
    setSelectedManufacturers(prev => {
      const updated = prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item];
      return updated;
    });
  };

  const label = (e) =>{
    setLabel(e)
  }

  return (
    <div className='container mx-auto pt-3'>
      <header className='flex justify-between'>
        {header && header.map((e, index) => (
          <div className='flex gap-2' key={index}>
            <img
              src={e.id == id ? e.imageUrl : ''}
              className='w-auto max-w-[45px] h-auto opacity-85'
              alt={e.id == id ? e.code : ''}
            />
            <h3 className='text-gray-800 pb-1 flex justify-center roboto-medium text-lg font-bold line-clamp-1 my-2'>
              {e.id == id ? e.descriptions[0].name : ''}
            </h3>
          </div>
        ))}
 <TEDropdown className="flex justify-center">
      <TERipple rippleColor="light">
        <TEDropdownToggle
          tag="a"
          className="flex items-center whitespace-nowrap pointer-events-auto cursor-pointer rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          {labels}
          <span className="ml-2 [&>svg]:w-5 w-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </TEDropdownToggle>
      </TERipple>

      <TEDropdownMenu>
        {rating.map((l)=>(
        <TEDropdownItem key={l.id}>
          <p onClick={()=>label(l.tk)} className="block w-full min-w-[160px] cursor-pointer whitespace-nowrap hover:bg-slate-200  px-4 py-2 text-sm text-left font-normal pointer-events-auto text-gray-700 focus:outline-none active:no-underline">
            {l.tk}
          </p>
        </TEDropdownItem>))}
      </TEDropdownMenu>
    </TEDropdown>     
     </header>

      <section className='grid grid-cols-12'>
        <div className='col-span-3'>
          <section className='border p-1.5 mx-2 rounded-lg'>
            <h4 className='pt-1 text-xl roboto-regular'>Bölümler</h4>
            <div className='max-h-[196px] overflow-auto'>
              {sidebar.categories?.map((s, id) => (
                <div
                  className='flex justify-between items-center hover:bg-slate-200 p-0.5'
                  key={id}
                >
                  <span className='flex gap-1 items-center'>
                    <input
                      type="checkbox"
                      className='w-[17px] h-[17px]'
                      onChange={() => handleCategoryFilter(s.code)}
                      name={s.code}
                      value={s.name}
                      checked={selectedCategories.includes(s.code)}
                    />
                    <p className='px-1 text-[14px] roboto-regular'>{s.name}</p>
                  </span>
                  <small className='text-gray-500'>({s.docCount})</small>
                </div>
              ))}
            </div>
            <h4 className='pt-1 text-xl roboto-regular'>Brendler</h4>
            <div className='max-h-[215px] overflow-auto'>
              {sidebar.manufacturers?.map((k, id) => (
                <div
                  className='flex justify-between items-center hover:bg-slate-200 p-0.5'
                  key={id}
                >
                  <span className='flex gap-1 items-center'>
                    <input
                      type="checkbox"
                      className='w-[17px] h-[17px]'
                      onChange={() => handleManufacturerFilter(k.code)}
                      name={k.code}
                      value={k.name}
                      checked={selectedManufacturers.includes(k.code)}
                    />
                    <p className='px-1 text-[14px] roboto-regular'>{k.name}</p>
                  </span>
                  <small className='text-gray-500'>({k.docCount})</small>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className='col-span-9 min-h-[0vh]'>
          <InfiniteScroll
            dataLength={fill.length}
            next={()=>loadMoreData(fill.length)}
            hasMore={hasMore}
           loader={<p>Yüklenyar...</p>}
            endMessage={<p>Ahlisi yuklendi</p>}
          >
            <div className='grid grid-cols-4 h-auto min-h-[310px] gap-2.5'>
              {fill.map((e) => (
                <Cart key={e.id} products={e} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
}





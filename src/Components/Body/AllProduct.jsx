import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Cart from './Cart';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  TEDropdown,
  TEDropdownToggle,
  TEDropdownMenu,
  TEDropdownItem,
  TERipple,
} from "tw-elements-react";





export default function AllProduct() {


    const hasMore = useRef(true);
  const [fill, setFill] = useState([]);
  const [offset, setOffset] = useState(0);
  const [labels, setLabel] = useState("Meshurlar basda");
  const [sidebar, setSidebar] = useState({});
  const [header, setHeader] = useState([]);
  const { i18n } = useTranslation();
  const { id} = useParams();
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
          'https://gipertm.com/_next/data/lzpeNcavMowH-dhR8rmNe/tk.json'
        );
        setHeader(responseHeader.data.pageProps.index);

        const responseProducts = await axios.get(
          `https://gipertm.com/_next/data/lzpeNcavMowH-dhR8rmNe/${i18n.language}/productItems/featuredProducts/${id}.json?id=${id}`
        );

        setSidebar(responseProducts.data.pageProps.index);
       
        //  await loadMoreData()
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(fill.length);
  }, [i18n.language, id]);

  const loadMoreData = async (offset) => {
    if (!hasMore.current) return;

    try {
      const selectedCategoryCodes = selectedCategories.join('%2C');
      const selectedManufacturerCodes = selectedManufacturers.join('%2C');
      const categoryParam = selectedCategories.length ? `&categoryCode=${selectedCategoryCodes}` : '';
      const manufacturerParam = selectedManufacturerCodes.length ? `&manufacturer=${selectedManufacturerCodes}` : '';

      const response = await axios.get(
        `https://gipertm.com/api/v4/products/group/${id}?${categoryParam}&lang=tk${manufacturerParam}&offset=${offset}`

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
    hasMore.current = true;
    setFill([]); // Clear current products
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
                  {e.id == id ? e.description.nameTm : ''}
                </h3>
              </div>
            ))}

         </header>
    
          <section className='grid grid-cols-12'>
            <div className='col-span-3'>
              <section className='border p-1.5 mx-2 rounded-lg'>
                <h4 className='pt-1 text-xl roboto-regular'>Bölümler</h4>
                <div className='max-h-[215px] overflow-auto'>
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
                        <p className='px-1 text-[15px]'>{s.name}</p>
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
                        <p className='px-1 text-[15px]'>{k.name}</p>
                      </span>
                      <small className='text-gray-500'>({k.docCount})</small>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className='col-span-9'>
              <InfiniteScroll
                dataLength={fill.length}
                next={()=>loadMoreData(fill.length)}
                hasMore={hasMore}
                // loader={<p>Yüklenyar...</p>}
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
        )}

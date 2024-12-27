import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import ReactLoading from 'react-loading';


export default function Parents() {

    const [categories,setCategories] = useState();
    const [child,setChild] = useState();
    const [deep,setDeep] = useState();
    const [bool,setBool] = useState();
    const [mouse,setMouse] = useState();
    const {i18n} = useTranslation();

    const allCategory = async () => {
         try {
           const response = await axios.get(`https://gipertm.com/api/v1/category/hierarchy`);
           setCategories(response.data);
         } catch (error) {
           console.error("Error fetching data:", error);
         }
       };

       useEffect(()=>{
        allCategory();

       },[i18n.language]);

       useEffect(() => {
        if (categories) {
            const finds = categories.find(e => e.id === 690);
            setChild(finds ? finds.children : []);
            setBool(finds ? finds.id : []);
            setDeep(finds ? finds.children[0].children : []);
            setMouse(finds ? finds.children[0].id : []);
        }
    }, [categories]);

       const handleClick = (p) => {
        setChild(p.children);
        setBool(p.id);
       };
       const mouseEvent = (c) =>{
        setDeep(c.children);
        setMouse(c.id)

       }
  return (
    <div>
      {categories ?
    <div className='container mx-auto absolute top-28 transition-all delay-100 left-0 right-0 w-full bg-[#ffffff] border shadow grid grid-cols-4 pt-1.5'>
       <div className='overflow-y-scroll scrollCss'>
         {categories && categories.map((p)=>(
            <div key={p.descs[0].name}>
                {p.img ?
          <label onClick={()=>handleClick(p)} className={`${p.id === bool ? "bg-blue-200" : ""} mr-2 mt-[1px] flex flex-row items-center gap-1 p-2 text-sm text-gray-500 hover:bg-blue-100 transition-all duration-300 rounded-md cursor-pointer `}>
            <span className=''>
             <img src={p.img} alt={p.code} decoding='async' className='w-6 h-6'/> 
            </span>
            <div>{p.descs[0].lang === i18n.language ? p.descs[0].name : p.descs[1].name}</div>
          </label> : null }
            </div>
         ))}
       </div>
       <div className='overflow-y-scroll scrollCss mr-6'>
       {child && child?.map((c)=>(

          <label key={c.descs[1].name} onMouseMove={()=>mouseEvent(c)} className={`${c.id === mouse ? "bg-blue-200" : ""} flex flex-row items-center ml-2 mr-2 gap-1 p-2 text-sm text-gray-500 hover:bg-blue-100 transition-all duration-300 rounded-md cursor-pointer`}>
            <div>{c.descs[0].lang === i18n.language ? c.descs[0].name : c.descs[1].name}</div>
          </label>))}
       </div>
       <section className='max-h-[600px] overflow-y-scroll scrollCss w-full col-span-2'>
       <div className='grid grid-cols-5  gap-2'>
       {deep ? deep?.map((elem,o)=>(
            <div key={o} className='border text-center w-[140px] rounded-md max-h-[200px]'>
            <div className='h-[120px] m-auto relative'>
            <img src={elem.webImg} className='w-auto absolute top-0 left-0 bottom-0 p-2 right-0 my-auto max-w-full h-auto max-h-[120px] mx-auto object-contain' alt={elem.code}/>
            </div>
            <span className='max-h-[25px] pt-0.5 text-sm text-gray-500'>{elem.descs[0].lang == i18n.language ? elem.descs[0].name : elem.descs[1].name}</span>
        
          </div>
        )): null}
       </div>
       </section> 
    </div> :
    <div className='container mx-auto absolute top-[100%] min-h-[100px] transition-all delay-100 left-0 right-0 w-full bg-[#ffffff] border shadow pt-1.5'>
    <ReactLoading type={"bars"} className='ml-[50%] mt-[20px]' color={"purple"} height={55} width={45} />
    </div>}
    </div>
  )
}
